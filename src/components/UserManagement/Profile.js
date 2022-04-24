/**
 *   @author : Vasu Gamdha (B00902737)
 */

import React, { useEffect, useState } from "react";
import Requests from "./Requests";

import { useSelector } from "react-redux";
import UserProfile from "./UserProfile";
import VendorProfile from "./VendorProfile";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();

  /**
   * @description : This checks if the user is authenticated or not
   */
  useEffect(() => {
    if (user?.result?.role === "admin") {
      navigate("/requests");
    }
  }, []);

  if (user?.result?.role === "vendor") {
    return <VendorProfile />;
  } else {
    return <UserProfile />;
  }
};

export default Profile;
