import React from "react";
import { TableCell } from "@mui/material";
import { useRecoilState } from "recoil";
import { timetableState } from "../../store";
import { TimetableRowProps } from "./TimetableRow";

interface TimetableCellProps extends TimetableRowProps {
  day: string;
}

const TimetableCell = ({ day, ...props }: TimetableCellProps) => {
  const { time } = props;
  const [timetable, setTimetable] = useRecoilState(timetableState);
  const lecture = timetable[day.toLowerCase()]?.find(
    (lecture) => lecture.start <= time && lecture.end > time,
  );

  return (
    <>
      {lecture ? (
        lecture.start === time ? (
          <TableCell
            align="center"
            sx={{ backgroundColor: lecture.color }}
            rowSpan={lecture.end - lecture.start}
          >
            {lecture.name}
          </TableCell>
        ) : null
      ) : (
        <TableCell align="center" />
      )}
    </>
  );
};

export default TimetableCell;
