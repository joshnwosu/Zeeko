import { pop } from "svelte-spa-router";
import { toggleDim, toggleSidebar, toggleNowPlaying } from "./status";

let dimStore;
let sidebarStore;
let nowPlayingStore;

toggleDim.subscribe((d) => (dimStore = d));
toggleSidebar.subscribe((s) => (sidebarStore = s));
toggleNowPlaying.subscribe((n) => (nowPlayingStore = n));

export function handleToggleSidebar() {
  let sidebar = !sidebarStore;
  localStorage.setItem("Sidebar", JSON.stringify(sidebar));
  toggleSidebar.set(sidebar);
}

export function handleToggleDimMode() {
  let dim = !dimStore;
  localStorage.setItem("DimMode", JSON.stringify(dim));
  toggleDim.set(dim);
}

export function handleNavigation() {
  // checks if Now playing is visible
  if (nowPlayingStore) {
    toggleNowPlaying.set(false);
  } else {
    pop();
  }
}
