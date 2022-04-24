/**
 *   @author : Vasu Gamdha (B00902737)
 */

import React, { Fragment, useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import PendingCreation from "./PendingCreation";
import PendingDeletion from "./PendingDeletion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Requests = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  /**
   * @description : This checks if the user is authenticated or not
   */
  useEffect(() => {
    if (!user || user?.result?.role !== "admin") {
      toast.error("Please login as admin to continue");
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [localStorage.getItem("profile")]);

  return (
    <div>
      <Tabs
        fill
        justify
        defaultActiveKey="pendingCreation"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="pendingCreation" title="Creation Requests">
          <PendingCreation />
        </Tab>
        <Tab eventKey="pendingDeletion" title="Deletion Requests">
          <PendingDeletion />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Requests;
