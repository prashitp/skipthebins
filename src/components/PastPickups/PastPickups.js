import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CollapsibleTable from "../PastPickups/CollapsibleTable";
const PastPickups = () => {
  return (
    <div className="container">
      <div className="text-center">
        <h3>Past Pickups</h3>
      </div>
      <div className="card mt-5 shadow p-3 mb-5 bg-white rounded">
        <div className="card-body">
          <CollapsibleTable />
        </div>
      </div>
    </div>
  );
};
export default PastPickups;
