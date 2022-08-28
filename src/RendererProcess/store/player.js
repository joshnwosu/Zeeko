import { writable } from "svelte/store";
import { presets } from "../components/Root/Equalizer/equalizerPresets";

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

let EqualizerManager = writable({
  currentPreset: "Normal",
  customPreset: null,
  equalizerPresets: presets,
  bands: [
    {
      id: "band1",
      frequency: "60hz",
      value: 0,
    },
    {
      id: "band2",
      frequency: "230hz",
      value: 0,
    },
    {
      id: "band3",
      frequency: "910hz",
      value: 0,
    },
    {
      id: "band4",
      frequency: "4khz",
      value: 0,
    },
    {
      id: "band5",
      frequency: "14khz",
      value: 0,
    },
  ],
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
  EqualizerManager,
};
