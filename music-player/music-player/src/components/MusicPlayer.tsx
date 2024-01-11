import React, { useCallback, useReducer, useRef } from "react";
import MusicInfo from "./MusicInfo";
import MusicPlayBar from "./MusicPlayBar";
import MusicToolbar from "./MusicToolbar";
import reducer, { initMusicPlayerState } from "../reducers/MusicPlayerReducer";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [musicPlayerState, dispatch] = useReducer(
    reducer,
    initMusicPlayerState,
  );

  const onPlay = useCallback(() => {
    audioRef.current?.play();
  }, []);

  const onPause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const onChangeVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, []);

  return (
    <section className="music-player-wrapper">
      <p>{musicPlayerState.playing ? "Now Playing" : "Not Playing"}</p>
      <MusicInfo />
      <MusicPlayBar ref={audioRef} dispatch={dispatch} />
      <MusicToolbar
        onPlay={onPlay}
        onPause={onPause}
        onChangeVolume={onChangeVolume}
        state={musicPlayerState}
      />
    </section>
  );
};

export default MusicPlayer;
