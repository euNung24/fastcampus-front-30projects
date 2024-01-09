import React, { useCallback } from "react";
import { observer } from "mobx-react-lite";
import "./App.css";
import StickyMemo from "./components/StickyMemo";
import AddIcon from "@mui/icons-material/Add";
function App({ store }) {
  const onAddNote = useCallback(() => store.addNote(), [store]);
  const onEditNote = useCallback(
    (id, content) => store.editNote(id, content),
    [store],
  );
  return (
    <>
      {store.notes.map((note) => (
        <StickyMemo key={note} note={note} onEditNote={onEditNote} />
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
        onClick={onAddNote}
      />
    </>
  );
}

export default observer(App);
