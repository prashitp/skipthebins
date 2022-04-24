// Author: Vivekkumar Patel (B00896765)
import React from "react";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import Step from "@mui/material/Step";
import { useEffect, useState } from "react";
import API from "../../api";
import { toast } from "react-toastify";

const Tracker = (props) => {
  const { row } = props;
  const [status, setStatus] = useState("");
  const URL = "/user/pickups/status";

  //Make API call to fetch status of Pickup on which user clicked.
  const getStatus = async () => {
    try {
      const response = await API.get(URL, {
        params: {
          batchNo: row.batchNo,
        },
      });

      if (response.status === 200 && response.data.success === true) {
        setStatus(response.data.status);
      } else {
        toast.error(response.data.toast);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getStatus();
  });

  const steps = {
    "Waste Pick-up Scheduled": 0,
    "Waste Picked-up": 1,
    "Waste Arrived at Recycling Facility": 2,
    "Waste Recycled": 3,
  };

  return (
    <Stepper alternativeLabel activeStep={steps[status]}>
      {Object.keys(steps).map((stepLabel) => (
        <Step key={stepLabel}>
          <StepLabel>{stepLabel}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default Tracker;
