import React, { useCallback } from "react";
import { TableCell } from "@mui/material";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { lectureFormState, timetableState } from "../../store";
import { TimetableRowProps } from "./TimetableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface TimetableCellProps extends TimetableRowProps {
  day: string;
}

const TimetableCell = ({ day, ...props }: TimetableCellProps) => {
  const { time, handleShowModal } = props;
  const timetable = useRecoilValue(timetableState);
  const setLectureForm = useSetRecoilState(lectureFormState);
  const lecture = timetable[day.toLowerCase()]?.find(
    (lecture) => lecture.start <= time && lecture.end > time,
  );

  const onClickEdit = useCallback(() => {
    if (!lecture) return;
    handleShowModal();
    setLectureForm({
      editId: lecture.id,
      editDay: day.toLowerCase() as Lowercase<string>,
    });
  }, [lecture, setLectureForm]);

  return (
    <>
      {lecture ? (
        lecture.start === time ? (
          <TableCell
            align="center"
            sx={{
              backgroundColor: lecture.color,
              position: "relative",
              "& .lectureBtn": {
                display: "none",
                position: "absolute",
                top: "8px",
                right: "8px",
                cursor: "pointer",
              },
              "&:hover .lectureBtn": {
                display: "block",
              },
            }}
            rowSpan={lecture.end - lecture.start}
          >
            {lecture.name}
            <div className="lectureBtn">
              <EditIcon onClick={onClickEdit} />
              <DeleteIcon />
            </div>
          </TableCell>
        ) : null
      ) : (
        <TableCell align="center" />
      )}
    </>
  );
};

export default TimetableCell;
