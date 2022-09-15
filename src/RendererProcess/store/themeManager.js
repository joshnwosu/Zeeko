import {
  accentColorsConfig,
  themesConfig,
  windowStyleConfig,
} from "../config/appearance";
import { currentAccentColor, currentTheme, currentWindowStyle } from "./theme";

export function changeTheme(index) {
  localStorage.setItem("theme", JSON.stringify(index));
  currentTheme.set(themesConfig[index]);
  // if (payload == "nightfall") {

  // } else if (payload === "sunrise") {
  //   currentTheme.set(themesConfig["sunrise"]);
  // } else if (payload == "amoled") {
  //   currentTheme.set(themesConfig["amoled"]);
  // } else {
  //   currentTheme.set(themesConfig["nightfall"]);
  // }
}

export function changeAccentColor(index) {
  localStorage.setItem("accentColor", JSON.stringify(index));
  currentAccentColor.set(accentColorsConfig[index]);
}

export function changeWindowStyle(index) {
  localStorage.setItem("windowStyle", JSON.stringify(index));
  currentWindowStyle.set(windowStyleConfig[index]);
}
