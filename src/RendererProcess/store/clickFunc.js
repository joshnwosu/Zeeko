import { writable } from "svelte/store";

let toggleSidebar = writable(false);
let toggleNowPlaying = writable(false);
let toggleCreatePlaylist = writable(false);
let toggleContextMenu = writable(false);

export {
  toggleSidebar,
  toggleNowPlaying,
  toggleCreatePlaylist,
  toggleContextMenu,
};
