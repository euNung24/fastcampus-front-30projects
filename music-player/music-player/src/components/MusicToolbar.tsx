import React from "react";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import RepeatIcon from "@mui/icons-material/Repeat";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { MusicPlayerState } from "../reducers/MusicPlayerReducer";

type MusicToolbarProps = {
  onPlay: () => void;
  onPause: () => void;
  state: MusicPlayerState;
};
const MusicToolbar = ({ onPlay, onPause, state }: MusicToolbarProps) => {
  const { playing } = state;
  return (
    <div className="music-tool">
      <QueueMusicIcon />
      <RepeatIcon />
      <SkipPreviousIcon />
      {playing ? (
        <PauseIcon onClick={onPause} />
      ) : (
        <PlayArrowIcon onClick={onPlay} />
      )}
      <SkipNextIcon />
      <div className="volume-box">
        <VolumeUpIcon />
        <div className="volume-bar">
          <div className="bar"></div>
        </div>
      </div>
    </div>
  );
};

export default MusicToolbar;
