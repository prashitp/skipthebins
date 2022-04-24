// Author : Lokansh Gupta
import { Button, InputGroup, FormControl } from "react-bootstrap";
import React from "react";

function AdminModifyVoucherEditable({
  index,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            required="required"
            placeholder="Company Name"
            id="companyName"
            name="companyName"
            value={editFormData.companyName}
            onChange={handleEditFormChange}
          />
        </InputGroup>
      </td>
      <td>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            required="required"
            placeholder="Value"
            id="value"
            name="value"
            value={editFormData.value}
            onChange={handleEditFormChange}
          />
        </InputGroup>
      </td>
      <td>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            required="required"
            placeholder="Points"
            id="points"
            name="points"
            value={editFormData.points}
            onChange={handleEditFormChange}
          />
        </InputGroup>
      </td>
      <td>
        <Button variant="success" type="submit">
          Save
        </Button>
        <Button variant="warning" type="submit" onClick={handleCancelClick}>
          Cancel
        </Button>
      </td>
    </tr>
  );
}

export default AdminModifyVoucherEditable;
