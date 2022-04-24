// Author : Prashit Patel - B00896717

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Table, Row, Col } from "react-bootstrap";
import API from "../../api";

function UserRewards() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [points, setPoints] = useState();
  const [pickups, setPickups] = useState([]);

  //check user session
  useEffect(() => {
    if (!user || user?.result?.role !== "normaluser") {
      toast.error("Please login to continue");
      navigate("/login");
    } else {
      getPickups();
      getTotalPoints();
    }
  }, [user, navigate]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [localStorage.getItem("profile")]);

  //home button click event
  const submitClick = () => {
    navigate("/user/pickups");
  };

  //reward store button click event
  const rewardStore = () => {
    navigate("/rewardstore");
  };

  // get pickups api call
  const getPickups = async () => {
    try {
      const response = await API.get("/user/pickups", {
        params: {
          userId: user?.result?._id,
        },
      });

      if (response.status === 200 && response.data.success === true) {
        setPickups(response.data.pickups);
      } else {
        setPickups([]);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };

  // get total points api call
  const getTotalPoints = async () => {
    try {
      const response = await API.get("/reward/getPoints", {
        params: {
          customerId: user?.result?._id,
        },
      });

      if (response.status === 200 && response.data.success === true) {
        setPoints(response.data.rewardData[0].points);
      } else {
        setPoints(0);
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
              marginBottom: "5%",
            }}
          >
            Rewards
          </h3>
        </Col>
      </Row>
      <Row>
        <Col sm={3} style={{ marginLeft: "5%" }}>
          <Row>
            <div
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                padding: "5%",
              }}
            >
              <h4
                style={{
                  textAlign: "center",
                  fontWeight: "bolder",
                  color: "rgba(17, 45, 92,0.85)",
                  marginBottom: "5%",
                }}
              >
                Total Points
              </h4>
              <h1
                style={{
                  textAlign: "center",
                  fontWeight: "bolder",
                  fontSize: 60,
                  color: "rgba(17, 45, 92,0.85)",
                  marginBottom: "5%",
                }}
              >
                {points}
              </h1>
            </div>
          </Row>
          <Row>
            <h4
              style={{
                textAlign: "center",
                fontWeight: "bolder",
                color: "rgba(17, 45, 92,0.85)",
                marginBottom: "5%",
                marginTop: "10%",
              }}
            >
              Redeem Rewards Here
            </h4>
            <Button
              style={{
                maxWidth: "50%",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                margin: "0 auto 5%",
              }}
              variant="success"
              onClick={rewardStore}
            >
              Reward Store
            </Button>
          </Row>
        </Col>
        <Col sm={1}></Col>
        {pickups.length > 0 && (
          <Col sm={6}>
            <h4
              style={{
                textAlign: "center",
                fontWeight: "bolder",
                color: "rgba(17, 45, 92,0.85)",
                marginBottom: "5%",
              }}
            >
              Reward History
            </h4>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Table
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: "larger",
                }}
                responsive
                striped
                bordered
                hover
              >
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Slot</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {pickups.map((pickup, index) => {
                    return (
                      <tr key={index}>
                        <td>{pickup.date}</td>
                        <td>{pickup.slot}</td>
                        <td>{pickup.points}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Col>
        )}
      </Row>
      <Row style={{ marginTop: "1%" }} className="text-center">
        <Button
          style={{
            maxWidth: "30%",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
            margin: "0 auto",
            marginTop: "3%",
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

export default UserRewards;
