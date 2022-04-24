// Author: Vivekkumar Patel (B00896765)
import React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import StatusSelect from "./StatusSelect";
import "../UpdateStatus/updateStatus.css";

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left">{row.batchNo}</TableCell>
        <TableCell align="left">{row.date}</TableCell>
        <TableCell align="left">{row.area}</TableCell>
        <TableCell align="left">{row.slot}</TableCell>
        <TableCell align="left">{row.status}</TableCell>
        <TableCell>
          <Button
            className="updateButton"
            size="small"
            onClick={() => setOpen(!open)}
            variant="contained"
          >
            Update Status
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              {/* Component */}
              <div className="text-center">
                <StatusSelect update={props.update} row={row} />
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Row;
