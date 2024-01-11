import React from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import ShuffleIcon from "@mui/icons-material/Shuffle";
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
    default:
      return <></>;
  }
};

export default PlayMode;
