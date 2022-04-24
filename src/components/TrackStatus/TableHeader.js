// Author: Vivekkumar Patel (B00896765)
import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const headings = [
  "Pickup ID",
  "Pickup Date",
  "Pickup Area",
  "Pickup Slot",
  "Batch No.",
];
const TableHeader = (props) => {
  return (
    <TableHead>
      <TableRow>
        {headings.map((heading) => (
          <TableCell key={heading} align={props.align}>
            <strong>{heading}</strong>
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
