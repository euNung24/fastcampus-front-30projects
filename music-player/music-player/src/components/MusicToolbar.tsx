import React, {
  Dispatch,
  ForwardedRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import {
  changeMode,
  MusicPlayerAction,
  MusicPlayerState,
  playNextMusic,
  playPrevMusic,
} from "../reducers/MusicPlayerReducer";
import PlayMode from "./PlayMode";

type MusicToolbarProps = {
  onPlay: () => void;
  onPause: () => void;
  onResetPlay: () => void;
  onChangeVolume: (volume: number) => void;
  state: MusicPlayerState;
  dispatch: Dispatch<MusicPlayerAction>;
};
const MusicToolbar = (
  {
    onPlay,
    onPause,
    onResetPlay,
    onChangeVolume,
    state,
    dispatch,
  }: MusicToolbarProps,
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
    if (state.mode === "ONE") {
      onResetPlay();
    } else {
      dispatch(playPrevMusic());
    }
  }, [dispatch, state.mode, onResetPlay]);

  const onClickNext = useCallback(() => {
    if (state.mode === "ONE") {
      onResetPlay();
    } else {
      dispatch(playNextMusic());
    }
  }, [dispatch, state.mode, onResetPlay]);

  const onChangeMode = useCallback(() => {
    dispatch(changeMode());
  }, [dispatch]);

  return (
    <div className="music-tool">
      <QueueMusicIcon />
      <PlayMode mode={state.mode} onClick={onChangeMode} />
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
