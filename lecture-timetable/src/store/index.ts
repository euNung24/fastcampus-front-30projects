import { atom } from "recoil";

const timetableState = atom({
  key: "timetableState",
  default: {
    mon: [],
    tue: [],
    wen: [],
    thr: [],
    fri: [],
  },
});
