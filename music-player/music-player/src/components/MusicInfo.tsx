import React from "react";
import image from "../images/image1.png";
const MusicInfo = () => {
  return (
    <>
      <img className="cover-image" src={image} alt="" />
      <div className="info">
        <span className="title">음악제목</span>
        <span>아티스트</span>
      </div>
    </>
  );
};

export default MusicInfo;
