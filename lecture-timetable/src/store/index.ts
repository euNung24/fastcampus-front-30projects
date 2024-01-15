import { atom } from "recoil";

type Option = {
  key: string;
  default: {
    [day: string]: {
      id: number;
      name: string;
      start: number;
      end: number;
      color: string;
    }[];
  };
};

const options: Option = {
  key: "timetableState",
  default: {
    mon: [
      {
        id: 1,
        name: "React",
        start: 11,
        end: 13,
        color: "#abcdef",
      },
    ],
    tue: [
      {
        id: 2,
        name: "TypeScript",
        start: 12,
        end: 15,
        color: "#fedcba",
      },
    ],
    wen: [
      {
        id: 3,
        name: "JavaScript",
        start: 15,
        end: 19,
        color: "#cdabef",
      },
    ],
    thu: [
      {
        id: 4,
        name: "React-Native",
        start: 9,
        end: 10,
        color: "#cdefab",
      },
    ],
    fri: [
      {
        id: 5,
        name: "Algorithm",
        start: 18,
        end: 20,
        color: "#abefcd",
      },
    ],
  },
};
export const timetableState = atom(options);
