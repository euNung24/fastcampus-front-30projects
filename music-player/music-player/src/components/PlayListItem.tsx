import React, { useEffect, useState } from "react";
import { Music } from "../reducers/MusicPlayerReducer";

type PlayListItemProps = {
  id: number;
  item: Music;
  music: Music;
};

const getMusicDuration = (musicSrc: string): Promise<string> => {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.src = musicSrc;
    audio.onloadedmetadata = () => {
      const minute = Math.trunc(audio.duration / 60);
      const second = Math.trunc(audio.duration % 60);
      resolve(
        `${minute.toString().padStart(2, "0")}:${second
          .toString()
          .padStart(2, "0")}`,
      );
    };
  });
};
const PlayListItem = ({ id, item, music }: PlayListItemProps) => {
  const [duration, setDuration] = useState("00:00");

  useEffect(() => {
    getMusicDuration(item.src).then((durationTime) => {
      setDuration(durationTime);
    });
    return () => {};
  }, [item.src]);

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
      <time>{duration}</time>
    </div>
  );
};

export default PlayListItem;
