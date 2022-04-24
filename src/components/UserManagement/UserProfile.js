/**
 *   @author : Vasu Gamdha (B00902737)
 */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

import defaultProfileImage from "../../assets/default.png";
import { Row, Col, Container } from "react-bootstrap";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();

  /**
   * @description : This checks if the user is authenticated or not
   */
  useEffect(() => {
    if (!user) {
      toast.error("Please login to continue");
      navigate("/login");
    }
  });

  return (
    <Container>
      <div className="profile__name">
        <h1>{`${user?.result?.firstName}'s Profile`}</h1>
      </div>
      <Container fluid className="profile__details">
        <Row>
          <Col md={2} sm={12}>
            <img
              src={user?.result?.imageBase64 || defaultProfileImage}
              className="img-fluid"
            />
          </Col>
          <Col md={8} sm={12}>
            <div
              style={{ top: "25%", position:"inherit" }}
              className="my-auto h5"
            >
              <Row className="mb-2" sm={12}>
                <Col sm={4}>Name: </Col>
                <Col> {user?.result?.firstName} {user?.result?.lastName}</Col>
              </Row>
              <Row className="mb-2" sm={12}>
                <Col sm={4}>Gender:</Col>
                <Col>  {user?.result?.gender}</Col>
              </Row>
              <Row className="mb-2" sm={12}>
                <Col sm={4}>Address:</Col>
                <Col>  {user?.result?.address}</Col>
              </Row>
              <Row className="mb-2" sm={12}>
                <Col sm={4}>Mobile Number:</Col>
                <Col>  {user?.result?.mobileNumber}</Col>
              </Row>
              <Row className="mb-2" sm={12}>
                <Col sm={4}>Email:</Col>
                <Col>  {user?.result?.email}</Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default UserProfile;
