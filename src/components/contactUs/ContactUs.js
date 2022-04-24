// Author : Lokansh Gupta
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DisplayVendors from "./DisplayVendors";

function ContactUs() {
  const navigate = useNavigate();

  //Method to handle submit query button click
  const handleSubmitQuery = (e) => {
    navigate("submitquery");
  };

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "1%",
        }}
      >
        Contact Us
      </h1>
      <DisplayVendors></DisplayVendors>
      <div
        style={{ marginTop: "1%", justifyContent: "center" }}
        className="text-center d flex"
      >
        <Button variant="primary" onClick={handleSubmitQuery}>
          Submit a Query
        </Button>
      </div>
    </div>
  );
}

export default ContactUs;
