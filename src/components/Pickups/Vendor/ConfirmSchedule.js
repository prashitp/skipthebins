// Author : Prashit Patel - B00896717
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Row, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ScheduleConfirm() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const { state } = useLocation();
  const { date, slots } = state;

  //home button click event
  const submitClick = () => {
    navigate("/vendor/pickups");
  };

  //check user session
  useEffect(() => {
    if (!user || user?.result?.role !== "vendor") {
      toast.error("Please login to continue");
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  },[localStorage.getItem("profile")]);

  return (
    <Row>
      <h3
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "2%",
        }}
      >
        Schedule Details
      </h3>
      <h4
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "2%",
        }}
      >
        Date :{" "}
        {moment(date[0]).format("DD/MM/YYYY") +
          " to " +
          moment(date[1]).format("DD/MM/YYYY")}
      </h4>
      <h5
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "1%",
        }}
      >
        Slots
      </h5>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Table
          style={{ width: "100%", textAlign: "center", fontSize: "larger" }}
          responsive
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              <th>Time</th>
              <th>Area</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot, index) => {
              return (
                <tr key={index}>
                  <td>{slot.time[0] + " to " + slot.time[1]}</td>
                  <td>{slot.area}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Button
        style={{
          maxWidth: "20%",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
          margin: "2% auto",
        }}
        variant="success"
        onClick={submitClick}
      >
        Home
      </Button>
    </Row>
  );
}
