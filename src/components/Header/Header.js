// @author : Aabhaas Jain, Vasu Gamdha (Group 14)

import React, { useEffect, useState, useRef } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import skipTheBins from "../../assets/skipTheBins.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import ViewNotification from "../Notification/ViewNotifications";
import API from "../../api";
import { toast } from "react-toastify";
import Profile from "../UserManagement/Profile";
import { NestCamWiredStandTwoTone } from "@mui/icons-material";

function Header() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    if (
      ["/", "/login", "/signup", "/faq", "/contactus"].indexOf(
        location?.pathname
      ) !== -1
    ) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  }, [location]);

  const logoutClick = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
    setUser(null);
  };

  const notificationClick = () => {
    let show = showNotification;
    setShowNotification(!show);
  };
  const initialMount = useRef(true);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
    if (user?.result?.role == "normaluser") {
      if (initialMount.current) {
      getNotifications();
      initialMount.current = false;
      }
    }
  }, [localStorage.getItem("profile")]);

  const getNotifications = () => {
    let id = user?.result?._id;
    API.get("/notification/" + id)
      .then((res) => {
        let today = new Date();
        let validNotification = res.data.data.filter((_) => {
          return (
            Math.ceil(
              (today - new Date(_.timeStamp)) / (1000 * 60 * 60 * 24)
            ) <= 3
          );
        });
        setNotifications(validNotification);
        setNotificationCount(validNotification.length);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Some error occured");
      });
  };

  return (
    <Navbar
      className="shadow-lg p-2 mb-3 bg-white"
      collapseOnSelect
      expand="md"
      bg="light"
      variant="light"
      sticky="top"
      id="navbar"
    >
      <div className="container-fluid">
        <Navbar.Brand href="/">
          <img src={skipTheBins} alt="Skip The Bins" className="logo-size" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {/* <Navbar.Collapse id="colapse-nav" className="justify-content-start">
                    <Nav>
                        
                    </Nav>
                </Navbar.Collapse> */}
        <Navbar.Collapse id="colapse-nav" className="justify-content-end">
          {user?.result?.role === "normaluser" && (
            <Nav.Link>
              <span className="notificationIcon" onClick={notificationClick}>
                <FontAwesomeIcon icon={faBell} />
                {notificationCount > 0 && (
                  <span className="notification-badge">
                    {notificationCount}
                  </span>
                )}
              </span>
              {showNotification && (
                <ViewNotification newNotifications={notifications} />
              )}
            </Nav.Link>
          )}
          <Nav>
            {(user?.result?.role === "admin" ||
              user?.result?.role === "vendor") && (
              <Nav.Link href="/announcements">Announcements</Nav.Link>
            )}
            {user?.result?.role === "admin" && (
              <Nav.Link href="/faq-admin">Edit FAQ</Nav.Link>
            )}
            {user?.result?.role === "vendor" && (
              <Nav.Link href="/faq-vendor">FAQs</Nav.Link>
            )}
            {user?.result?.role === "admin" && (
              <Nav.Link href="/requests">Pending Requests</Nav.Link>
            )}
            {user?.result?.role === "normaluser" && (
              <Nav.Link href="/user/pickups">Pickups</Nav.Link>
            )}
            {user?.result?.role === "vendor" && (
              <Nav.Link href="/vendor/pickups">Pickups</Nav.Link>
            )}
            {user?.result?.role === "normaluser" && (
              <Nav.Link href="/user/rewards">Rewards</Nav.Link>
            )}
            {user?.result?.role === "admin" && (
              <Nav.Link href="/rewardstore/viewvouchers">Reward Store</Nav.Link>
            )}
            {user?.result?.role === "admin" && (
              <Nav.Link href="/admin/rewards">Rewards</Nav.Link>
            )}
            {user?.result?.role === "admin" && (
              <>
                <Nav.Link href="/contactus/viewqueries">Contact Us</Nav.Link>
                <Nav.Link href="/event-dashboard">Events</Nav.Link>
                <NavDropdown align={{ lg: "end" }} title="Analytics">
                  <NavDropdown.Item href="/user-dashboard">
                    User Analytics
                  </NavDropdown.Item>
                  <NavDropdown.Item href="vendor-dashboard">
                    Vendor Analytics
                  </NavDropdown.Item>
                  <NavDropdown.Item href="reward-dashboard">
                    Reward Analytics
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}

            {!user && <Nav.Link href="/login">Login</Nav.Link>}
            {!user && <Nav.Link href="/signup">Signup</Nav.Link>}
            {user && (
              <NavDropdown
                align={{ lg: "end" }}
                title="Profile"
                id="basic-nav-dropdown"
              >
                {user?.result?.role !== "admin" && (
                  <NavDropdown.Item href="/profile">
                    View Profile
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Item onClick={logoutClick}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Header;
