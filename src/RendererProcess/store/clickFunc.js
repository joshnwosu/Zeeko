import { writable } from "svelte/store";

let toggleSidebar = writable(false);
let toggleNowPlaying = writable(false);
let toggleCreatePlaylist = writable(false);
let toggleModal = writable(null);

export { toggleSidebar, toggleNowPlaying, toggleCreatePlaylist };
