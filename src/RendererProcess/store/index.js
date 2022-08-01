import { writable } from "svelte/store";

let loading = writable(false);
let audioContext = writable(null);

let playerStore = writable([]);
let playlistStore = writable([]);

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
});

export {
  selectedSong,
  loading,
  playerStore,
  playbackManager,
  audioContext,
  playlistStore,
  queuelistStore,
};
