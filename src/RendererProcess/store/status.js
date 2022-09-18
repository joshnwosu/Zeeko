import { writable } from "svelte/store";

let toggleSidebar = writable(
  JSON.parse(localStorage.getItem("Sidebar")) || false
);
let toggleDim = writable(JSON.parse(localStorage.getItem("DimMode")) || false);
let toggleNowPlaying = writable(false);
let toggleCreatePlaylist = writable(false);
let toggleContextMenu = writable(false);
let toggleEqualizer = writable(false);
let toggleTransparency = writable(
  JSON.parse(localStorage.getItem("Transparency")) || false
);
let toggleWindowSystemStyle = writable(
  JSON.parse(localStorage.getItem("WindowSystemStyle")) || false
);
let toggleControlStyle = writable(
  JSON.parse(localStorage.getItem("ControlStyle")) || false
);
let toggleModal = writable("close");
export {
  toggleSidebar,
  toggleDim,
  toggleNowPlaying,
  toggleCreatePlaylist,
  toggleContextMenu,
  toggleEqualizer,
  toggleTransparency,
  toggleWindowSystemStyle,
  toggleControlStyle,
  toggleModal,
};
