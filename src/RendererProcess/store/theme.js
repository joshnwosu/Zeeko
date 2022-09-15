import { writable } from "svelte/store";
import {
  accentColorsConfig,
  themesConfig,
  windowStyleConfig,
} from "../config/appearance";

let themeStore = writable(null);
let currentTheme = writable(
  themesConfig[JSON.parse(localStorage.getItem("theme")) || 0]
);
let currentAccentColor = writable(
  accentColorsConfig[JSON.parse(localStorage.getItem("accentColor")) || 0]
);
let currentWindowStyle = writable(
  windowStyleConfig[JSON.parse(localStorage.getItem("windowStyle")) || 0]
);

export { themeStore, currentTheme, currentAccentColor, currentWindowStyle };
