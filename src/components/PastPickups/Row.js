// Author: Vivekkumar Patel (B00896765)
import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import "../TrackStatus/trackStatus.css";

const Row = (props) => {
  const { row } = props;

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left">{row.pickupId}</TableCell>
        <TableCell align="left">{row.date}</TableCell>
        <TableCell align="left">{row.area}</TableCell>
        <TableCell align="left">{row.slot}</TableCell>
        <TableCell align="left">{row.batchNo}</TableCell>
        <TableCell align="left">{row.wasteQty} KG</TableCell>
        <TableCell align="left">{row.points} Points</TableCell>
        <TableCell align="left">{row.vendor}</TableCell>
        <TableCell align="left">{row.boxQty} </TableCell>
        <TableCell align="left">{row.address}</TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Row;
