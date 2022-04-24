/**
 *   @author : Vasu Gamdha (B00902737)
 */

import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/actions/auth";
import { toast } from "react-toastify";
const initialState = { email: "", password: "" };

const Login = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  /**
   * @description : This checks if the user is authenticated or not
   */
  useEffect(() => {
    if (user) {
      if (user?.result?.role === "admin") {
        navigate("/requests");
      } else {
        navigate("/profile");
      }
    }
  }, []);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (email && password) {
      dispatch(login(formData, navigate));
    } else {
      toast.error("Please fill up all the fields");
    }
  };

  return (
    <div className="form-container">
      <center>
        <h1>Login</h1>
      </center>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={handleChange("email")}
            type="email"
            placeholder="Enter Email"
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleChange("password")}
            type="password"
            placeholder="Enter Password"
          />
        </Form.Group>
        <Button className="d-block mx-auto" variant="primary" type="submit">
          Login
        </Button>
        <Form.Group>
          <Form.Text>
            <a style={{ cursor: "pointer" }} className="h6" href="/signup">
              New user?
            </a>
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
