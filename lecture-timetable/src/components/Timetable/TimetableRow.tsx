import React, { memo } from "react";
import { dayList } from "../../variables";
import TimetableCell from "./TimetableCell";

export interface TimetableRowProps {
  time: number;
  handleShowModal: () => void;
}
const TimetableRow = (props: TimetableRowProps) => {
  return (
    <>
      {dayList.map((day) => (
        <TimetableCell key={day} day={day} {...props} />
      ))}
    </>
  );
};

export default memo(TimetableRow);
