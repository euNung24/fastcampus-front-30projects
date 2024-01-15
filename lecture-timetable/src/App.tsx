import React from "react";
import Timetable from "./components/Timetable/Timetable";
import { RecoilRoot } from "recoil";
function App() {
  return (
    <RecoilRoot>
      <Timetable />
    </RecoilRoot>
  );
}

export default App;
