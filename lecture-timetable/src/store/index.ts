import { atom, AtomEffect } from "recoil";

type LectureOption = {
  key: string;
  default: {
    [day: string]: Lecture[];
  };
  effects: any;
};

export type Lecture = {
  id: string;
  name: string;
  start: number;
  end: number;
  color: string;
};

const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
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
  effects: [localStorageEffect<Pick<LectureOption, "default">>("timetable")],
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
