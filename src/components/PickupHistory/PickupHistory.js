import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CollapsibleTable from "../PickupHistory/CollapsibleTable";
const PickupHistory = () => {
  return (
    <div className="container">
      <div className="text-center">
        <h3>Pickup History</h3>
      </div>
      <div className="card mt-5 shadow p-3 mb-5 bg-white rounded">
        <div className="card-body">
          <CollapsibleTable />
        </div>
      </div>
    </div>
  );
};
export default PickupHistory;
