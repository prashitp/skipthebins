// Author : Lokansh Gupta
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ContactUs.css";
import { Card } from "react-bootstrap";
import { WEB_API_URL } from "../../constants";
import { toast } from "react-toastify";

function DisplayVendors() {
  const [vendorData, setVendorData] = useState([]);

  useEffect(() => {
    getAllVendorsApiCall();
  }, []);

  //Method to handle get all vendors api call
  const getAllVendorsApiCall = () => {
    axios
      .get(WEB_API_URL + "/vendor")
      .then((res) => {
        setVendorData(res.data.vendorData);
      })
      .catch((error) => {
        toast.error("Internal Server Error");
      });
  };

  //Method to hanle vendor card
  const vendorCard = (card, index) => {
    return (
      <Card
        style={{
          width: "15rem",
          margin: "20px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        key={index}
      >
        <Card.Body>
          <Card.Title className="cardTitle">{card.name}</Card.Title>
          <Card.Text className="cardDesc">
            <b>Address - </b>
            {card.address} <br />
            <b>Phone Number - </b>
            {card.phoneNumber} <br />
            <b>Email - </b>
            {card.email}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
      <h4
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "1%",
        }}
      >
        Vendor Contact Details
      </h4>
      <div className="grid">{vendorData.map(vendorCard)}</div>
    </div>
  );
}

export default DisplayVendors;
