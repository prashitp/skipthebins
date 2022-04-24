// Author : Lokansh Gupta
import { Button, InputGroup, FormControl } from "react-bootstrap";
import React from "react";

function AdminModifyVendorEditable({
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
            placeholder="Vendor Name"
            id="name"
            name="name"
            value={editFormData.name}
            onChange={handleEditFormChange}
          />
        </InputGroup>
      </td>
      <td>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            required="required"
            placeholder="Vendor Address"
            id="address"
            name="address"
            value={editFormData.address}
            onChange={handleEditFormChange}
          />
        </InputGroup>
      </td>
      <td>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            required="required"
            placeholder="Vendor Phone Number"
            id="phoneNumber"
            name="phoneNumber"
            value={editFormData.phoneNumber}
            onChange={handleEditFormChange}
          />
        </InputGroup>
      </td>
      <td>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            required="required"
            placeholder="Vendor Email"
            id="email"
            name="email"
            value={editFormData.email}
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

export default AdminModifyVendorEditable;
