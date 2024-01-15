import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { dayList } from "../../variables";

type TimetableRowProps = {};

const TimetableRow = ({}: TimetableRowProps) => {
  return (
    <>
      {dayList.map((day) => (
        <TableCell key={day} align="center"></TableCell>
      ))}
    </>
  );
};

export default TimetableRow;
