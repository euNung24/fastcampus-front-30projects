import React, {
  Dispatch,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
// @ts-ignore
import music from "../musics/good-night.mp3";
import { pauseMusic, playMusic } from "../reducers/MusicPlayerReducer";

type MusicPlayBarProps = {
  dispatch: Dispatch<any>;
};
const MusicPlayBar = (
  { dispatch }: MusicPlayBarProps,
  ref: ForwardedRef<HTMLAudioElement>,
) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useImperativeHandle(ref, () => audioRef.current!, []);

  const onPlay = () => {
    dispatch(playMusic());
  };

  const onPause = () => {
    dispatch(pauseMusic());
  };

  return (
    <div className="player-bar">
      <div className="bar">
        <audio src={music} ref={audioRef} onPlay={onPlay} onPause={onPause} />
      </div>
      <div className="time">
        <span>00:00</span>
        <span>00:00</span>
      </div>
    </div>
  );
};

export default forwardRef(MusicPlayBar);
