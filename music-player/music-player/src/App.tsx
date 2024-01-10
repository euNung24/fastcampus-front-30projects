import React from "react";
import "./App.scss";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import RepeatIcon from "@mui/icons-material/Repeat";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import image from "./images/image1.png";
function App() {
  return (
    <section className="music-player-wrapper">
      <p>Now Playing</p>
      <img className="cover-image" src={image} alt="" />
      <div className="info">
        <span className="title">음악제목</span>
        <span>아티스트</span>
      </div>
      <div className="player-bar">
        <div className="bar"></div>
        <div className="time">
          <span>00:00</span>
          <span>00:00</span>
        </div>
      </div>
      <div className="player-tool">
        <QueueMusicIcon />
        <RepeatIcon />
        <SkipPreviousIcon />
        <PauseIcon />
        {/*<PlayArrowIcon />*/}
        <SkipNextIcon />
        <div className="volume-box">
          <VolumeUpIcon />
          <div className="volume-bar">
            <div className="bar"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
