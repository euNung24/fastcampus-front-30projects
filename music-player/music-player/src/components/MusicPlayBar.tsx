import React, {
  Dispatch,
  ForwardedRef,
  forwardRef,
  memo,
  SyntheticEvent,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  ModeType,
  Music,
  MusicPlayerAction,
  pauseMusic,
  playMusic,
  playNextMusic,
} from "../reducers/MusicPlayerReducer";

type MusicPlayBarProps = {
  music: Music;
  mode: ModeType;
  playing: boolean;
  dispatch: Dispatch<MusicPlayerAction>;
  onSetVolume: () => void;
};

const covertSecToMinSec = (sec: number) => {
  const minute = Math.trunc(sec / 60);
  const second = Math.trunc(sec % 60);
  return `${minute.toString().padStart(2, "0")}:${second
    .toString()
    .padStart(2, "0")}`;
};

const MusicPlayBar = (
  { music, mode, playing, dispatch, onSetVolume }: MusicPlayBarProps,
  ref: ForwardedRef<HTMLAudioElement>,
) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("00:00");

  useImperativeHandle(ref, () => audioRef.current!, []);

  const onPlay = useCallback(() => {
    dispatch(playMusic());
  }, [dispatch]);

  const onPause = useCallback(() => {
    dispatch(pauseMusic());
  }, [dispatch]);

  const onTimeUpdate = useCallback((e: SyntheticEvent<HTMLAudioElement>) => {
    if (e.currentTarget.readyState === 0) return;
    const currentTime = e.currentTarget.currentTime;
    setCurrentTime(covertSecToMinSec(currentTime));
    if (barRef.current) {
      barRef.current.style.width = `${
        (currentTime / e.currentTarget.duration) * 100
      }%`;
    }
  }, []);

  const onLoadedData = useCallback(
    (e: SyntheticEvent<HTMLAudioElement>) => {
      setDuration(covertSecToMinSec(e.currentTarget.duration));
      playing ? audioRef.current?.play() : audioRef.current?.pause();
      setCurrentTime("00:00");
      if (barRef.current) {
        barRef.current.style.width = `0%`;
      }
      onSetVolume();
    },
    [playing, onSetVolume],
  );
  const onClickBar = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && barRef.current) {
      const clickedPosition = e.nativeEvent.offsetX;
      barRef.current.style.width = `${clickedPosition}px`;
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / e.currentTarget.clientWidth) *
        audioRef.current.duration;
    }
  }, []);

  const onEnded = useCallback(() => {
    if (mode === "ONE" && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    dispatch(playNextMusic(true));
  }, [dispatch, mode]);

  return (
    <div className="player-bar">
      <div className="progress-bar" onClick={onClickBar}>
        <div className="bar" ref={barRef}></div>
        <audio
          src={music.src}
          ref={audioRef}
          onPlay={onPlay}
          onPause={onPause}
          onTimeUpdate={onTimeUpdate}
          onLoadedData={onLoadedData}
          onEnded={onEnded}
        />
      </div>
      <div className="time">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>
    </div>
  );
};

export default memo(forwardRef(MusicPlayBar));
