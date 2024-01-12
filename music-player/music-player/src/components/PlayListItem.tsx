import React from "react";
import { Music } from "../reducers/MusicPlayerReducer";

type PlayListItemProps = {
  id: number;
  item: Music;
  music: Music;
};
const PlayListItem = ({ id, item, music }: PlayListItemProps) => {
  return (
    <div
      className={`music-info ${
        music.artist + music.title === item.artist + item.title ? "active" : ""
      }`}
    >
      <div className="music">
        <span className="title">{item.title}</span>
        <span className="artist">Artist{item.artist}</span>
      </div>
      <time>00:00</time>
    </div>
  );
};

export default PlayListItem;
