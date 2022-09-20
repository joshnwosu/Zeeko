import { pop } from "svelte-spa-router";
import { windowStyleConfig } from "../config/appearance";
import {
  toggleDim,
  toggleSidebar,
  toggleModalPage,
  toggleEqualizer,
  toggleTransparency,
  toggleWindowSystemStyle,
  toggleControlStyle,
  toggleModal,
  toggleContextMenu,
} from "./status";
import { currentWindowStyle } from "./theme";

let dimStore;
let sidebarStore;
let modalPage;
let equalizerStore;
let transparencyStore;
let modal;

toggleDim.subscribe((d) => (dimStore = d));
toggleSidebar.subscribe((s) => (sidebarStore = s));
toggleModalPage.subscribe((n) => (modalPage = n));
toggleEqualizer.subscribe((e) => (equalizerStore = e));
toggleTransparency.subscribe((e) => (transparencyStore = e));
toggleModal.subscribe((m) => (modal = m));

export function handleToggleModalPage(payload) {
  toggleModalPage.set(payload);
}

export function handleToggleSidebar() {
  let sidebar = !sidebarStore;
  localStorage.setItem("Sidebar", JSON.stringify(sidebar));
  toggleSidebar.set(sidebar);
  toggleControlStyle.set(false);
  localStorage.setItem("ControlStyle", JSON.stringify(false));
}

export function handleToggleDimMode(payload) {
  localStorage.setItem("DimMode", JSON.stringify(payload));
  toggleDim.set(payload);
}

export function handleNavigation() {
  // checks if Now playing is visible
  if (modalPage != "close") {
    toggleModalPage.set("close");
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
  // console.log("Platform:", window?.api?.platform());

  let platform = window?.api?.platform();

  if (platform == "win32") {
    localStorage.setItem("windowStyle", JSON.stringify(0));
    currentWindowStyle.set(windowStyleConfig[0]);
  } else if (platform == "darwin") {
    localStorage.setItem("windowStyle", JSON.stringify(1));
    currentWindowStyle.set(windowStyleConfig[1]);
  } else if (platform == "linux") {
    localStorage.setItem("windowStyle", JSON.stringify(2));
    currentWindowStyle.set(windowStyleConfig[2]);
  }
  // console.log("blaka");
}

export function handleToggleControlStyle(payload) {
  toggleControlStyle.set(payload);
  localStorage.setItem("ControlStyle", JSON.stringify(payload));
  toggleSidebar.set(false);
  localStorage.setItem("Sidebar", JSON.stringify(false));
}

export function handleToggleModal(payload) {
  toggleModal.set(payload);
}

export function handleToggleContextMenu(payload) {
  toggleContextMenu.set(payload);
}
