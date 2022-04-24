/**
 *   @author : Vasu Gamdha (B00902737)
 */

import React, { useEffect, useState } from "react";
import {
  Card,
  Modal,
  Form,
  Button,
  Container,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  editProfile,
  changePassword,
  deleteProfile,
} from "../../store/actions/auth";
import { requestVendorDeletion } from "../../store/actions/vendor";

import FileBase from "react-file-base64";
import { toast } from "react-toastify";

const Settings = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [editProfileShow, setEditProfileShow] = useState(false);
  const [changePasswordShow, setChangePasswordShow] = useState(false);
  const [deleteAccountShow, setDeleteAccountShow] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * @description : This checks if the user is authenticated or not
   */
  useEffect(() => {
    if (!user) {
      toast.error("Please login to continue");
      navigate("/login");
    }
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    imageBase64: "",
    address: "",
    mobileNumber: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    if (user?.result) {
      const { firstName, lastName, email, imageBase64, address, mobileNumber } =
        user?.result;
      setFormData({
        firstName,
        lastName,
        email,
        imageBase64,
        address,
        mobileNumber,
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onEditSaveClick = () => {
    dispatch(editProfile(user?.result?._id, formData));
    setEditProfileShow(false);
  };

  const changePasswordClicked = () => {
    if (
      formData.newPassword === formData.confirmNewPassword &&
      formData.newPassword &&
      formData.confirmNewPassword
    ) {
      if (formData.newPassword.length > 7) {
        dispatch(changePassword(user?.result?._id, formData));
        setChangePasswordShow(false);
      } else {
        toast.error("Password must have atleast 8 characters");
      }
    } else {
      toast.error(
        "Either New Password and Confirm Password doesn't match or the password fields are empty."
      );
    }
  };

  const deleteClicked = () => {
    if (formData.passwordToDelete) {
      if (user?.result?.role === "vendor") {
        dispatch(requestVendorDeletion(user?.result?._id));
      } else {
        dispatch(deleteProfile(user?.result?._id, formData, navigate));
      }
      setDeleteAccountShow(false);
    } else {
      toast.error("Enter password");
    }
  };

  return (
    <div className=" ml-5 settings-container">
      <h1>Settings</h1>
      <Modal
        show={editProfileShow}
        onHide={() => setEditProfileShow(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col sm={2}>
                <Form.Text>First Name:</Form.Text>
              </Col>
              <Col className="mb-2">
                <FormControl
                  value={formData.firstName}
                  name="firstName"
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={2}>
                <Form.Text>Last Name:</Form.Text>
              </Col>
              <Col className="mb-2">
                <FormControl
                  value={formData.lastName}
                  name="lastName"
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={2}>
                <Form.Text>Email:</Form.Text>
              </Col>
              <Col className="mb-2">
                <FormControl
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={2}>
                <Form.Text>Address:</Form.Text>
              </Col>
              <Col className="mb-2">
                <FormControl
                  value={formData.address}
                  name="address"
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={2}>
                <Form.Text>Contact:</Form.Text>
              </Col>
              <Col className="mb-2">
                <FormControl
                  value={formData.mobileNumber}
                  name="mobileNumber"
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={2}>
                <Form.Text>Profile Image:</Form.Text>
              </Col>
              <Col className="mb-2">
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setFormData({ ...formData, imageBase64: base64 })
                  }
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditProfileShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={onEditSaveClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <a style={{ cursor: "pointer" }} onClick={() => setEditProfileShow(true)}>
        <Card className="mr-5 mb-2 mt-2">
          <Card.Body>
            <Card.Title>Edit Profile</Card.Title>
            <Card.Text>
              Users can update any information related to their profile.
            </Card.Text>
          </Card.Body>
        </Card>
      </a>

      <Modal
        show={changePasswordShow}
        onHide={() => setChangePasswordShow(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Set New Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col sm={4}>
                <Form.Text>Current Password:</Form.Text>
              </Col>
              <Col className="mb-2">
                <FormControl
                  type="password"
                  name="currentPassword"
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <Form.Text>New Password:</Form.Text>
              </Col>
              <Col className="mb-2">
                <FormControl
                  type="password"
                  name="newPassword"
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <Form.Text>Confirm new Password:</Form.Text>
              </Col>
              <Col className="mb-2">
                <FormControl
                  type="password"
                  name="confirmNewPassword"
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setChangePasswordShow(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={changePasswordClicked}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <a
        style={{ cursor: "pointer" }}
        onClick={() => setChangePasswordShow(true)}
      >
        <Card className="mr-5 mb-2 mt-2">
          <Card.Body>
            <Card.Title>Change Password</Card.Title>
            <Card.Text>Users can update their password.</Card.Text>
          </Card.Body>
        </Card>
      </a>

      {user?.result?.role !== "admin" && (
        <>
          <Modal
            show={deleteAccountShow}
            onHide={() => setDeleteAccountShow(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  <Col sm={5}>
                    <Form.Text>Enter Password to confirm:</Form.Text>
                  </Col>
                  <Col className="mb-2">
                    <FormControl
                      type="password"
                      name="passwordToDelete"
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setDeleteAccountShow(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={deleteClicked}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
          <a
            style={{ cursor: "pointer" }}
            onClick={() => setDeleteAccountShow(true)}
          >
            <Card className="mr-5 mb-2 mt-2">
              <Card.Body>
                <Card.Title>Delete Profile</Card.Title>
                <Card.Text>
                  Users can completely delete their profile.
                </Card.Text>
              </Card.Body>
            </Card>
          </a>
        </>
      )}
    </div>
  );
};

export default Settings;
