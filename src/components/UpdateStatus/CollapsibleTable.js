// Author: Vivekkumar Patel (B00896765)
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHeader from "./TableHeader";
import Row from "./Row";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api";

const CollapsibleTable = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  //If user is not logged in then redirect him to login page.
  useEffect(() => {
    if (!user || user?.result?.role !== "vendor") {
      toast.error("Please login as vendor to continue");
      navigate("/login");
    } else{
      getSchedules();
    }
  }, [user, navigate]);

  //Get details of currently logged in user from the local storage.
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [localStorage.getItem("profile")]);

  const [scheduleData, setScheduleData] = useState([]);
  const [message, setMessage] = useState("");

  //Fetch past pickup batch from of the currently logged in user by making API call.
  const getSchedules = async () => {
    try {
      const response = await API.get("/vendor/schedules", {
        params: {
          vendorId: user?.result?._id,
        },
      });

      if (response.status === 200 && response.data.success === true) {
        setMessage("Loading...");
        setScheduleData(response.data.schedules);
      } else {
        setScheduleData([]);
        setMessage("You currently do not have any registered pickups.");
        toast.error(response.data.toast);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };

  // useEffect(() => {
  //   getSchedules();
  // }, []);

  const updateStatus = () => {
    getSchedules();
  };

  return (
    <div>
      {scheduleData.length === 0 || !scheduleData ? (
        <div className="text-center">
          <strong>{message}</strong>
        </div>
      ) : (
        <Table aria-label="collapsible table" className="table">
          <TableHeader align="left" />
          <TableBody>
            {scheduleData.map((row) => (
              <Row update={updateStatus} key={row.scheduleId} row={row} />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CollapsibleTable;
