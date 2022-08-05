import { writable } from "svelte/store";

let toggleSidebar = writable(false);
let toggleNowPlaying = writable(false);

export { toggleSidebar, toggleNowPlaying };
