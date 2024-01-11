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

export type MusicPlayerState = {
  playing: boolean;
  playList: Music[];
  currentIndex: number;
};

export const initMusicPlayerState: MusicPlayerState = {
  playing: false,
  playList,
  currentIndex: 0,
};

const PLAY_MUSIC = "musicPlayer/PLAY_MUSIC" as const;
const PAUSE_MUSIC = "musicPlayer/PAUSE_MUSIC" as const;
const PLAY_NEXT_MUSIC = "musicPlayer/PLAY_NEXT_MUSIC" as const;
const PLAY_PREV_MUSIC = "musicPlayer/PLAY_PREV_MUSIC" as const;

export const playMusic = () => ({
  type: PLAY_MUSIC,
});
export const pauseMusic = () => ({
  type: PAUSE_MUSIC,
});
export const playNextMusic = () => ({
  type: PLAY_NEXT_MUSIC,
});
export const playPrevMusic = () => ({
  type: PLAY_PREV_MUSIC,
});

export default function reducer(state = initMusicPlayerState, action: any) {
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
      const nextIndex = (state.currentIndex + 1) % state.playList.length;

      return {
        ...state,
        currentIndex: nextIndex,
      };
    }
    case PLAY_PREV_MUSIC: {
      const prevIndex =
        (state.currentIndex - 1 + state.playList.length) %
        state.playList.length;

      return {
        ...state,
        currentIndex: prevIndex,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
