// Author : Lokansh Gupta
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { WEB_API_URL } from "../../constants";
import { toast } from "react-toastify";

function SubmitQueryForm() {
  useEffect(() => {});

  const nameRegex = /^[a-zA-Z .]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [querySubject, setQuerySubject] = useState("");
  const [query, setQuery] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");

  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [mobileErrorMsg, setMobileErrorMsg] = useState("");
  const [querySubjectErrorMsg, setQuerySubjectErrorMsg] = useState("");
  const [queryErrorMsg, setQueryErrorMsg] = useState("");
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isQuerySubject, setIsQuerySubject] = useState(false);
  const [isQuery, setIsQuery] = useState(false);
  const [isData, setIsData] = useState(false);

  //Method to handle name change
  const handleName = (e) => {
    if (e.target.value && !nameRegex.test(e.target.value)) {
      setNameErrorMsg(
        "Please provide name in correct alphabet only format (Eg. 'Dylan Williams')"
      );
      setIsName(false);
    } else {
      setIsData(true);
      setIsName(true);
      setNameErrorMsg("");
      setName(e.target.value);
    }
  };

  //Method to handle email change
  const handleEmail = (e) => {
    if (e.target.value && !emailRegex.test(e.target.value)) {
      setEmailErrorMsg(
        "Please provide email in correct format (Eg. 'xyz@abc.com')"
      );
      setIsEmail(false);
    } else {
      setIsData(true);
      setIsEmail(true);
      setEmailErrorMsg("");
      setEmail(e.target.value);
    }
  };

  //Method to handle mobile change
  const handleMobile = (e) => {
    if (e.target.value && !mobileRegex.test(e.target.value)) {
      setMobileErrorMsg(
        "Please provide mobile number in correct format (Eg. '+1-9997776666' or '9997776666')"
      );
      setIsMobile(false);
    } else {
      setIsData(true);
      setIsMobile(true);
      setMobileErrorMsg("");
      setMobile(e.target.value);
    }
  };

  //Method to handle query subject change
  const handleQuerySubject = (e) => {
    if (!e.target.value) {
      setQuerySubjectErrorMsg("Please provide your query subject");
      setIsQuerySubject(false);
    } else {
      setIsData(true);
      setIsQuerySubject(true);
      setQuerySubjectErrorMsg("");
      setQuerySubject(e.target.value);
    }
  };

  //Method to handle query change
  const handleQuery = (e) => {
    if (!e.target.value) {
      setQueryErrorMsg("Please provide your query");
      setIsQuery(false);
    } else {
      setIsData(true);
      setIsQuery(true);
      setQueryErrorMsg("");
      setQuery(e.target.value);
    }
  };

  //Method to handle submit button click
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      nameErrorMsg.length > 0 ||
      emailErrorMsg.length > 0 ||
      mobileErrorMsg.length > 0 ||
      querySubjectErrorMsg.length > 0 ||
      queryErrorMsg.length > 0
    ) {
      toast.error("Please resolve error");
    } else if (!isData) {
      toast.error("Please enter some data");
    } else if (
      !isName ||
      !isEmail ||
      !isMobile ||
      !isQuerySubject ||
      !isQuery
    ) {
      toast.error("Please fill data in all fields of the form");
    } else {
      submitQueryApiCall();
    }
  };

  //Method to handle submit query api call
  const submitQueryApiCall = () => {
    const refNo = Math.random().toString(36).substr(2, 9).slice(-9);
    var newQueryObj = {
      name: name,
      email: email,
      mobile: mobile,
      querySubject: querySubject,
      query: query,
      refNumber: refNo,
    };
    axios
      .post(WEB_API_URL + "/query/add", newQueryObj)
      .then((res) => {
        if (res.data.success) {
          setReferenceNumber(refNo);
          setSubmitSuccess(true);
        } else {
          toast.error("Query not submitted");
        }
      })
      .catch((error) => {
        toast.error("Internal Server Error");
      });
  };

  //Method to handle go back to home page
  const handleGoBack = (e) => {
    navigate("/");
  };

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "1%",
        }}
      >
        Contact Us
      </h1>
      {!submitSuccess && (
        <div>
          <h4
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              marginBottom: "1%",
            }}
          >
            Submit a query
          </h4>
          <h6
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              marginBottom: "1%",
            }}
          >
            Facing an issue, please fill in the form below and we will get back
            to you.
          </h6>

          <Form
            style={{
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              marginBottom: "1%",
            }}
          >
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name"
                onChange={handleName}
              />
              <Form.Text style={{ color: "red" }}>
                {nameErrorMsg.length > 0 ? nameErrorMsg : ""}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Your e-mail address"
                onChange={handleEmail}
              />
              <Form.Text style={{ color: "red" }}>
                {emailErrorMsg.length > 0 ? emailErrorMsg : ""}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="mobile">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your mobile number"
                onChange={handleMobile}
              />
              <Form.Text style={{ color: "red" }}>
                {mobileErrorMsg.length > 0 ? mobileErrorMsg : ""}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="querySubject">
              <Form.Label>Query Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="For any complaint, please add complaint in subject line"
                onChange={handleQuerySubject}
              />
              <Form.Text style={{ color: "red" }}>
                {querySubjectErrorMsg.length > 0 ? querySubjectErrorMsg : ""}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="query">
              <Form.Label>Query</Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                placeholder="Enter query..."
                onChange={handleQuery}
              />
              <Form.Text style={{ color: "red" }}>
                {queryErrorMsg.length > 0 ? queryErrorMsg : ""}
              </Form.Text>
            </Form.Group>
            <div
              style={{ marginTop: "1%", justifyContent: "center" }}
              className="text-center d flex"
            >
              <Button variant="success" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </Form>
        </div>
      )}
      {submitSuccess && (
        <div>
          <h6
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              marginBottom: "1%",
            }}
          >
            Your query has been successfully submitted with reference number -{" "}
            {referenceNumber}. We will get back to you within 2-3 working days.
          </h6>
          <div
            style={{ marginTop: "1%", justifyContent: "center" }}
            className="text-center d flex"
          >
            <Button variant="primary" type="submit" onClick={handleGoBack}>
              Home
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubmitQueryForm;
