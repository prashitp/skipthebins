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
    if (!user || user?.result?.role !== "normaluser") {
      toast.error("Please login to continue");
      navigate("/login");
    } else {
      getPickups();
    }
  }, [user, navigate]);

  //Get details of currently logged in user from the local storage.
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [localStorage.getItem("profile")]);

  const [pickupData, setPickupData] = useState([]);
  const [message, setMessage] = useState("");
  
  //Fetch past pickups from of the currently logged in user by making API call.
  const getPickups = async () => {
    try {
      const response = await API.get("/user/pickups", {
        params: {
          userId: user?.result?._id,
        },
      });
      if (response.status === 200 && response.data.success === true) {
        setMessage("Loading...");
        setPickupData(response.data.pickups);
      } else {
        setPickupData([]);
        setMessage("You currently do not have any scheduled pickups.");
        toast.error(response.data.toast);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };

  // useEffect(() => {
  //   getPickups();
  // }, []);

  return (
    <div>
      {pickupData.length === 0 || !pickupData ? (
        <div className="text-center">
          <strong>{message}</strong>
        </div>
      ) : (
        <Table aria-label="collapsible table" className="table">
          <TableHeader align="left" />
          <TableBody>
            {pickupData.map((row) => (
              <Row key={row.pickupId} row={row} />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CollapsibleTable;
