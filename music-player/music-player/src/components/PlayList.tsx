import React, { Dispatch, SetStateAction, useCallback } from "react";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Music,
  MusicPlayerAction,
  // MusicPlayerState,
  selectMusic,
} from "../reducers/MusicPlayerReducer";
import Sortable from "@eunung/sortable-list";
import PlayListItem from "./PlayListItem";

type PlayListProps = {
  playList: Music[];
  music: Music;
  setShowPlayList: Dispatch<SetStateAction<boolean>>;
  dispatch: Dispatch<MusicPlayerAction>;
};
const PlayList = ({
  playList,
  music,
  setShowPlayList,
  dispatch,
}: PlayListProps) => {
  const onClickPlayList = useCallback(() => {
    setShowPlayList(false);
  }, [setShowPlayList]);

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
        <ClearIcon onClick={onClickPlayList} />
      </div>
      <Sortable
        list={playList}
        keyAttr={"title"}
        renderItemContent={(id, item) => (
          <PlayListItem id={id} item={item} music={music} />
        )}
        onClick={(e, item, { index }) => {
          dispatch(selectMusic(index));
        }}
      />
    </div>
  );
};

export default PlayList;
