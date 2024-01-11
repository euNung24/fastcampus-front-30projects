import React, { useCallback, useRef } from "react";
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
  onChangeVolume: (volume: number) => void;
  state: MusicPlayerState;
};
const MusicToolbar = ({
  onPlay,
  onPause,
  onChangeVolume,
  state,
}: MusicToolbarProps) => {
  const { playing } = state;
  const soundBarRef = useRef<HTMLDivElement>(null);
  const isMouseDown = useRef(false);

  const setVolumeState = (e: React.MouseEvent<HTMLDivElement>) => {
    if (soundBarRef.current) {
      const ratio = e.nativeEvent.offsetX / e.currentTarget.clientWidth;
      if (ratio > 1 || ratio < 0) return;
      soundBarRef.current.style.width = `${ratio * 100}%`;
      onChangeVolume(ratio);
    }
  };
  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    isMouseDown.current = true;
    setVolumeState(e);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown.current) return;
    setVolumeState(e);
  }, []);

  const onEndSound = useCallback(() => {
    isMouseDown.current = false;
  }, []);

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
        <div
          className="volume-bar"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onEndSound}
          onMouseLeave={onEndSound}
        >
          <div className="bar" ref={soundBarRef}></div>
        </div>
      </div>
    </div>
  );
};

export default MusicToolbar;
