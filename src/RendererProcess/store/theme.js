import { writable } from "svelte/store";
import { accentColorsConfig } from "../config/appearance";
import { themeConfig } from "../config/theme";

let themeStore = writable(null);
let currentTheme = writable(themeConfig["amoled"]);
let currentAccentColor = writable(
  accentColorsConfig[JSON.parse(localStorage.getItem("accentColor")) || 0]
);

export { themeStore, currentTheme, currentAccentColor };
