import Draggable from "./lib/Draggable";

function App() {
  return (
    <Draggable>
      <Draggable.Handle
        onDrag={(e) => {
          console.log(e.clientX, e.clientY);
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            background: "#aaf",
          }}
        ></div>
      </Draggable.Handle>
      <div
        style={{
          width: "100px",
          height: "100px",
          background: "#33a",
        }}
      ></div>
    </Draggable>
  );
}

export default App;
