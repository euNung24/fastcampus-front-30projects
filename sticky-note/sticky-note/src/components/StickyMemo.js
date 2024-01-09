import React, { useCallback, useEffect, useMemo, useRef } from "react";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import "./stickyMemo.scss";
import Draggable from "@eunung/draggable";
import { debounce } from "@mui/material";
import { observer } from "mobx-react-lite";

function StickyNote({
  note,
  onEditNote,
  onResizeNote,
  onChangeNotePos,
  onDeleteNote,
}) {
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

  const onClickDeleteBtn = useCallback(() => {
    onDeleteNote(note.id);
  }, [note.id, onDeleteNote]);

  useEffect(() => {
    let resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(noteRef.current);
    console.log(note.x, note.y);
    return () => {
      onChangeContent.clear();
      onResize.clear();
      resizeObserver.disconnect();
      resizeObserver = null;
    };
  }, [onChangeContent, onResize]);

  return (
    <Draggable x={note.x + 1} y={note.y + 1}>
      <div
        ref={noteRef}
        className="memo-container"
        style={{
          width: `${note.width}px`,
          height: `${note.height}px`,
          // left: `${note.x}px`,
          // top: `${note.y}px`,
        }}
      >
        <Draggable.Handle onDrag={(e) => onDrag(e)}>
          <div className="menu">
            <DragHandleIcon sx={{ cursor: "move", fontSize: "25px" }} />
            <CloseIcon
              sx={{ cursor: "pointer", fontSize: "25px", float: "right" }}
              onClick={onClickDeleteBtn}
            />
          </div>
        </Draggable.Handle>
        <textarea
          className="memo-text-area"
          defaultValue={note.content}
          name="txt"
          placeholder="Enter memo here"
          onChange={onChangeContent}
        ></textarea>
      </div>
    </Draggable>
  );
}

export default observer(StickyNote);
