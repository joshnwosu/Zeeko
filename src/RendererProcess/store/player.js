import { writable } from "svelte/store";

let loading = writable(false);
let audioContext = writable(null);

let genresStore = writable([]);
let foldersStore = writable([]);
let albumsStore = writable([]);
let artistsStore = writable([]);
let playerStore = writable([]);
let playlistStore = writable([
  {
    name: "Favorites",
    tracks: [],
  },
]);
let queuelistStore = writable([]);
let selectedTracksStore = writable([]);
let recentlyPlayedTracksStore = writable([]);
let playStatsStore = writable([]);

let selectedSong = writable(null);
let playbackManager = writable({
  playing: false,
  repeat: 0,
  shuffle: false,
  currentTime: 0,
  duration: 0,
  counter: 0,
  lastPlayed: [],
  nowPlaying: null,
});

export {
  genresStore,
  foldersStore,
  albumsStore,
  artistsStore,
  selectedSong,
  loading,
  playerStore,
  playbackManager,
  audioContext,
  playlistStore,
  queuelistStore,
  selectedTracksStore,
  recentlyPlayedTracksStore,
  playStatsStore,
};
