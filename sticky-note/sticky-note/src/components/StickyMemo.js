import React from "react";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import "./stickyMemo.scss";
import Draggable from "@eunung/draggable";

function StickyMemo() {
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
          defaultValue={"Enter memo here"}
          name="txt"
          placeholder="Enter memo here"
        ></textarea>
      </div>
    </Draggable>
  );
}

export default StickyMemo;
