import React from "react";
interface CursorButtonProps {
  selected?: boolean;
  name: string;
  onClick: () => void;
}
function CursorButton({ selected = false, name, onClick }: CursorButtonProps) {
  return (
    <button
      style={{
        width: "100px",
        height: "100px",
        padding: "8px",
        border: "none",
        boxShadow: `0 0 0 ${selected ? 6 : 1}px #000 inset`,
        background: "none",
        boxSizing: "border-box",
        cursor: "none",
      }}
      onClick={onClick}
    >
      <img
        style={{
          width: "100%",
          height: "100%",
        }}
        src={`/images/cursors/${name}.png`}
        alt={name}
      />
    </button>
  );
}

export default CursorButton;
