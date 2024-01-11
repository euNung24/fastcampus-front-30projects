export type MusicPlayerState = {
  playing: boolean;
};
export const initMusicPlayerState = {
  playing: false,
};

const PLAY_MUSIC = "music_player/PLAY_MUSIC" as const;
const PAUSE_MUSIC = "music_player/PAUSE_MUSIC" as const;

export const playMusic = () => ({
  type: PLAY_MUSIC,
});
export const pauseMusic = () => ({
  type: PAUSE_MUSIC,
});

export default function reducer(
  state: MusicPlayerState = initMusicPlayerState,
  action: any,
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
    default:
      return {
        ...state,
      };
  }
}
