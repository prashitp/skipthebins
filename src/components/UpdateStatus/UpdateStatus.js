import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CollapsibleTable from "../UpdateStatus/CollapsibleTable";

const UpdateStatus = () => {
  return (
    <div className="container">
      <div className="text-center">
        <h3>Update Pickup Status</h3>
      </div>
      <div className="card mt-5 shadow p-3 mb-5 bg-white rounded">
        <div className="card-body">
          <CollapsibleTable />
        </div>
      </div>
    </div>
  );
};

export default UpdateStatus;
