import React from "react";
import { dayList } from "../../variables";
import TimetableCell from "./TimetableCell";

export interface TimetableRowProps {
  time: number;
}
const TimetableRow = (props: TimetableRowProps) => {
  // console.log(props);
  return (
    <>
      {dayList.map((day) => (
        <TimetableCell key={day} day={day} {...props} />
      ))}
    </>
  );
};

export default TimetableRow;
