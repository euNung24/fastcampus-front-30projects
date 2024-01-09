import React, { useCallback, useEffect, useMemo, useRef } from "react";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import "./stickyMemo.scss";
import Draggable from "@eunung/draggable";
import { debounce } from "@mui/material";

function StickyNote({ note, onEditNote, onResizeNote, onChangeNotePos }) {
  const noteRef = useRef(null);
  const onChangeContent = useMemo(
    () => debounce((e) => onEditNote(note.id, e.target.value), 300),
    [note.id, onEditNote],
  );
  const onResize = useMemo(
    () =>
      debounce((entries) => {
        const { width, height } = entries?.[0].contentRect;
        onResizeNote(note.id, [width, height]);
      }, 300),
    [note.id, onResizeNote],
  );

  const onDrag = useCallback(
    (e) => {
      const { left, top } = e.target.getBoundingClientRect();
      onChangeNotePos(note.id, [left, top]);
    },
    [note.id, onChangeNotePos],
  );

  useEffect(() => {
    let resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(noteRef.current);

    return () => {
      resizeObserver.disconnect();
      resizeObserver = null;
    };
  });

  return (
    <Draggable>
      <div
        ref={noteRef}
        className="memo-container"
        style={{ width: `${note.width}px`, height: `${note.height}px` }}
      >
        <Draggable.Handle onDrag={(e) => onDrag(e)}>
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
