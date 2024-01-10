import React, { ReactNode } from "react";

interface SortableProps {
  index: number;
  draggable: boolean;
  handleDragStart: (idx: number) => void;
  handleDrop: (idx: number) => void;
  children?: ReactNode;
}

const Sortable = ({
  index,
  draggable,
  handleDragStart,
  handleDrop,
  children,
}: SortableProps) => {
  const onDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    e.currentTarget.classList.add("dragstart");
    handleDragStart(index);
  };
  const onDragEnd = (e: React.DragEvent<HTMLLIElement>) => {
    e.currentTarget.classList.remove("dragstart");
  };

  const onDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const onDragEnter = (e: React.DragEvent<HTMLLIElement>) => {
    e.currentTarget.classList.add("dragover");
  };
  const onDragLeave = (e: React.DragEvent<HTMLLIElement>) => {
    e.currentTarget.classList.remove("dragover");
  };
  const onDrop = (e: React.DragEvent<HTMLLIElement>) => {
    e.currentTarget.classList.remove("dragover");
    handleDrop(index);
  };

  return (
    <li
      className="item"
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {children}
    </li>
  );
};

export default Sortable;
