import { pop } from "svelte-spa-router";
import {
  toggleDim,
  toggleSidebar,
  toggleNowPlaying,
  toggleEqualizer,
  toggleTransparency,
} from "./status";

let dimStore;
let sidebarStore;
let nowPlayingStore;
let equalizerStore;
let transparencyStore;

toggleDim.subscribe((d) => (dimStore = d));
toggleSidebar.subscribe((s) => (sidebarStore = s));
toggleNowPlaying.subscribe((n) => (nowPlayingStore = n));
toggleEqualizer.subscribe((e) => (equalizerStore = e));
toggleTransparency.subscribe((e) => (transparencyStore = e));

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

export function handleToggleEqualizer() {
  toggleEqualizer.set(!equalizerStore);
}

export function handleToggleTransparency(payload) {
  toggleTransparency.set(payload);
  localStorage.setItem("Transparency", JSON.stringify(payload));
}
