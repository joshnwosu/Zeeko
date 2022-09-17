import { pop } from "svelte-spa-router";
import {
  toggleDim,
  toggleSidebar,
  toggleNowPlaying,
  toggleEqualizer,
  toggleTransparency,
  toggleWindowSystemStyle,
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

export function handleToggleDimMode(payload) {
  localStorage.setItem("DimMode", JSON.stringify(payload));
  toggleDim.set(payload);
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

export function handleToggleWindowSystemStyle(payload) {
  toggleWindowSystemStyle.set(payload);
  localStorage.setItem("WindowSystemStyle", JSON.stringify(payload));
}
