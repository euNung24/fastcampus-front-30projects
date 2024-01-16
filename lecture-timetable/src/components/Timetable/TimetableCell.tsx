import React, { memo, useCallback, useState } from "react";
import { TableCell } from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";
import { lectureFormState, timetableState } from "../../store";
import { TimetableRowProps } from "./TimetableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

interface TimetableCellProps extends TimetableRowProps {
  day: string;
}

const TimetableCell = ({ day, ...props }: TimetableCellProps) => {
  const { time, handleShowModal } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [timetable, setTimetable] = useRecoilState(timetableState);
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
  }, [lecture, setLectureForm, handleShowModal, day]);

  const onOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, [setIsOpenModal]);

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, [setIsOpenModal]);

  const handleDeleteLecture = useCallback(() => {
    setTimetable((prev) => ({
      ...prev,
      [day.toLowerCase()]: prev[day.toLowerCase()].filter(
        (item) => item.id !== lecture?.id,
      ),
    }));
    handleCloseModal();
  }, [setTimetable, day, lecture?.id, handleCloseModal]);

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
              <DeleteIcon onClick={onOpenModal} />
            </div>
          </TableCell>
        ) : null
      ) : (
        <TableCell align="center" />
      )}
      <ConfirmModal
        isOpen={isOpenModal}
        handleCloseModal={handleCloseModal}
        handleDeleteLecture={handleDeleteLecture}
      />
    </>
  );
};

export default memo(TimetableCell);
