import { writable } from "svelte/store";

const defaults = {
  "--primary-bg": "red",
  "--text": "white",
};

let themeStore = writable(defaults);

export { themeStore };
