import { writable } from "svelte/store";

let loading = writable(false);

export { loading };
