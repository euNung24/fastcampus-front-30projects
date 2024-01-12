import React from "react";
import SortableList from "./lib/SortableList";

function Content({ idx, item }: { idx: number; item: any }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100px",
        height: "100px",
        fontSize: "24px",
        fontWeight: "bold",
        color: `rgb(${Math.random() * 255}, ${Math.random() * 255},${
          Math.random() * 255
        })`,
        backgroundColor: "#abcdef",
      }}
    >
      {item.content}
    </div>
  );
}
function App() {
  const test = [
    { content: "1", id: 1 },
    { content: "2", id: 2 },
    { content: "3", id: 3 },
    { content: "4", id: 4 },
    { content: "5", id: 5 },
  ];
  return (
    <SortableList
      list={test}
      onDropItem={(list) => {
        console.log(list);
      }}
      onClick={(...args) => {
        console.log(...args);
      }}
      keyAttr="id"
      renderItemContent={(id, list) => <Content item={list} idx={id} />}
    />
  );
}

export default App;
