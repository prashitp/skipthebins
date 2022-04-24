// Author : Prashit Patel - B00896717
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Row, Col } from "react-bootstrap";
import { TimePicker, Progress, Calendar } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { toast } from "react-toastify";
import API from "../../../api";

export default function EditSchedule() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const [date, setDate] = useState(moment().add(1, "day").format("LL"));
  const [slots, setSlots] = useState([]);

  const [time, setTime] = useState([]);
  const [area, setArea] = useState("Select Area");
  const [slotProgress, setSlotProgress] = useState(0);
  const [nextDisable, setNextDisable] = useState(false);
  const [addDisable, setAddDisable] = useState(true);
  const [areaData, setAreaData] = useState([]);
  const [pickerTime, setPickerTime] = useState();
  const [buttonText, setButtonText] = useState("Add");
  const [editableSchedule, setEditableSchedule] = useState({});

  //check user session
  useEffect(() => {
    if (!user || user?.result?.role !== "vendor") {
      toast.error("Please login to continue");
      navigate("/login");
    } 
    else {
      getArea();
    }
  }, [user, navigate]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  },[localStorage.getItem("profile")]);

  //date change event
  const dateChange = (event) => {
    setDate(event.format("LL"));
    getSchedules(event.format("LL"));
  };

  //area select event
  const onAreaSelect = (event) => {
    setArea(event.target.innerText);
  };

  //time select event
  const onTimeSelect = (event) => {
    setPickerTime(event);
    if (event === null) {
      setTime([]);
    } else {
      const fromTime = event[0].format("HH:mm");
      const toTime = event[1].format("HH:mm");

      if (fromTime === toTime) {
        setTime([]);
        toast.error("Invalid Time Range!");
      } else {
        setTime([event[0].format("hh:mm A"), event[1].format("hh:mm A")]);
      }
    }
  };

  //slot submit event and api call
  const slotSubmit = async () => {
    if (buttonText === "Add") {
      const body = {
        date: date,
        vendorId: user?.result?._id,
        vendor: user?.result?.firstName + " " + user?.result?.lastName,
        area: area,
        slot: time,
      };
      const response = await API.post(
        "/vendor/schedules/add",
        body
      );

      if (response.status === 200 && response.data.success === true) {
        getSchedules(date);
      }
    } else if (buttonText === "Update") {
      try {
        const body = {
          area: area,
          slot: [time[0], time[1]],
        };
        const response = await API.put(
          "/vendor/update/" + editableSchedule.id,
          body
        );

        if (response.status === 200 && response.data.success === true) {
          const existingSlots = slots;
          existingSlots.push({
            area: area,
            time: [time[0], time[1]],
            id: editableSchedule.id,
          });
          setSlots(existingSlots);
        } else {
          setSlots(slots);
          toast.error(response.data.message);
        }
      } catch (e) {
        console.log(e);
        toast.error("Something went wrong!");
      }
    }
    setTime([]);
    setPickerTime();
    setArea("Select Area");
    setButtonText("Add");
  };

  //update progress
  useEffect(() => {
    let slotProgress = 0;
    if (time.length > 0) {
      slotProgress += 50;
    }
    if (area !== "Select Area") {
      slotProgress += 50;
    }

    if (slotProgress === 100) {
      setAddDisable(false);
    } else {
      setAddDisable(true);
    }
    setSlotProgress(slotProgress);

    if (slots.length === 0) {
      setNextDisable(true);
    } else {
      setNextDisable(false);
    }
  }, [time, area, slots]);

  //submit schedule event
  const submitClick = () => {
    toast.success("Schedule is updated successfully!");
    navigate("/vendor/pickups");
  };

  //get area api call
  const getArea = async () => {
    try {
      const response = await API.get("/area");

      if (response.status === 200 && response.data.success === true) {
        setAreaData(response.data.areas);
      } else {
        setAreaData([]);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };

  //slot delete event
  const slotDeleteClick = async (id) => {
    try {
      await API.delete("/vendor/delete/" + id);
    } catch (e) {
      console.log(e);
    }
    const newSlots = slots.filter((slot) => slot.id !== id);
    setSlots(newSlots);
  };

  //slot edit event
  const slotEditClick = (id) => {
    const selectedSlot = slots.filter((slot) => slot.id === id);
    setEditableSchedule(selectedSlot[0]);
    setArea(selectedSlot[0].area);
    setTime([selectedSlot[0].time[0], selectedSlot[0].time[1]]);
    setPickerTime([
      moment(selectedSlot[0].time[0], "hh:mm A"),
      moment(selectedSlot[0].time[1], "hh:mm A"),
    ]);
    const newSlots = slots.filter((slot) => slot.id !== id);
    setSlots(newSlots);

    setButtonText("Update");
  };

  useEffect(() => {
    getSchedules(moment().add(1, "day").format("LL"));
  }, []);

  //get schedule api call
  const getSchedules = async (getDate) => {
    try {
      const response = await API.get("/vendor/schedules", {
        params: {
          date: getDate,
          vendorId: user?.result?._id,
        },
      });
      if (response.status === 200 && response.data.success === true) {
        const schedules = response.data.schedules;
        let scheduleSlots = [];

        for (var i = 0; i < schedules.length; i++) {
          scheduleSlots.push({
            area: schedules[i].area,
            time: [
              schedules[i].slot.split("-")[0].trim(),
              schedules[i].slot.split("-")[1].trim(),
            ],
            id: schedules[i].scheduleId,
          });
        }
        setSlots(scheduleSlots);
      } else {
        setSlots([]);
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
          Edit Schedule
        </h3>
        <div>
          <Row>
            <Col sm={4} style={{ marginBottom: "2px" }}>
              <Row className="text-center">
                <h5
                  style={{
                    color: "rgba(17, 45, 92,0.85)",
                    textAlign: "center",
                  }}
                >
                  Select Date
                </h5>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "2%",
                  }}
                >
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
                    }}
                  />
                </div>
              </Row>
            </Col>
            <Col sm={8} style={{ marginBottom: "2px", paddingLeft: "2%" }}>
              <Row className="text-center">
                <h5
                  style={{
                    color: "rgba(17, 45, 92,0.85)",
                    textAlign: "left",
                  }}
                >
                  Slot Details
                </h5>
                {slots.map((slot, index) => {
                  return (
                    <Row
                      key={index}
                      style={{
                        margin: "1% 0 1% 0",
                      }}
                      className="text-center"
                    >
                      <Col sm={8}>
                        <h5
                          style={{
                            color: "rgba(17, 45, 92, 0.85)",
                            border: "1px solid rgba(17, 45, 92, 0.85)",
                          }}
                        >
                          {slot.time[0] +
                            " to " +
                            slot.time[1] +
                            " - " +
                            slot.area}
                          <Button
                            style={{
                              backgroundColor: "transparent",
                              marginLeft: "2%",
                              paddingBottom: "2%",
                            }}
                            variant="light"
                            onClick={() => slotDeleteClick(slot.id)}
                          >
                            <DeleteTwoTone
                              twoToneColor="red"
                              style={{ fontSize: "x-large" }}
                            />
                          </Button>
                          <Button
                            style={{
                              backgroundColor: "transparent",
                              marginLeft: "1%",
                              paddingBottom: "2%",
                            }}
                            variant="light"
                            onClick={() => slotEditClick(slot.id)}
                          >
                            <EditTwoTone
                              twoToneColor="green"
                              style={{ fontSize: "x-large" }}
                            />
                          </Button>
                        </h5>
                      </Col>
                    </Row>
                  );
                })}
                <Row
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingRight: "5%",
                    margin: "1%",
                  }}
                  className="d-flex"
                >
                  <Col sm={4} style={{ margin: "2%" }}>
                    <TimePicker.RangePicker
                      use12Hours
                      minuteStep={30}
                      format="hh:mm A"
                      onChange={onTimeSelect}
                      value={pickerTime}
                    />
                  </Col>
                  <Col sm={3} style={{ margin: "2%" }}>
                    <Dropdown
                      style={{
                        minWidth: "20%",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                      }}
                    >
                      <Dropdown.Toggle
                        style={{ width: "100%" }}
                        variant="success"
                        id="dropdown-basic"
                        size="sm"
                      >
                        {area}
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        style={{ width: "100%" }}
                        onClick={onAreaSelect}
                      >
                        {areaData.map((area, index) => {
                          return (
                            <Dropdown.Item
                              key={index}
                              style={{ textAlign: "center" }}
                              value={area.name}
                            >
                              {area.name}
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col sm={3} style={{ margin: "2%" }}>
                    <Button
                      style={{
                        maxWidth: "35%",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        margin: "0 auto",
                      }}
                      variant="primary"
                      onClick={slotSubmit}
                      disabled={addDisable}
                      size="sm"
                    >
                      {buttonText}
                    </Button>
                    <Progress
                      type="circle"
                      percent={slotProgress}
                      status="success"
                      width="30px"
                      strokeWidth="10"
                      style={{ marginLeft: "5%" }}
                    />
                  </Col>
                </Row>
              </Row>
            </Col>
          </Row>
          <Row style={{ marginTop: "1%" }} className="text-center">
            <Button
              style={{
                maxWidth: "30%",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                margin: "0 auto",
              }}
              variant="success"
              onClick={submitClick}
              disabled={nextDisable}
            >
              Update
            </Button>
          </Row>
        </div>
      </div>
    </div>
  );
}
