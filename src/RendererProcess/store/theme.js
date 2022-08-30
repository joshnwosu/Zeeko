import { writable } from "svelte/store";
import { themeConfig } from "../config/theme";

const defaults = themeConfig[0].colors;

let themeStore = writable(defaults);

export { themeStore };
