// Author : Prashit Patel - B00896717
import React from "react";
import { Card, Button } from "react-bootstrap";
import "./css/Card.css";

export default function DispCard(props) {
  return (
    <Card style={{ width: "15rem", margin: "2%", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
      <Card.Img variant="top" src={props.img} />
      <Card.Body>
        <Card.Title className="cardTitle">{props.title}</Card.Title>
        <Card.Text className="cardDesc">{props.desc}</Card.Text>
        <div className="col text-center">
          <Button className="cardButton" variant="success" onClick={props.btnClick}>
            Go
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
