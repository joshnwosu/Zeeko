import {
  accentColorsConfig,
  themesConfig,
  windowStyleConfig,
} from "../config/appearance";
import { toggleWindowSystemStyle } from "./status";
import { currentAccentColor, currentTheme, currentWindowStyle } from "./theme";

export function changeTheme(index) {
  localStorage.setItem("theme", JSON.stringify(index));
  currentTheme.set(themesConfig[index]);
}

export function changeAccentColor(index) {
  localStorage.setItem("accentColor", JSON.stringify(index));
  currentAccentColor.set(accentColorsConfig[index]);
}

export function changeWindowStyle(index) {
  localStorage.setItem("windowStyle", JSON.stringify(index));
  currentWindowStyle.set(windowStyleConfig[index]);

  toggleWindowSystemStyle.set(false);
  localStorage.setItem("WindowSystemStyle", JSON.stringify(false));
}
