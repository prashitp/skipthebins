// Author : Lokansh Gupta
import { Button } from "react-bootstrap";
import React from "react";

function AdminModifyVoucherReadOnly({
  voucher,
  index,
  handleEditClick,
  deleteVoucherApiCall,
}) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{voucher.companyName}</td>
      <td>{voucher.value}</td>
      <td>{voucher.points}</td>
      <td>
        <Button
          variant="primary"
          type="button"
          onClick={(event) => handleEditClick(event, voucher)}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          type="button"
          onClick={() => deleteVoucherApiCall(voucher._id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default AdminModifyVoucherReadOnly;
