import React from "react";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import ClearIcon from "@mui/icons-material/Clear";
const PlayList = () => {
  return (
    <div className="playlist">
      <div className="header">
        <div>
          <QueueMusicIcon />
          <span
            style={{
              marginLeft: "8px",
            }}
          >
            Playlist
          </span>
        </div>
        <ClearIcon />
      </div>
      <ul>
        <li>
          <div className="info">
            <span className="title">Title</span>
            <span className="artist">Artist</span>
          </div>
          <time>00:00</time>
        </li>
        <li>
          <div className="info">
            <span className="title">Title</span>
            <span className="artist">Artist</span>
          </div>
          <time>00:00</time>
        </li>
        <li>
          <div className="info">
            <span className="title">Title</span>
            <span className="artist">Artist</span>
          </div>
          <time>00:00</time>
        </li>
        <li>
          <div className="info">
            <span className="title">Title</span>
            <span className="artist">Artist</span>
          </div>
          <time>00:00</time>
        </li>
        <li>
          <div className="info">
            <span className="title">Title</span>
            <span className="artist">Artist</span>
          </div>
          <time>00:00</time>
        </li>
        <li>
          <div className="info">
            <span className="title">Title</span>
            <span className="artist">Artist</span>
          </div>
          <time>00:00</time>
        </li>
        <li>
          <div className="info">
            <span className="title">Title</span>
            <span className="artist">Artist</span>
          </div>
          <time>00:00</time>
        </li>
        <li>
          <div className="info">
            <span className="title">Title</span>
            <span className="artist">Artist</span>
          </div>
          <time>00:00</time>
        </li>
        <li>
          <div className="info">
            <span className="title">Title</span>
            <span className="artist">Artist</span>
          </div>
          <time>00:00</time>
        </li>
      </ul>
    </div>
  );
};

export default PlayList;
