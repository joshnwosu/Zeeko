const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // we can also expose variables, not just functions
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  titlebar: (action) => {
    ipcRenderer.send("titlebar", action);
  },
  media: (action) => {
    ipcRenderer.send("media", action);
  },
});
