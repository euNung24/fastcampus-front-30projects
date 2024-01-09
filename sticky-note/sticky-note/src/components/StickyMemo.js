import React, { useMemo } from "react";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import "./stickyMemo.scss";
import Draggable from "@eunung/draggable";
import { debounce } from "@mui/material";

function StickyNote({ note, onEditNote }) {
  const onChangeContent = useMemo(
    () => debounce((e) => onEditNote(note.id, e.target.value), 300),
    [note.id, onEditNote],
  );
  return (
    <Draggable>
      <div
        className="memo-container"
        style={{ width: `${250}px`, height: `${300}px` }}
      >
        <Draggable.Handle>
          <div className="menu">
            <DragHandleIcon sx={{ cursor: "move", fontSize: "25px" }} />
            <CloseIcon
              sx={{ cursor: "pointer", fontSize: "25px", float: "right" }}
            />
          </div>
        </Draggable.Handle>
        <textarea
          className="memo-text-area"
          defaultValue=""
          name="txt"
          placeholder="Enter memo here"
          onChange={onChangeContent}
        ></textarea>
      </div>
    </Draggable>
  );
}

export default StickyNote;
