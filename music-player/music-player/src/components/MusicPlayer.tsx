import React, { useCallback, useReducer, useRef } from "react";
import MusicInfo from "./MusicInfo";
import MusicPlayBar from "./MusicPlayBar";
import MusicToolbar from "./MusicToolbar";
import reducer, { initMusicPlayerState } from "../reducers/MusicPlayerReducer";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
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

  const onSetVolume = useCallback(() => {
    if (volumeRef.current && audioRef.current) {
      audioRef.current.volume =
        volumeRef.current.clientWidth /
        volumeRef.current.parentElement!.clientWidth;
    }
  }, []);

  return (
    <section className="music-player-wrapper">
      <p>{musicPlayerState.playing ? "Now Playing" : "Not Playing"}</p>
      <MusicInfo
        music={musicPlayerState.playList[musicPlayerState.currentIndex]}
      />
      <MusicPlayBar
        ref={audioRef}
        playing={musicPlayerState.playing}
        music={musicPlayerState.playList[musicPlayerState.currentIndex]}
        dispatch={dispatch}
        onSetVolume={onSetVolume}
      />
      <MusicToolbar
        ref={volumeRef}
        state={musicPlayerState}
        dispatch={dispatch}
        onPlay={onPlay}
        onPause={onPause}
        onChangeVolume={onChangeVolume}
      />
    </section>
  );
};

export default MusicPlayer;