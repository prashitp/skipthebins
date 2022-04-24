// Author: Vivekkumar Patel (B00896765)
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import "../UpdateStatus/updateStatus.css";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import API from "../../api";

const StatusSelect = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(row.status);
  const [snackbarColor, setSnackbarColor] = useState("red");
  const [snackbarMessage, setSnackbarMessage] = useState(
    "Failed To Update Status!"
  );
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //Update the pickup status.
  const updateStatus = (event) => {
    event.preventDefault();
    const data = {
      _id: row._id,
      status: status,
      batchNo: row.batchNo
    };
    API.put("/vendor/schedules/update", data)
      .then((res) => {
        if (res.data.success) {
          props.update();
          setSnackbarColor("green");
          setSnackbarMessage("Status Updated Successfully!");
          setOpen(true);
        } else {
          setSnackbarColor("red");
          setSnackbarMessage("Failed To Update Status!");
          setOpen(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
      <InputLabel>Status</InputLabel>
      <Select autoWidth label="Status" value={status} onChange={handleChange}>
        <MenuItem key={0} value="Waste Pick-up Scheduled">
          Waste Pick-up Scheduled
        </MenuItem>
        <MenuItem key={1} value="Waste Picked-up">
          Waste Picked-up
        </MenuItem>
        <MenuItem key={2} value="Waste Arrived at Recycling Facility">
          Waste Arrived at Recycling Facility
        </MenuItem>
        <MenuItem key={3} value="Waste Recycled">
          Waste Recycled
        </MenuItem>
      </Select>
      <div className="mt-3">
        <Button
          className="updateButton"
          size="small"
          variant="contained"
          onClick={updateStatus}
        >
          Update
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          autoHideDuration={3000}
          sx={{
            "& .MuiSnackbarContent-root": { backgroundColor: snackbarColor },
          }}
          onClose={handleClose}
          message={snackbarMessage}
        />
      </div>
    </FormControl>
  );
};
export default StatusSelect;
