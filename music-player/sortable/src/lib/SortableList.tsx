import React, { ReactNode, useRef, useState } from "react";
import Sortable from "./Sortable";
import "./sortable.css";
const SortableList = ({
  renderItemContent,
  list,
  keyAttr,
  onClick = () => {},
}: {
  renderItemContent: (id: number, item: any) => ReactNode;
  list: any[];
  keyAttr?: string;
  onClick?: (...args: any) => void;
}) => {
  const [itemList, setItemList] = useState(list);
  const startIdxRef = useRef(0);

  const handleDragStart = (idx: number) => {
    startIdxRef.current = idx;
  };

  const handleDrop = (dropIdx: number) => {
    let newList = [...itemList];
    const targetItem = itemList[startIdxRef.current];
    if (dropIdx > startIdxRef.current) {
      newList.splice(dropIdx, 0, targetItem);
      newList.splice(startIdxRef.current, 1);
    } else {
      newList.splice(startIdxRef.current, 1);
      newList.splice(dropIdx, 0, targetItem);
    }
    setItemList(newList);
  };

  return (
    <ul className="sortable-list">
      {itemList.map((v, idx) => (
        <Sortable
          key={keyAttr ? v[keyAttr] : idx}
          draggable={true}
          index={idx}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
          handleClick={(e) => {
            onClick(e, v, { index: idx });
          }}
        >
          {renderItemContent(idx, v)}
        </Sortable>
      ))}
      <Sortable
        draggable={false}
        index={itemList.length}
        handleDragStart={handleDragStart}
        handleDrop={handleDrop}
      />
    </ul>
  );
};

export default SortableList;
