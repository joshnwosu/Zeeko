import { writable } from "svelte/store";

let toggleSidebar = writable(false);

export { toggleSidebar };
