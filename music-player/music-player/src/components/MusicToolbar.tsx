import React, {
  Dispatch,
  ForwardedRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import RepeatIcon from "@mui/icons-material/Repeat";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import {
  MusicPlayerState,
  playNextMusic,
  playPrevMusic,
} from "../reducers/MusicPlayerReducer";

type MusicToolbarProps = {
  onPlay: () => void;
  onPause: () => void;
  onChangeVolume: (volume: number) => void;
  state: MusicPlayerState;
  dispatch: Dispatch<any>;
};
const MusicToolbar = (
  { onPlay, onPause, onChangeVolume, state, dispatch }: MusicToolbarProps,
  ref: ForwardedRef<any>,
) => {
  const { playing } = state;
  const soundBarRef = useRef<HTMLDivElement>(null);
  const isMouseDown = useRef(false);
  useImperativeHandle(ref, () => soundBarRef.current, []);

  const setVolumeState = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (soundBarRef.current) {
        const ratio = e.nativeEvent.offsetX / e.currentTarget.clientWidth;
        if (ratio > 1 || ratio < 0) return;
        soundBarRef.current.style.width = `${ratio * 100}%`;
        onChangeVolume(ratio);
      }
    },
    [onChangeVolume],
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      isMouseDown.current = true;
      setVolumeState(e);
    },
    [setVolumeState],
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isMouseDown.current) return;
      setVolumeState(e);
    },
    [setVolumeState],
  );

  const onEndSound = useCallback(() => {
    isMouseDown.current = false;
  }, []);

  const onClickPrev = useCallback(() => {
    dispatch(playPrevMusic());
  }, [dispatch]);

  const onClickNext = useCallback(() => {
    dispatch(playNextMusic());
  }, [dispatch]);

  return (
    <div className="music-tool">
      <QueueMusicIcon />
      <RepeatIcon />
      <SkipPreviousIcon onClick={onClickPrev} />
      {playing ? (
        <PauseIcon onClick={onPause} />
      ) : (
        <PlayArrowIcon onClick={onPlay} />
      )}
      <SkipNextIcon onClick={onClickNext} />
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

export default forwardRef(MusicToolbar);
