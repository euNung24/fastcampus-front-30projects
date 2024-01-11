import React from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import { ModeType } from "../reducers/MusicPlayerReducer";

type PlayModeProps = {
  mode: ModeType;
  onClick: () => void;
};
const PlayMode = ({ mode, onClick }: PlayModeProps) => {
  switch (mode) {
    case "ALL":
      return <RepeatIcon onClick={onClick} />;
    case "SHUFFLE":
      return <ShuffleIcon onClick={onClick} />;
    case "ONE":
      return <RepeatOneIcon onClick={onClick} />;
    default:
      return <div>Something is Wrong</div>;
  }
};

export default PlayMode;
