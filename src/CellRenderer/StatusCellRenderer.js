import React from "react";

const StatusCell = ({ data }) => {
  let startDate = new Date(data.startDate);
  let endDate = new Date(data.endDate);
  let currentDate = new Date();
  const isActive = startDate <= currentDate && currentDate <= endDate;
  const dotClassName = `dot ${isActive ? "active" : "inactive"}`;
  return (
    <div className="active-cell-wrapper">
      <span className={dotClassName}></span>
      {isActive ? "Active" : "Inactive"}
    </div>
  );
};

export default StatusCell;
