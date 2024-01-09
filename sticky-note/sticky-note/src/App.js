import React, { useCallback } from "react";
import { observer } from "mobx-react-lite";
import "./App.css";
import StickyMemo from "./components/StickyMemo";
import AddIcon from "@mui/icons-material/Add";

function App({ store }) {
  const AddNote = useCallback(() => store.addNote(), [store]);
  return (
    <>
      {store.notes.map((note) => (
        <StickyMemo key={note} />
      ))}
      <AddIcon
        sx={{
          float: "right",
          backgroundColor: "#e4e4e4",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "30px",
          border: "1px solid black",
        }}
        onClick={AddNote}
      />
    </>
  );
}

export default observer(App);
