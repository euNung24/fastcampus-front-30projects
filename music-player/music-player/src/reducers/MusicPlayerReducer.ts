import { v4 as uuid } from "uuid";

export type Music = {
  id: string;
  artist: string;
  title: string;
  cover: string;
  src: string;
};

const playList: Music[] = [
  {
    id: uuid(),
    artist: "FASSounds",
    title: "Good Night",
    cover: "/images/image1.png",
    src: "/musics/good-night.mp3",
  },
  {
    id: uuid(),
    artist: "BoDleasons",
    title: "Lofi Chill (Medium Version)",
    cover: "/images/image2.png",
    src: "/musics/lofi-chill-medium-version.mp3",
  },
  {
    id: uuid(),
    artist: "SoulProdMusic",
    title: "Smoke",
    cover: "/images/image3.png",
    src: "/musics/smoke.mp3",
  },
  {
    id: uuid(),
    artist: "Top-Flow-Production",
    title: "Sunshine Jaunt",
    cover: "/images/image4.png",
    src: "/musics/sunshine-jaunt.mp3",
  },

  {
    id: uuid(),
    artist: "AlisiaBeats",
    title: "Titanium",
    cover: "/images/image5.png",
    src: "/musics/titanium.mp3",
  },
];

const MODE = ["ALL", "SHUFFLE", "ONE"];
export type ModeType = "ALL" | "SHUFFLE" | "ONE";

export type MusicPlayerState = {
  playing: boolean;
  playList: Music[];
  currentIndex: number;
  mode: ModeType;
};

export const initMusicPlayerState: MusicPlayerState = {
  playing: false,
  playList,
  currentIndex: 0,
  mode: "ALL",
};

const PLAY_MUSIC = "musicPlayer/PLAY_MUSIC" as const;
const PAUSE_MUSIC = "musicPlayer/PAUSE_MUSIC" as const;
const PLAY_NEXT_MUSIC = "musicPlayer/PLAY_NEXT_MUSIC" as const;
const PLAY_PREV_MUSIC = "musicPlayer/PLAY_PREV_MUSIC" as const;
const CHANGE_MODE = "musicPlayer/CHANGE_MODE" as const;
const SELECT_MUSIC = "musicPlayer/SELECT_MUSIC" as const;
const SORT_PLAYLIST = "musicPlayer/SORT_PLAYLIST" as const;

export const playMusic = () => ({
  type: PLAY_MUSIC,
});
export const pauseMusic = () => ({
  type: PAUSE_MUSIC,
});
export const playNextMusic = (isEnded: boolean = false) => ({
  type: PLAY_NEXT_MUSIC,
  payload: { isEnded },
});
export const playPrevMusic = () => ({
  type: PLAY_PREV_MUSIC,
});
export const changeMode = () => ({
  type: CHANGE_MODE,
});
export const selectMusic = (index: number) => ({
  type: SELECT_MUSIC,
  payload: { index },
});
export const sortPlayList = (playList: Music[]) => ({
  type: SORT_PLAYLIST,
  payload: { playList },
});

export type MusicPlayerAction =
  | ReturnType<typeof playMusic>
  | ReturnType<typeof pauseMusic>
  | ReturnType<typeof playNextMusic>
  | ReturnType<typeof playPrevMusic>
  | ReturnType<typeof changeMode>
  | ReturnType<typeof selectMusic>
  | ReturnType<typeof sortPlayList>;

const getRandomModeIdx = (crtIdx: number): number => {
  const randomIdx = Math.trunc(Math.random() * playList.length);

  return randomIdx === crtIdx ? getRandomModeIdx(crtIdx) : randomIdx;
};

export default function reducer(
  state = initMusicPlayerState,
  action: MusicPlayerAction,
) {
  switch (action.type) {
    case PLAY_MUSIC: {
      return {
        ...state,
        playing: true,
      };
    }
    case PAUSE_MUSIC: {
      return {
        ...state,
        playing: false,
      };
    }
    case PLAY_NEXT_MUSIC: {
      const { mode, currentIndex } = state;
      let nextIndex;
      switch (mode) {
        case "ALL": {
          nextIndex = (state.currentIndex + 1) % state.playList.length;
          break;
        }
        case "SHUFFLE": {
          nextIndex = getRandomModeIdx(currentIndex);
          break;
        }
        default: {
          nextIndex = currentIndex;
          break;
        }
      }

      return {
        ...state,
        playing: state.playing || action.payload.isEnded,
        currentIndex: nextIndex,
      };
    }
    case PLAY_PREV_MUSIC: {
      const { mode, currentIndex } = state;
      let prevIndex;
      switch (mode) {
        case "ALL": {
          prevIndex =
            (state.currentIndex - 1 + state.playList.length) %
            state.playList.length;
          break;
        }
        case "SHUFFLE": {
          prevIndex = getRandomModeIdx(currentIndex);
          break;
        }
        default: {
          prevIndex = currentIndex;
          break;
        }
      }

      return {
        ...state,
        currentIndex: prevIndex,
      };
    }
    case CHANGE_MODE: {
      const currentModeIdx = MODE.findIndex((v) => v === state.mode);
      const nextModeIdx = (currentModeIdx + 1) % MODE.length;
      return {
        ...state,
        mode: MODE[nextModeIdx] as ModeType,
      };
    }
    case SELECT_MUSIC: {
      return {
        ...state,
        currentIndex: action.payload.index,
      };
    }
    case SORT_PLAYLIST: {
      const newPlayList = action.payload.playList;
      return {
        ...state,
        playList: newPlayList,
        currentIndex: newPlayList.findIndex(
          (music) => music.id === state.playList[state.currentIndex].id,
        ),
      };
    }
    default:
      return {
        ...state,
      };
  }
}
