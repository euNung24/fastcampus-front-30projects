import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from "@mui/material";
import { dayList, timeList } from "../../variables";
import TimetableRow from "./TimetableRow";

const Timetable = () => {
  return (
    <TableContainer
      sx={{
        "& th,td": {
          border: "1px solid rgba(224, 224, 224, 1)",
        },
        width: "80%",
        minWidth: "650px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "20px",
      }}
    >
      <Typography align="center" variant="h2" fontWeight={10}>
        강의시간표
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" width={100} sx={{ fontWeight: "bold" }}>
              Time
            </TableCell>
            {dayList.map((day, i) => (
              <TableCell
                key={day}
                align="center"
                width={200}
                sx={{ fontWeight: "bold" }}
              >
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {timeList.map((time, i) => (
            <TableRow key={time}>
              <TableCell align="center">{time}:00</TableCell>
              <TimetableRow />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Timetable;
