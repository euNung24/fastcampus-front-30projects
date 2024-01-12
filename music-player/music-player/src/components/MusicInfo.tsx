import React, { memo } from "react";
import { Music } from "../reducers/MusicPlayerReducer";

type MusicInfoProps = {
  music: Music;
};
const MusicInfo = ({ music }: MusicInfoProps) => {
  const { title, artist, cover } = music;

  return (
    <>
      <img className="cover-image" src={cover} alt={title} />
      <div className="info">
        <span className="title">{title}</span>
        <span>{artist}</span>
      </div>
    </>
  );
};

export default memo(MusicInfo);
