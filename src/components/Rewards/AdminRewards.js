// Author : Prashit Patel - B00896717

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Table,
  Row,
  Col,
  Form,
  Modal,
  Container,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import API from "../../api";
import { editProfile } from "../../store/actions/auth";

function AdminRewards() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [queries, setQueries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [openedQuery, setOpenedQuery] = useState({});
  const [rewardPoints, setRewardPoints] = useState(0);
  const [userReward, setUserReward] = useState(0);

  //check user session
  useEffect(() => {
    if (!user || user?.result?.role !== "admin") {
      toast.error("Please login to continue");
      navigate("/login");
    } else {
      setRewardPoints(user?.result?.points);
    }
  }, [user, navigate]);

  useEffect(() => {
    getQueries();
  }, [user]);

  //get user queries
  const getQueries = async () => {
    try {
      const response = await API.get("/queries", {});

      if (response.status === 200 && response.data.success === true) {
        const complaintQueries = response.data.queryData.filter((query) =>
          query.querySubject?.toLowerCase().includes("complaint")
        );
        setQueries(complaintQueries);
      } else {
        setQueries([]);
        toast.error(response.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };

  //reward point change event
  const onUserRewardPointsChange = (event) => {
    setUserReward(parseInt(event.target.value));
  };

  //open modal event
  const openModal = (query) => {
    setOpenedQuery(query);
    setUserReward(query.points);
    setShowModal(true);
  };

  //total reward points change event
  const rewardPointsChange = (event) => {
    setRewardPoints(parseInt(event.target.value));
  };

  //update reward points api call
  const updateRewardPoints = () => {
    dispatch(editProfile(user?.result?._id, { points: rewardPoints }));
  };

  //complaint save event
  const onComplaintSave = async () => {
    const queryArr = queries;
    const index = queryArr.findIndex(
      (query) => query.email === openedQuery.email
    );
    queryArr[index].points = userReward;
    setQueries(queryArr);
    setShowModal(false);

    try {
      const body = {
        email: openedQuery.email,
        points: userReward,
      };
      const response = await API.put("/reward/updateComplaintPoints", body);

      if (
        response.status === 200 &&
        response.data.success === true &&
        response.data.message === "Reward points updated"
      ) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };

  //home button click event
  const submitClick = () => {
    navigate("/profile");
  };

  return (
    <Row>
      <Row>
        <Col>
          <h3
            style={{
              textAlign: "left",
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              marginBottom: "1%",
            }}
          >
            Reward Settings
          </h3>
        </Col>
      </Row>
      <Row>
        <h4
          style={{
            textAlign: "left",
            fontWeight: "bolder",
            color: "rgba(17, 45, 92,0.85)",
            marginBottom: "1%",
            marginLeft: "5%",
          }}
        >
          Reward Points per kg :
        </h4>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginLeft: "5%",
            marginBottom: "5%",
          }}
        >
          <Form.Control
            style={{
              maxWidth: "10%",
              minWidth: "100px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
            }}
            type="number"
            value={rewardPoints}
            min={1}
            onChange={rewardPointsChange}
          />
          <Button
            style={{
              maxWidth: "30%",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
              // margin: "0 auto",
              marginLeft: "3%",
            }}
            variant="success"
            onClick={updateRewardPoints}
          >
            Update
          </Button>
        </div>
        {/* </div> */}
      </Row>
      <Row>
        <h3
          style={{
            textAlign: "left",
            fontWeight: "bolder",
            color: "rgba(17, 45, 92,0.85)",
            marginBottom: "2%",
          }}
        >
          Reward Points compensation
        </h3>
      </Row>
      <Row>
        <h4
          style={{
            textAlign: "left",
            fontWeight: "bolder",
            color: "rgba(17, 45, 92,0.85)",
            marginBottom: "2%",
            marginLeft: "5%",
          }}
        >
          User complaints
        </h4>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginLeft: "5%",
          }}
        >
          <Table
            style={{ width: "100%", textAlign: "center", fontSize: "larger" }}
            responsive
            striped
            bordered
            hover
          >
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((query, index) => {
                return (
                  <tr key={index}>
                    <td>{query.name}</td>
                    <td>{query.email}</td>
                    <td>{query.querySubject}</td>
                    <td>{query.points}</td>
                    <td>
                      <Button
                        style={{
                          // maxWidth: "30%",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                          margin: "0 auto",
                          marginTop: "3%",
                        }}
                        variant="success"
                        onClick={() => openModal(query)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
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
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
            }}
          >
            Complaint Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <h5
                  style={{
                    textAlign: "center",
                    fontWeight: "bolder",
                    color: "rgba(17, 45, 92,0.85)",
                    marginBottom: "2%",
                  }}
                >
                  User: {openedQuery.name}
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5
                  style={{
                    textAlign: "center",
                    fontWeight: "bolder",
                    color: "rgba(17, 45, 92,0.85)",
                    marginBottom: "2%",
                  }}
                >
                  Email: {openedQuery.email}
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5
                  style={{
                    textAlign: "center",
                    fontWeight: "bolder",
                    color: "rgba(17, 45, 92,0.85)",
                    marginBottom: "3%",
                  }}
                >
                  Subject: {openedQuery.querySubject}
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6
                  style={{
                    textAlign: "center",
                    fontWeight: "bolder",
                    color: "rgba(17, 45, 92,0.85)",
                    marginBottom: "3%",
                  }}
                >
                  {openedQuery.query}
                </h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5
                  style={{
                    textAlign: "center",
                    fontWeight: "bolder",
                    color: "rgba(17, 45, 92,0.85)",
                    marginBottom: "3%",
                  }}
                >
                  Add Reward Points
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Form.Control
                    style={{
                      maxWidth: "10%",
                      minWidth: "100px",
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                      // margin: "0 auto",
                    }}
                    value={userReward}
                    type="number"
                    min={1}
                    onChange={onUserRewardPointsChange}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={onComplaintSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}

export default AdminRewards;
