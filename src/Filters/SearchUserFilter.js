import React, { useState } from "react";

const SearchUserFilter = ({ column, api }) => {
  const [filterText, setFilterText] = useState("");

  const onFilterTextChange = (e) => {
    const newFilterText = e.target.value;
    setFilterText(newFilterText);
    api.setFilterModel({
      [column.colId]: {
        filterType: "text",
        filter: newFilterText,
        type: "contains",
      },
    });
  };

  return (
    <div className="floating-filter">
      <input
        type="text"
        value={filterText}
        onChange={onFilterTextChange}
        className="input-filter"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchUserFilter;
