import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { addCampaigns, fetchUserData } from "./AppReducer";
import { formatDate, formatUSD } from "./util";
import SearchUserFilter from "./Filters/SearchUserFilter";
import CampaignData from "./__mocks__/campaignData.json";
import StatusCell from "./CellRenderer/StatusCellRenderer";
import AddCampaign from "./AddCampaign";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const FRAMEWORK_COMPONENTS = {
  searchNameFilter: SearchUserFilter,
  statusCell: StatusCell,
};
const LoadingTemplate = () => {
  return <div className="ag-overlay-loading-center">Loading...</div>;
};
const NoDataTemplate = () => {
  return <div className="ag-overlay-no-rows-center">No data available</div>;
};
function Campaigns({ campaignListData }) {
  const campaigns = useSelector((state) => state.campaign.campaignList);
  const userList = useSelector((state) => state.campaign.users);
  const loading = useSelector((state) => state.campaign.loading);
  const dispatch = useDispatch();
  const gridRef = useRef(null);

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(addCampaigns(campaignListData));
  }, [campaignListData]);

  const columnConfig = [
    {
      field: "name",
      header: "Campaign Name",
      floatingFilter: "agTextColumnFilter",
      floatingFilterComponent: "searchNameFilter",
      pinned: "left",
      filter: "true",
      sort: true,
      minWidth: 250,
    },
    {
      field: "user",
      header: "User Name",
      valueGetter: ({ data }) => {
        return Object.hasOwn(userList, data["userId"])
          ? userList[data["userId"]]
          : "Unknown User";
      },
      minWidth: 250,
    },
    {
      field: "startDate",
      header: "Start Date",
      valueGetter: ({ data }) => formatDate(data.startDate),
      floatingFilter: true,
      // floatingFilterComponent: "startDateFilter",
      filter: "agDateColumnFilter",
      filterParams: {
        inRangeFloatingFilterDateFormat: "DD-MM-YYYY",
        filterOptions: ["greaterThan"],
        comparator: (filterDate, cellValue) => {
          if (!cellValue) return 0;
          const dateParts = cellValue.split("/");
          const year = Number(dateParts[2]);
          const month = Number(dateParts[1]) - 1;
          const day = Number(dateParts[0]);
          const cellDate = new Date(year, month, day);
          if (cellDate < filterDate) {
            return -1;
          } else if (cellDate >= filterDate) {
            return 1;
          }
          return 0;
        },
      },
    },
    {
      field: "endDate",
      header: "End Date",
      valueGetter: ({ data }) => formatDate(data.endDate),
      floatingFilter: true,
      // floatingFilterComponent: "startDateFilter",
      filter: "agDateColumnFilter",
      filterParams: {
        inRangeFloatingFilterDateFormat: "DD-MM-YYYY",
        filterOptions: ["lessThan"],
        comparator: (filterDate, cellValue) => {
          if (!cellValue) return 0;
          const dateParts = cellValue.split("/");
          const year = Number(dateParts[2]);
          const month = Number(dateParts[1]) - 1;
          const day = Number(dateParts[0]);
          const cellDate = new Date(year, month, day);
          if (cellDate <= filterDate) {
            return -1;
          } else if (cellDate > filterDate) {
            return 1;
          }
          return 0;
        },
      },
    },
    {
      field: "active",
      header: "Active",
      cellRenderer: "statusCell",
    },
    {
      field: "Budget",
      header: "Budget",
      minWidth: 200,
      valueGetter: formatUSD,
    },
  ];

  const onGridReady = (parmas) => {
    gridRef.current = parmas.api;
  };
  const gridOptions = {
    rowHeight: 40,
    domLayout: "autoHeight",
    loadingOverlayComponent: LoadingTemplate,
    noRowsOverlayComponent: NoDataTemplate,
  };
  if (loading) {
    gridRef.current?.showLoadingOverlay();
  }
  return (
    <>
      <section
        className="add-campaign-section"
        data-testid="add-campaign-section"
      >
        <AddCampaign />
      </section>
      <section
        className="ag-theme-alpine"
        style={{ height: 800, width: "100%" }}
        data-testid="campaign-list-section"
      >
        <AgGridReact
          columnDefs={columnConfig}
          rowData={campaigns}
          gridOptions={gridOptions}
          frameworkComponents={FRAMEWORK_COMPONENTS}
          onGridReady={onGridReady}
        />
      </section>
    </>
  );
}

export default Campaigns;
