import React, { useCallback, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { dayList, timeList } from "../../variables";
import TimetableRow from "./TimetableRow";
import { Add } from "@mui/icons-material";
import InputModal from "../InputModal/InputModal";

const Timetable = () => {
  const [showModal, setShowModal] = useState(false);

  const onClickAddBtn = useCallback(() => {
    setShowModal(true);
  }, []);

  return (
    <>
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
        <Button
          sx={{ margin: "8px 0", float: "right", backgroundColor: "#934cff" }}
          variant="contained"
          endIcon={<Add />}
          onClick={onClickAddBtn}
        >
          강의 입력
        </Button>
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
            {timeList.map((time) => (
              <TableRow key={time}>
                <TableCell align="center">{time}:00</TableCell>
                <TimetableRow time={time} handleShowModal={onClickAddBtn} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <InputModal
        isOpen={showModal}
        handleCloseModal={() => setShowModal(false)}
      />
    </>
  );
};

export default Timetable;
