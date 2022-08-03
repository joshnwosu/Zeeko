import { writable } from "svelte/store";

let loading = writable(false);

let audioContext = writable(null);

let playerStore = writable([]);

let playlistStore = writable([
  {
    name: "Favorites",
    tracks: [],
  },
]);

let selectedTracksStore = writable([]);

let selectedSong = writable(null);

let queuelistStore = writable([]);

let playbackManager = writable({
  playing: false,
  repeat: 0,
  shuffle: false,
  currentTime: 0,
  duration: 0,
  counter: 0,
  lastPlayed: [],
  nowPlaying: null,
  isInFavorite: false,
});

export {
  selectedSong,
  loading,
  playerStore,
  playbackManager,
  audioContext,
  playlistStore,
  queuelistStore,
  selectedTracksStore,
};
