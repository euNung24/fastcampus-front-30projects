import { atom } from "recoil";

type Option = {
  key: string;
  default: {
    [day: string]: Lecture[];
  };
};

export type Lecture = {
  id: number;
  name: string;
  start: number;
  end: number;
  color: string;
};

const options: Option = {
  key: "timetableState",
  default: {
    mon: [] as Lecture[],
    tue: [] as Lecture[],
    wen: [] as Lecture[],
    thu: [] as Lecture[],
    fri: [] as Lecture[],
  },
};
export const timetableState = atom(options);
