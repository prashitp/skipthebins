// Author : Lokansh Gupta
import { Button } from "react-bootstrap";
import React from "react";

function AdminModifyVendorReadOnly({
  vendor,
  index,
  handleEditClick,
  deleteVendorApiCall,
}) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{vendor.name}</td>
      <td>{vendor.address}</td>
      <td>{vendor.phoneNumber}</td>
      <td>{vendor.email}</td>
      <td>
        <Button
          variant="primary"
          type="button"
          onClick={(event) => handleEditClick(event, vendor)}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          type="button"
          onClick={() => deleteVendorApiCall(vendor._id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default AdminModifyVendorReadOnly;
