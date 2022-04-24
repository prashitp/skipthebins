// Author : Prashit Patel - B00896717
import React from "react";
import { Row, Col } from "react-bootstrap";
import image1 from "../assets/images/image1.jpeg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";

import Image from "react-bootstrap/Image";

export default function Home() {
  return (
    <Row>
      <Row style={{marginBottom: "2%"}}>
        <h1
          style={{
            fontSize: "xx-large",
            textAlign: "center",
            color: "rgba(17, 45, 92, 0.85)",
          }}
        >
          Welcome to Skip The Bins!!
        </h1>
      </Row>
      <Row>
        <Col sm={4}>
          <Row>
            <Image width="100" roundedCircle src={image1}/>
          </Row>
          <Row>
            <h2 style={{ fontSize: "larger", textAlign: "center", marginTop: "2%" }}>
              Flexible Pickups
            </h2>
            <p style={{ fontSize: "larger", textAlign: "center", marginTop: "2%" }}>
              Let us know when you are available and we will pickup your trash
              as and when you are ready!!
            </p>
          </Row>
        </Col>
        <Col sm={4}>
          <Row>
            <Image roundedCircle src={image2}/>
          </Row>
          <Row>
            <h2 style={{ fontSize: "larger", textAlign: "center", marginTop: "2%" }}>
              Tracking
            </h2>
            <p style={{ fontSize: "larger", textAlign: "center", marginTop: "2%" }}>
              You can now track the whereabouts of your waste from the minute you schedule till it is recycled!!
            </p>
          </Row>
        </Col>
        <Col sm={4}>
          <Row>
            <Image roundedCircle src={image3}/>
          </Row>
          <Row>
            <h2 style={{ fontSize: "larger", textAlign: "center", marginTop: "2%" }}>
              Statistics
            </h2>
            <p style={{ fontSize: "larger", textAlign: "center", marginTop: "2%" }}>
              You can now see your contribution to the environment by giving us your recyclable waste in terms of graphs!!
            </p>
          </Row>
        </Col>
      </Row>
    </Row>
  );
}
