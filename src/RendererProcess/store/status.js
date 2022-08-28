import { writable } from "svelte/store";

let toggleSidebar = writable(
  JSON.parse(localStorage.getItem("Sidebar")) || false
);
let toggleDim = writable(JSON.parse(localStorage.getItem("DimMode")) || false);
let toggleNowPlaying = writable(false);
let toggleCreatePlaylist = writable(false);
let toggleContextMenu = writable(false);
let toggleEqualizer = writable(true);

export {
  toggleSidebar,
  toggleDim,
  toggleNowPlaying,
  toggleCreatePlaylist,
  toggleContextMenu,
  toggleEqualizer,
};
