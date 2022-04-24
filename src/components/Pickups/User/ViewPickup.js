// Author : Prashit Patel - B00896717
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Row, Col } from "react-bootstrap";
import moment from "moment";
import { Calendar } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../../api";

export default function ViewPickup() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const [time, setTime] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [pickups, setPickups] = useState([]);
  const [selectedPickup, setSelectedPickup] = useState({});

  //check user session
  useEffect(() => {
    if (!user || user?.result?.role !== "normaluser") {
      toast.error("Please login to continue");
      navigate("/login");
    }
  }, [user, navigate]);

  //date change event
  const dateChange = (event) => {
    getPickups(event.format("LL"));
  };

  //time select event
  const onTimeSelect = (event) => {
    setTime(event.target.value);
    const slot = event.target.value.split("=")[0].trim();
    const vendor = event.target.value.split("=")[1].trim();
    const selectedPickup = pickups.filter(
      (pickup) => pickup.slot === slot && pickup.vendor === vendor
    );
    setSelectedPickup(selectedPickup[0]);
  };

  //home button click event
  const submitClick = () => {
    navigate("/user/pickups");
  };

  //show details
  useEffect(() => {
    if (time !== "" && selectedPickup !== {}) {
      setShowDetails(true);
    }
  }, [time, selectedPickup]);

  useEffect(() => {
    getPickups(moment().format("LL"));
  }, []);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [localStorage.getItem("profile")]);

  //get pickups api call
  const getPickups = async (getDate) => {
    try {
      const response = await API.get("/user/pickups", {
        params: {
          userId: user?.result?._id,
          date: getDate,
        },
      });

      if (response.status === 200 && response.data.success === true) {
        setPickups(response.data.pickups);
      } else {
        setShowDetails(false);
        setPickups([]);
        toast.error(response.data.message);
      }
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Row>
      <Row>
        <Col>
          <h3
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              marginBottom: "1%",
            }}
          >
            View Pickup Details
          </h3>
        </Col>
      </Row>
      <Col
        sm={7}
        style={{ alignItems: "center", justifyContent: "center" }}
        className="d-flex"
      >
        <Row>
          <Col sm={7} style={{ marginBottom: "2px" }}>
            <Row className="text-center">
              <h5
                style={{
                  color: "rgba(17, 45, 92,0.85)",
                  textAlign: "center",
                }}
              >
                Select Date
              </h5>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Calendar
                  fullscreen={false}
                  defaultValue={moment().endOf("day")}
                  disabledDate={(current) =>
                    current && current < moment().endOf("day")
                  }
                  onSelect={dateChange}
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                    width: "80%",
                    marginLeft: "2%",
                  }}
                />
              </div>
            </Row>
          </Col>
          <Col sm={5} style={{ marginBottom: "2px" }}>
            <Row className="text-center">
              <h5
                style={{
                  color: "rgba(17, 45, 92,0.85)",
                  textAlign: "center",
                }}
              >
                Select Time & Vendor
              </h5>
              <Row style={{ justifyContent: "center" }} className="d-flex">
                <ButtonGroup
                  style={{ minWidth: "80%" }}
                  vertical
                  onClick={onTimeSelect}
                >
                  {pickups.map((pickup, index) => {
                    return (
                      <Button
                        key={index}
                        style={{
                          margin: "2%",
                          border: "1px solid rgba(40, 111, 18,0.85)",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        }}
                        variant="light"
                        size="sm"
                        value={`${pickup.slot} = ${pickup.vendor}`}
                        active={
                          time === `${pickup.slot} = ${pickup.vendor}`
                            ? true
                            : false
                        }
                      >
                        {pickup.slot} = {pickup.vendor}
                      </Button>
                    );
                  })}
                </ButtonGroup>
              </Row>
            </Row>
          </Col>
        </Row>
      </Col>
      {showDetails && (
        <Col sm={5}>
          <h4
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              marginBottom: "2%",
            }}
          >
            Details
          </h4>
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
              margin: "0 auto",
              width: "85%",
              padding: "2%",
              borderRadius: "2%",
            }}
          >
            <Row
              style={{
                margin: "0 auto",
                marginBottom: "2%",
                textAlign: "center",
              }}
            >
              <Col>
                <h4
                  style={{ textAlign: "center", color: "rgba(40, 111, 18, 1)" }}
                >
                  Date : {selectedPickup.date}
                </h4>
              </Col>
            </Row>
            <Row
              style={{
                margin: "0 auto",
                marginBottom: "2%",
                textAlign: "center",
              }}
            >
              <Col>
                <h4
                  style={{ textAlign: "center", color: "rgba(40, 111, 18, 1)" }}
                >
                  Time : {selectedPickup.slot + " - " + selectedPickup.vendor}
                </h4>
              </Col>
            </Row>
            <Row
              style={{
                margin: "0 auto",
                marginBottom: "2%",
                textAlign: "center",
              }}
            >
              <Col>
                <h4
                  style={{ textAlign: "center", color: "rgba(40, 111, 18, 1)" }}
                >
                  Waste Types :{" "}
                  {selectedPickup.wasteType.map((item) => item).join(", ")}
                </h4>
              </Col>
            </Row>
            <Row
              style={{
                margin: "0 auto",
                marginBottom: "2%",
                textAlign: "center",
              }}
            >
              <Col>
                <h4
                  style={{ textAlign: "center", color: "rgba(40, 111, 18, 1)" }}
                >
                  No. of bags : {selectedPickup.boxQty}
                </h4>
              </Col>
            </Row>
            <Row
              style={{
                margin: "0 auto",
                textAlign: "center",
                marginBottom: "2%",
              }}
            >
              <Col>
                <h4
                  style={{
                    textAlign: "center",
                    color: "rgba(40, 111, 18, 1)",
                  }}
                >
                  Weight : {selectedPickup.wasteQty} kg
                </h4>
              </Col>
            </Row>
            <Row
              style={{
                margin: "0 auto",
                textAlign: "center",
                marginBottom: "2%",
              }}
            >
              <Col>
                <h4
                  style={{ textAlign: "center", color: "rgba(40, 111, 18, 1)" }}
                >
                  Address : {selectedPickup.address}
                </h4>
              </Col>
            </Row>
            <Row
              style={{
                margin: "0 auto",
                textAlign: "center",
                marginBottom: "2%",
              }}
            >
              <Col>
                <h4
                  style={{ textAlign: "center", color: "rgba(40, 111, 18, 1)" }}
                >
                  Area : {selectedPickup.area}
                </h4>
              </Col>
            </Row>
          </div>
        </Col>
      )}
      <Row style={{ marginTop: "1%" }} className="text-center">
        <Button
          style={{
            maxWidth: "30%",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
            margin: "0 auto",
          }}
          variant="success"
          onClick={submitClick}
        >
          Home
        </Button>
      </Row>
    </Row>
  );
}
