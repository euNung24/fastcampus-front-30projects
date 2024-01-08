import React, { useEffect, useState } from "react";
import "./App.css";
import CursorButton from "./components/CursorButton";

type Cursor =
  | "cursor_blue"
  | "cursor_dots"
  | "cursor_overlapped"
  | "cursor_purple";

const cursors: Cursor[] = [
  "cursor_blue",
  "cursor_dots",
  "cursor_overlapped",
  "cursor_purple",
];

const genCalibratedMousePosition = (
  cursor: Cursor,
  [posX, posY]: [number, number],
): [number, number] => {
  switch (cursor) {
    case "cursor_blue":
      posX -= 5;
      break;
    case "cursor_dots":
      posX -= 5;
      break;
    case "cursor_overlapped":
      posX -= 4;
      posY -= 4;
      break;
    case "cursor_purple":
      posX -= 3;
      posY -= 4;
      break;
  }
  return [posX, posY];
};

function App() {
  const [currentCursor, setCurrentCursor] = useState<Cursor>(cursors[0]);
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);
  const [calibratedMousePosition, setCalibratedMousePosition] = useState<
    [number, number]
  >([0, 0]);

  const onClickCursor = (cursor: Cursor) => {
    setCurrentCursor(cursor);
    setCalibratedMousePosition(
      genCalibratedMousePosition(cursor, [...mousePosition]),
    );
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setMousePosition([e.clientX, e.clientY]);
      setCalibratedMousePosition(
        genCalibratedMousePosition(currentCursor, [e.clientX, e.clientY]),
      );
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [currentCursor]);
  return (
    <section>
      <img
        style={{
          position: "fixed",
          left: calibratedMousePosition[0],
          top: calibratedMousePosition[1],
          pointerEvents: "none",
          width: "20px",
        }}
        src={`/images/cursors/${currentCursor}.png`}
        alt="cursor"
      />
      <p>버튼을 눌러서 마우스 커서를 바꿔보세요.</p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "16px",
          gap: "24px",
        }}
      >
        {cursors.map((cursor) => (
          <CursorButton
            key={cursor}
            onClick={() => onClickCursor(cursor)}
            selected={cursor === currentCursor}
            name={cursor}
          />
        ))}
      </div>
    </section>
  );
}

export default App;
