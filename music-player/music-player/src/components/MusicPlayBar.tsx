import React, {
  Dispatch,
  ForwardedRef,
  forwardRef,
  SyntheticEvent,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
// @ts-ignore
import music from "../musics/good-night.mp3";
import { pauseMusic, playMusic } from "../reducers/MusicPlayerReducer";

type MusicPlayBarProps = {
  dispatch: Dispatch<any>;
};

const covertSecToMinSec = (sec: number) => {
  const minute = Math.trunc(sec / 60);
  const second = Math.trunc(sec % 60);
  return `${minute.toString().padStart(2, "0")}:${second
    .toString()
    .padStart(2, "0")}`;
};

const MusicPlayBar = (
  { dispatch }: MusicPlayBarProps,
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

  const onLoadedData = (e: SyntheticEvent<HTMLAudioElement>) => {
    setDuration(covertSecToMinSec(e.currentTarget.duration));
  };

  const onClickBar = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && barRef.current) {
      const clickedPosition = e.nativeEvent.offsetX;
      barRef.current.style.width = `${clickedPosition}px`;
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / e.currentTarget.clientWidth) *
        audioRef.current.duration;
    }
  };

  return (
    <div className="player-bar">
      <div className="progress-bar" onClick={onClickBar}>
        <div className="bar" ref={barRef}></div>
        <audio
          src={music}
          ref={audioRef}
          onPlay={onPlay}
          onPause={onPause}
          onTimeUpdate={onTimeUpdate}
          onLoadedData={onLoadedData}
        />
      </div>
      <div className="time">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>
    </div>
  );
};

export default forwardRef(MusicPlayBar);
