const { contextBridge, ipcRenderer, ipcMain } = require("electron");

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
  processedFiles: (action) => {
    ipcRenderer.on("processedFiles", action);
  },
  newTrack: (action) => {
    ipcRenderer.on("newTrack", action);
  },
  userPlaylists: (action) => {
    ipcRenderer.on("userPlaylists", action);
  },
  updatePlaylists: (action) => {
    ipcRenderer.send("updatePlaylists", action);
  },
});
