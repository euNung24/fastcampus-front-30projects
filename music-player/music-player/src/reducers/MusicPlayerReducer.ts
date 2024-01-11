export type Music = {
  artist: string;
  title: string;
  cover: string;
  music: string;
};

const playList: Music[] = [
  {
    artist: "FASSounds",
    title: "Good Night",
    cover: "/images/image1.png",
    music: "/musics/good-night.mp3",
  },
  {
    artist: "BoDleasons",
    title: "Lofi Chill (Medium Version)",
    cover: "/images/image2.png",
    music: "/musics/lofi-chill-medium-version.mp3",
  },
  {
    artist: "SoulProdMusic",
    title: "Smoke",
    cover: "/images/image3.png",
    music: "/musics/smoke.mp3",
  },
  {
    artist: "Top-Flow-Production",
    title: "Sunshine Jaunt",
    cover: "/images/image4.png",
    music: "/musics/sunshine-jaunt.mp3",
  },

  {
    artist: "AlisiaBeats",
    title: "Titanium",
    cover: "/images/image5.png",
    music: "/musics/titanium.mp3",
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

export type MusicPlayerAction =
  | ReturnType<typeof playMusic>
  | ReturnType<typeof pauseMusic>
  | ReturnType<typeof playNextMusic>
  | ReturnType<typeof playPrevMusic>
  | ReturnType<typeof changeMode>;

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
    default:
      return {
        ...state,
      };
  }
}
