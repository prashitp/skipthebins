// Author : Prashit Patel - B00896717
import React, { useEffect, useState } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import moment from "moment";
import { Calendar, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../../api";

export default function DeleteSchedule() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const [date, setDate] = useState(moment().add(1, "d").format("LL"));
  const [slots, setSlots] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

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

  //date change event
  const dateChange = (event) => {
    setDate(event.format("LL"));
    getSchedules(event.format("LL"));
  };

  //home button click event
  const submitClick = () => {
    navigate("/vendor/pickups");
  };

  //delete schedule event and api call
  const deleteSchedule = async () => {
    var successCount = 0;
    for (var i = 0; i < slots.length; i++) {
      console.log(slots[i].id);
      try {
        const response = await API.delete(
          "/vendor/delete/" + slots[i].id
        );

        if (response.status === 200 && response.data.success === true) {
          successCount++;
        }
      } catch (e) {
        console.log(e);
      }
    }
    toast.success(`${successCount} slots successfully deleted`);
    navigate("/vendor/pickups");
  };

  //show details event
  useEffect(() => {
    if (date !== "") {
      setShowDetails(true);
    }
  }, [date]);

  useEffect(() => {
    getSchedules(moment().add(1, "d").format("LL"));
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
        setShowDetails(false);
        setSlots([]);
        toast.error(response.data.message);
      }
    } catch (e) {
      console.log(e);
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
            Delete Schedule
          </h3>
        </Col>
      </Row>
      <Col
        sm={7}
        style={{ alignItems: "center", justifyContent: "center" }}
        className="d-flex"
      >
        <Row>
          <Col sm={3} />
          <Col sm={6} style={{ marginBottom: "2%" }}>
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
                    width: "80%",
                    marginLeft: "2%",
                  }}
                />
              </div>
            </Row>
          </Col>
        </Row>
      </Col>
      {showDetails && (
        <Col sm={4}>
          <h4
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              marginBottom: "5%",
            }}
          >
            Slots
          </h4>
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
          <Row style={{ marginTop: "1%" }} className="text-center">
            <Popconfirm
              title="Are you sure？"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={deleteSchedule}
            >
              <Button
                style={{
                  maxWidth: "20%",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                  margin: "0 auto",
                  textAlign: "center",
                }}
                variant="danger"
              >
                Delete
              </Button>
            </Popconfirm>
          </Row>
        </Col>
      )}
      <Row
        style={{ marginTop: "1%", justifyContent: "center", marginLeft: "1%" }}
        className="text-center d flex"
      >
        <Button
          style={{
            maxWidth: "20%",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
            textAlign: "center",
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
