const { contextBridge, ipcRenderer, ipcMain } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // we can also expose variables, not just functions
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  platform: () => process.platform,

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
  isPlaying: (action) => {
    ipcRenderer.send("isPlaying", action);
    // console.log("Hello: ", action);
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
  parsingDone: (action) => {
    ipcRenderer.on("parsingDone", action);
    // console.log("Parsing done: ", action);
  },
  mediaControl: (action) => {
    ipcRenderer.on("mediaControl", action);
  },
});
