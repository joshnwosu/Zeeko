import { writable } from "svelte/store";
import { accentColorsConfig, windowStyleConfig } from "../config/appearance";
import { themeConfig } from "../config/theme";

let themeStore = writable(null);
let currentTheme = writable(themeConfig["amoled"]);
let currentAccentColor = writable(
  accentColorsConfig[JSON.parse(localStorage.getItem("accentColor")) || 0]
);
let currentWindowStyle = writable(windowStyleConfig["windows"]);

export { themeStore, currentTheme, currentAccentColor, currentWindowStyle };
