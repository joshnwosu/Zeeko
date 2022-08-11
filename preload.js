const { contextBridge, ipcRenderer, ipcMain } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // we can also expose variables, not just functions
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,

  // Bridge from renderer to main
  titlebar: (action) => {
    ipcRenderer.send("titlebar", action);
  },
  media: (action) => {
    ipcRenderer.send("media", action);
  },
  updatePlaylists: (action) => {
    ipcRenderer.send("updatePlaylists", action);
  },
  playingTrack: (action) => {
    ipcRenderer.send("playingTrack", action);
  },

  // Bridge from main to renderer
  processedFiles: (action) => {
    ipcRenderer.on("processedFiles", action);
  },
  newTrack: (action) => {
    ipcRenderer.on("newTrack", action);
  },
  userPlaylists: (action) => {
    ipcRenderer.on("userPlaylists", action);
  },
  updateTrack: (action) => {
    ipcRenderer.on("updateTrack", action);
  },
  deleteTrack: (action) => {
    ipcRenderer.on("deleteTrack", action);
  },
  recentlyPlayed: (action) => {
    ipcRenderer.on("recentlyPlayed", action);
  },
  playStats: (action) => {
    ipcRenderer.on("playStats", action);
  },
});
