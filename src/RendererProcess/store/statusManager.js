import { toggleSidebar, toggleDim } from "./status";

let dimStore;
let sidebarStore;

toggleDim.subscribe((d) => (dimStore = d));
toggleSidebar.subscribe((s) => (sidebarStore = s));

export function handleToggleSidebar() {
  let sidebar = !sidebarStore;
  localStorage.setItem("Sidebar", JSON.stringify(sidebar));
  toggleSidebar.set(sidebar);
}

export function handleToggleDimMode() {
  let dim = !dimStore;
  localStorage.setItem("DimMode", JSON.stringify(dim));
  toggleDim.set(dim);
}
