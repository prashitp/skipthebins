/**
 *   @author : Vasu Gamdha (B00902737)
 */

import React, { useState } from "react";
import "./Signup.css";

import { Form, Button } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../../store/actions/auth";

import FileBase from "react-file-base64";
import { toast } from "react-toastify";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  mobileNumber: "",
  address: "",
  gender: "",
  role: "",
  organizationName: "",
  reason: "",
};

const Signup = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * @description : This performs the validation before the user is signed up.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      mobileNumber,
      address,
      role,
      organizationName,
      reason,
    } = formData;
    if (
      firstName &&
      lastName &&
      email &&
      password &&
      confirmPassword &&
      mobileNumber &&
      address &&
      role &&
      ((role === "vendor" && organizationName && reason) || role !== "vendor")
    ) {
      if (password.length > 7) {
        if (password === confirmPassword) {
          if (mobileNumber.length === 10) {
            dispatch(signup(formData, navigate));
          } else {
            toast.error("Mobile number must be of 10 digits!");
          }
        } else {
          toast.error("Passwords are not same!");
        }
      } else {
        toast.error("Password must have atleast 8 characters");
      }
    } else {
      toast.error("Please fill up all the fields");
    }
  };

  return (
    <div className="form-container">
      <center>
        <h1>Sign up</h1>
      </center>
      <Form onSubmit={handleSubmit}>
        <Form.Label
          className="text-center"
          style={{ width: "100%", color: "red" }}
        >
          Fields marked with * are mandatory!{" "}
        </Form.Label>
        <Form.Group className="mb-2" controlId="formFirstName">
          <Form.Label>First Name *</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            name="firstName"
            placeholder="Enter First Name"
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formLastName">
          <Form.Label>Last Name *</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formEmail">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter Email"
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formPassword">
          <Form.Label>Password *</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter Password"
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formConfirmPassword">
          <Form.Label>Confirm Password *</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formMobileNumber">
          <Form.Label>Mobile Number *</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="number"
            name="mobileNumber"
            placeholder="Mobile Number"
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formAddress">
          <Form.Label>Address *</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            name="address"
            placeholder="Address"
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formProfileImage">
          <Form.Label>Profile Image *</Form.Label> &nbsp;
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setFormData({ ...formData, imageBase64: base64 })
            }
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formGender">
          <div className="mb-3">
            <Form.Label>Gender *</Form.Label>
            <Form.Check
              name="gender"
              type="radio"
              id="male"
              label="Male"
              onChange={() => setFormData({ ...formData, gender: "Male" })}
              selected
            />
            <Form.Check
              name="gender"
              type="radio"
              id="female"
              label="Female"
              onChange={() => setFormData({ ...formData, gender: "Female" })}
            />
            <Form.Check
              name="gender"
              type="radio"
              id="other"
              label="Prefer Not to Say"
              onChange={() => setFormData({ ...formData, gender: "Other" })}
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-2" controlId="formRole">
          <div className="mb-3">
            <Form.Label>Sign up as... * </Form.Label>
            <Form.Check
              name="role"
              type="radio"
              id="user"
              label="Normal user"
              onChange={() => setFormData({ ...formData, role: "normaluser" })}
            />
            <Form.Check
              name="role"
              type="radio"
              id="vendor"
              label="Vendor"
              onChange={() => setFormData({ ...formData, role: "vendor" })}
            />
          </div>
        </Form.Group>
        {formData.role === "vendor" ? (
          <Form.Group className="mb-2" controlId="formReason">
            <Form.Label>Reason *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={handleChange}
              type="text"
              name="reason"
              placeholder="Reason"
            />
          </Form.Group>
        ) : null}
        {formData.role === "vendor" ? (
          <Form.Group className="mb-2" controlId="formOrganizationName">
            <Form.Label>Organization Name *</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="organizationName"
              placeholder="Organization Name"
            />
          </Form.Group>
        ) : null}
        <Button variant="primary" type="submit">
          Sign up
        </Button>{" "}
        Or
        <Form.Text>
          <a style={{ cursor: "pointer" }} className="h6" href="/login">
            {" "}
            Already a user?
          </a>
        </Form.Text>
      </Form>
    </div>
  );
};

export default Signup;
