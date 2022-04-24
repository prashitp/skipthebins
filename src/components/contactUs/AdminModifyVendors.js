// Author : Lokansh Gupta
import React, { useEffect, useState, Fragment } from "react";
import "./ContactUs.css";
import { Table, Form, Button } from "react-bootstrap";
import AdminModifyVendorReadOnly from "./AdminModifyVendorReadOnly";
import AdminModifyVendorEditable from "./AdminModifyVendorEditable";
import { toast } from "react-toastify";
import API from "../../api";
import { useNavigate } from "react-router-dom";

function AdminModifyVendors() {
  const nameRegex = /^[a-zA-Z ]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneNumberRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [addressErrorMsg, setAddressErrorMsg] = useState("");
  const [phoneNumberErrorMsg, setPhoneNumberErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [isName, setIsName] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isData, setIsData] = useState(false);
  const [vendors, setVendors] = useState([]);

  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    if (!user || user?.result?.role !== "admin") {
      toast.error("Please login as admin to continue");

      navigate("/login");
    } else {
      getAllVendorsApiCall();
    }
  }, [user, navigate]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [localStorage.getItem("profile")]);

  //Method to handle get all vednors api call
  const getAllVendorsApiCall = () => {
    API.get("/vendor")
      .then((res) => {
        setVendors(res.data.vendorData);
      })
      .catch((error) => {
        toast.error("Internal Server Error");
      });
  };

  const [addFormData, setAddFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editVendorId, setEditVendorId] = useState(null);

  //Method to handle form change
  const handleFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.id;
    const fieldValue = e.target.value;

    if (fieldName === "name") {
      if (fieldValue && !nameRegex.test(fieldValue)) {
        setNameErrorMsg(
          "Please provide name in correct alphabet only format (Eg. 'Dylan Williams')"
        );
        setIsName(false);
      } else {
        setIsData(true);
        setIsName(true);
        setNameErrorMsg("");
      }
    }
    if (fieldName === "address") {
      if (fieldValue === "") {
        setAddressErrorMsg("Please provide address");
        setIsAddress(false);
      } else {
        setIsData(true);
        setIsAddress(true);
        setAddressErrorMsg("");
      }
    }
    if (fieldName === "phoneNumber") {
      if (fieldValue && !phoneNumberRegex.test(fieldValue)) {
        setPhoneNumberErrorMsg(
          "Please provide phone number in correct format (Eg. '+1-9997776666' or '9997776666')"
        );
        setIsPhoneNumber(false);
      } else {
        setIsData(true);
        setIsPhoneNumber(true);
        setPhoneNumberErrorMsg("");
      }
    }
    if (fieldName === "email") {
      if (fieldValue && !emailRegex.test(fieldValue)) {
        setEmailErrorMsg(
          "Please provide email in correct format (Eg. 'xyz@abc.com')"
        );
        setIsEmail(false);
      } else {
        setIsData(true);
        setIsEmail(true);
        setEmailErrorMsg("");
      }
    }

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  //Method to handle edit form button click
  const handleEditFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.id;
    const fieldValue = e.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  //Method to handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newVendor = {
      name: addFormData.name,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    if (
      nameErrorMsg.length > 0 ||
      addressErrorMsg.length > 0 ||
      phoneNumberErrorMsg.length > 0 ||
      emailErrorMsg.length > 0
    ) {
      toast.error("Please resolve error");
    } else if (!isData) {
      toast.error("Please enter some data");
    } else if (!isName || !isAddress || !isPhoneNumber || !isEmail) {
      toast.error("Please fill data in all fields of the form");
    } else {
      submitVendorApiCall(newVendor);
    }
  };

  //Method to handle submit vendor button click
  const submitVendorApiCall = (newVendor) => {
    API.post("/vendor/add", newVendor)
      .then((res) => {
        if (res.data.success) {
          toast.success("Vendor Added");
          getAllVendorsApiCall();
          setAddFormData({
            name: "",
            address: "",
            phoneNumber: "",
            email: "",
          });
          const form = document.getElementById("my_form");
          form.reset();
        } else {
          toast.error("Vendor not added");
        }
      })
      .catch((error) => {
        toast.error("Internal Server Error");
      });
  };

  //Method to handle edit form button click
  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    const editedVendor = {
      _id: editVendorId,
      name: editFormData.name,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    editVendorApiCall(editedVendor);
  };

  //Method to handle edit vendor api call
  const editVendorApiCall = (editedVendor) => {
    API.post("/vendor/update", editedVendor)
      .then((res) => {
        if (res.data.success) {
          toast.success("Vendor Edited");
          getAllVendorsApiCall();
          setEditVendorId(null);
        } else {
          toast.error("Vendor not edited");
        }
      })
      .catch((error) => {
        toast.error("Internal Server Error");
      });
  };

  //Method to handle edit button click
  const handleEditClick = (e, vendor) => {
    e.preventDefault();
    setEditVendorId(vendor._id);

    const formValues = {
      _id: vendor._id,
      name: vendor.name,
      address: vendor.address,
      phoneNumber: vendor.phoneNumber,
      email: vendor.email,
    };

    setEditFormData(formValues);
  };

  //Method to handle cancel button click
  const handleCancelClick = () => {
    setEditVendorId(null);
  };

  //Method to handle delete button click
  const deleteVendorApiCall = (vendorId) => {
    const deleteId = {
      _id: vendorId,
    };
    API.post("/vendor/delete", deleteId)
      .then((res) => {
        if (res.data.success) {
          toast.success("Vendor Deleted");
          getAllVendorsApiCall();
        } else {
          toast.error("Vendor not deleted");
        }
      })
      .catch((error) => {
        toast.error("Internal Server Error");
      });
  };

  return (
    <div className="contactContainer">
      <h1
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "1%",
        }}
      >
        Contact Us
      </h1>{" "}
      <h4
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "1%",
        }}
      >
        Vendors List
      </h4>
      <Form onSubmit={handleEditFormSubmit}>
        <Table responsive="sm" bordered="true" size="sm" striped="true">
          <thead
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              marginBottom: "1%",
            }}
          >
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody
            style={{
              textAlign: "center",
              color: "rgba(17, 45, 92,0.85)",
            }}
          >
            {vendors.map((vendor, index) => (
              <Fragment key={index}>
                {editVendorId === vendor._id ? (
                  <AdminModifyVendorEditable
                    index={index}
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <AdminModifyVendorReadOnly
                    vendor={vendor}
                    index={index}
                    handleEditClick={handleEditClick}
                    deleteVendorApiCall={deleteVendorApiCall}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </Table>
      </Form>
      <div>
        <h4
          style={{
            textAlign: "center",
            fontWeight: "bolder",
            color: "rgba(17, 45, 92,0.85)",
            marginBottom: "1%",
          }}
        >
          Add a new vendor
        </h4>
        <Form
          id="my_form"
          style={{
            fontWeight: "bolder",
            color: "rgba(17, 45, 92,0.85)",
            marginBottom: "1%",
          }}
        >
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Vendor Name"
              onChange={handleFormChange}
            />
            <Form.Text style={{ color: "red" }}>
              {nameErrorMsg.length > 0 ? nameErrorMsg : ""}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Vendor Address"
              onChange={handleFormChange}
            />
            <Form.Text style={{ color: "red" }}>
              {addressErrorMsg.length > 0 ? addressErrorMsg : ""}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Vendor Phone Number"
              onChange={handleFormChange}
            />
            <Form.Text style={{ color: "red" }}>
              {phoneNumberErrorMsg.length > 0 ? phoneNumberErrorMsg : ""}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Vendor Email"
              onChange={handleFormChange}
            />
            <Form.Text style={{ color: "red" }}>
              {emailErrorMsg.length > 0 ? emailErrorMsg : ""}
            </Form.Text>
          </Form.Group>
          <div
            style={{ marginTop: "1%", justifyContent: "center" }}
            class="text-center d flex"
          >
            <Button variant="success" type="submit" onClick={handleFormSubmit}>
              Add
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AdminModifyVendors;
