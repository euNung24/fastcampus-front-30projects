import { atom } from "recoil";

type LectureOption = {
  key: string;
  default: {
    [day: string]: Lecture[];
  };
};

export type Lecture = {
  id: string;
  name: string;
  start: number;
  end: number;
  color: string;
};

const lectureOptions: LectureOption = {
  key: "timetableState",
  default: {
    mon: [] as Lecture[],
    tue: [] as Lecture[],
    wen: [] as Lecture[],
    thu: [] as Lecture[],
    fri: [] as Lecture[],
  },
};

export const initLectureFormState = {
  editDay: "" as Lowercase<string>,
  editId: "",
};

const lectureFormOptions = {
  key: "lectureFormState",
  default: initLectureFormState,
};

export const timetableState = atom(lectureOptions);
export const lectureFormState = atom(lectureFormOptions);
