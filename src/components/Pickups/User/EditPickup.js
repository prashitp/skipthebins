// Author : Prashit Patel - B00896717
import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { Calendar } from "antd";
import moment from "moment";
import "./css/EditPickup.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../../api";

export default function EditPickup() {
  const navigate = useNavigate();
  // const [date, setDate] = useState(moment().add(1, "day").format("LL"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const [time, setTime] = useState("");
  const [wasteTypes, setWasteTypes] = useState([]);
  const [bags, setBags] = useState(0);
  const [weight, setWeight] = useState(0);
  const [pickups, setPickups] = useState([]);
  const [selectedPickup, setSelectedPickup] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [disableUpdate, setDisableUpdate] = useState(false);

  //check user session
  useEffect(() => {
    if (!user || user?.result?.role !== "normaluser") {
      toast.error("Please login to continue");
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  },[localStorage.getItem("profile")]);

  //date change event
  const dateChange = (event) => {
    getPickups(event.format("LL"));
  };

  //time select event
  const onTimeSelect = (event) => {
    setTime(event.target.value);
    const slot = event.target.value.split("=")[0].trim();
    const vendor = event.target.value.split("=")[1].trim();
    const selected = pickups.filter(
      (pickup) => pickup.slot === slot && pickup.vendor === vendor
    );
    setSelectedPickup(selected[0]);
    setWasteTypes(selected[0].wasteType);
    setBags(parseInt(selected[0].boxQty));
    setWeight(parseInt(selected[0].wasteQty));
    setShowDetails(true);
  };

  //waste type change event
  const wasteTypeChange = (event) => {
    setWasteTypes(event);
  };

  //no of bags change event
  const onBagsChange = (event) => {
    setBags(parseInt(event.target.value));
  };

  //weight change event
  const onWeightChange = (event) => {
    setWeight(parseInt(event.target.value));
  };

  useEffect(() => {
    getPickups(moment().add(1, "day").format("LL"));
  }, []);

  //update disable enable event
  useEffect(() => {
    if (bags > 0 && weight > 0 && wasteTypes.length > 0) {
      setDisableUpdate(false);
    } else {
      setDisableUpdate(true);
    }
  }, [bags, weight, wasteTypes]);

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
        setPickups([]);
        toast.error(response.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };

  //update pickup button event and api call
  const submitClick = async () => {
    try {
      const body = {
        wasteType: wasteTypes,
        boxQty: bags,
        wasteQty: weight,
      };
      const response = await API.put(
        "/user/update/" + selectedPickup.pickupId,
        body
      );

      if (response.status === 200 && response.data.success === true) {
        toast.success(response.data.message);
        navigate("/user/pickups");
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <div>
        <h3
          style={{
            textAlign: "center",
            fontWeight: "bolder",
            color: "rgba(17, 45, 92,0.85)",
            marginBottom: "1%",
          }}
        >
          Change your Pickup
        </h3>

        <div style={{ marginLeft: "2%" }}>
          <Row>
            <Col sm={3} style={{ marginBottom: "2px" }}>
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
                    defaultValue={moment().add(1, "day").endOf("day")}
                    disabledDate={(current) =>
                      current && current <= moment().endOf("day")
                    }
                    onSelect={dateChange}
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                      width: "90%",
                      marginLeft: "1%",
                    }}
                  />
                </div>
              </Row>
            </Col>
            <Col sm={3} style={{ marginBottom: "2px" }}>
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
                  {pickups.length === 0 ? (
                    <h4>No pickups found!</h4>
                  ) : (
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
                  )}
                </Row>
              </Row>
            </Col>
            {showDetails && (
              <Col sm={3} style={{ marginBottom: "2px" }}>
                <Row className="text-center">
                  <h5
                    style={{
                      color: "rgba(17, 45, 92,0.85)",
                      textAlign: "center",
                    }}
                  >
                    Select Waste Types
                  </h5>
                  <Row className="text-center">
                    <ToggleButtonGroup
                      style={{ minWidth: "80%" }}
                      vertical
                      type="checkbox"
                      value={wasteTypes}
                      onChange={wasteTypeChange}
                    >
                      <ToggleButton
                        style={{
                          margin: "2%",
                          border: "1px solid rgba(40, 111, 18,0.85)",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        }}
                        id="tbg-btn-1"
                        variant="light"
                        value="Plastic"
                      >
                        Plastic
                      </ToggleButton>
                      <ToggleButton
                        style={{
                          margin: "2%",
                          border: "1px solid rgba(40, 111, 18,0.85)",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        }}
                        variant="light"
                        id="tbg-btn-2"
                        value="Cardboard"
                      >
                        Cardboard
                      </ToggleButton>
                      <ToggleButton
                        style={{
                          margin: "2%",
                          border: "1px solid rgba(40, 111, 18,0.85)",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        }}
                        variant="light"
                        id="tbg-btn-3"
                        value="Glass"
                      >
                        Glass
                      </ToggleButton>
                      <ToggleButton
                        style={{
                          margin: "2%",
                          border: "1px solid rgba(40, 111, 18,0.85)",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        }}
                        variant="light"
                        id="tbg-btn-4"
                        value="Metal"
                      >
                        Metal
                      </ToggleButton>
                      <ToggleButton
                        style={{
                          margin: "2%",
                          border: "1px solid rgba(40, 111, 18,0.85)",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        }}
                        variant="light"
                        id="tbg-btn-5"
                        value="Wood"
                      >
                        Wood
                      </ToggleButton>
                      <ToggleButton
                        style={{
                          margin: "2%",
                          border: "1px solid rgba(40, 111, 18,0.85)",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        }}
                        id="tbg-btn-6"
                        variant="light"
                        value="Clothing"
                      >
                        Clothing
                      </ToggleButton>
                      <ToggleButton
                        style={{
                          margin: "2%",
                          border: "1px solid rgba(40, 111, 18,0.85)",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        }}
                        id="tbg-btn-7"
                        variant="light"
                        value="Other"
                      >
                        Other
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Row>
                </Row>
              </Col>
            )}
            {showDetails && (
              <Col sm={3} style={{ marginBottom: "2%" }}>
                <Row className="text-center">
                  <h5
                    style={{
                      color: "rgba(17, 45, 92,0.85)",
                      textAlign: "center",
                    }}
                  >
                    Number of bags/boxes
                  </h5>
                  <Row className="text-center">
                    <Form.Control
                      style={{
                        maxWidth: "80%",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        margin: "0 auto",
                      }}
                      type="number"
                      max={10}
                      min={1}
                      onChange={onBagsChange}
                      value={bags}
                    />
                  </Row>
                </Row>
                <Row style={{ marginTop: "5%" }} className="text-center">
                  <h5
                    style={{
                      color: "rgba(17, 45, 92,0.85)",
                      textAlign: "center",
                    }}
                  >
                    Approximate Weight
                  </h5>
                  <Row className="text-center">
                    <Form.Control
                      style={{
                        maxWidth: "80%",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        margin: "0 auto",
                      }}
                      type="number"
                      max={10}
                      min={1}
                      onChange={onWeightChange}
                      value={weight}
                    />
                  </Row>
                </Row>
              </Col>
            )}
          </Row>
          <Row style={{ marginTop: "1%" }} className="text-center">
            <Button
              style={{
                maxWidth: "30%",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                margin: "0 auto",
              }}
              variant="success"
              disabled={disableUpdate}
              onClick={submitClick}
            >
              Update
            </Button>
          </Row>
        </div>
      </div>
    </div>
  );
}
