const {
  app,
  screen,
  BrowserWindow,
  ipcMain,
  dialog,
  nativeImage,
} = require("electron");
const path = require("path");
const fs = require("fs");
const url = require("url");
const chokidar = require("chokidar");
const isDev = require("electron-is-dev");
const { directories } = require("./src/MainProcess/modules/directories");
const { SUPPORTED_FORMATS } = require("./src/MainProcess/constants/constant");
const {
  createParsedTrack,
} = require("./src/MainProcess/core/createParsedTrack");
const { fileTracker } = require("./src/MainProcess/modules/filesTracker");
const {
  playlistTracker,
} = require("./src/MainProcess/modules/playlistsTracker");
const { playbackStats } = require("./src/MainProcess/modules/playbackStats");

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

let watcher = null;
let window = null;
let isPlaying = true;
let checkPlayStatus;

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`),
    awaitWriteFinish: true,
  });
}

const createWindow = () => {
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.workAreaSize;
  window = new BrowserWindow({
    width: width - 10,
    height: height - 10,
    maxWidth: width,
    maxHeight: height,
    minWidth: 400,
    minHeight: 500,
    // icon: path.join(__dirname, "logo.png"),
    frame: false,

    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      backgroundThrottling: false,
      webSecurity: false,
      webgl: false,
      webviewTag: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  window.loadURL(path.join(__dirname, "public/index.html"));

  // if (isDev) window.webContents.openDevTools({ mode: "right" });

  window.on("closed", () => {
    window = null;
  });

  window.webContents.on("did-fail-load", () => {
    window.loadURL(path.join(__dirname, "public/index.html"));
  });

  console.log("dir", __dirname);

  function sendMediaControl(arg) {
    window.webContents.send("mediaControl", arg);
  }

  checkPlayStatus = () => {
    window.setThumbarButtons([
      {
        tooltip: "Previous",
        icon: "./previous.png",
        click() {
          sendMediaControl("prev");
        },
      },
      {
        tooltip: !isPlaying ? "Play" : "Pause",
        icon: !isPlaying ? "./play.png" : "./pause.png",
        click() {
          sendMediaControl("play" || "pause");
        },
      },
      {
        tooltip: "Next",
        icon: "./next.png",
        click() {
          sendMediaControl("next");
        },
      },
    ]);
  };

  window.setThumbarButtons([
    {
      tooltip: "Previous",
      icon: "./previous.png",
      click() {
        sendMediaControl("prev");
      },
    },
    {
      tooltip: !isPlaying ? "Play" : "Pause",
      icon: !isPlaying ? "./play.png" : "./pause.png",
      click() {
        sendMediaControl("play" || "pause");
      },
    },
    {
      tooltip: "Next",
      icon: "./next.png",
      click() {
        sendMediaControl("next");
      },
    },
  ]);

  // playerReady();
  refreshTracks();
};

function isValidFileType(path) {
  return path.match(/\.mp3|\.webm|\.m4a|\.ogg/gi);
}

// listen for file changes
watcher = chokidar
  .watch(`${directories.musicDirectory}`, {
    ignored: /[\/\\]\./,
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: true,
  })
  .on("add", async (path) => {
    if (isValidFileType(path)) {
      console.log(`File ${path} has been added`);
      const newTrack = await createParsedTrack(path);
      window.webContents.send("newTrack", newTrack);
      fileTracker.saveChanges();
    }
  })

  .on("change", (path) => {
    console.log(`File ${path} has been changed`);
    playerReady();
  })
  .on("unlink", (path) => {
    console.log(`File ${path} has been removed`);
    fileTracker.deleteFile(path);
    playerReady();
  })
  .on("ready", () => {
    console.log("Done.");
    // watcherHandler();
    // refreshTracks();
  });

app.on("ready", () => {
  createWindow();
});

ipcMain.on("isPlaying", (event, arg) => {
  // console.log("Arg: ", isPlaying);
  if (arg) isPlaying = true;
  else isPlaying = false;

  checkPlayStatus();
});

ipcMain.on("titlebar", (event, arg) => {
  if (arg === "destroy") window.destroy();
  else if (arg === "kill") app.quit();
  else if (arg === "minimize") window.minimize();
  else if (arg === "maximize") {
    if (window.isMaximized()) window.unmaximize();
    else window.maximize();
  } else if (arg === "closeWindow") {
    saveAppData();
    window.close();
  }
});

ipcMain.on("media", async (event, payload) => {
  if (payload === "addScanFolder") {
    dialog
      .showOpenDialog(window, { properties: ["openDirectory"] })
      .then((data) => {
        console.log(data.filePaths[0]);
      })
      .catch((err) => console.log("Error: ", err));
  }
  if (payload === "getTracks") {
    playerReady();
  }

  if (payload === "initializePlayer") {
    // playerReady();
    refreshTracks();
  }
});

ipcMain.on("updatePlaylists", async (event, payload) => {
  playlistTracker.updatePlaylists(payload);
});

ipcMain.on("playingTrack", async (event, track) => {
  console.log("Adding track...");
  playbackStats.addFile(track);
});

function playerReady() {
  const processedFiles = fileTracker.getTracks;
  const playlists = playlistTracker.getPlaylists;
  const recentlyPlayedTracks = playbackStats.recentlyPlayedTracks;
  const playStats = playbackStats.playStats;
  if (processedFiles.length > 0) {
    window.webContents.send("processedFiles", processedFiles);
    window.webContents.send("userPlaylists", playlists);
    window.webContents.send("recentlyPlayed", recentlyPlayedTracks);
    refreshTracks();
    window.webContents.send("playStats", playStats);
  }
}

function refreshTracks() {
  const folders = [directories.musicDirectory];
  // console.log(folders);
  let superFolder = [];
  handleAllFolders(folders, folders.length, 0);
  function handleAllFolders(folders, length, index) {
    parseFolder(folders[index], [], []).then((data) => {
      superFolder = [...superFolder, ...data];
      index += 1;
      if (index <= length - 1) {
        handleAllFolders(folders, length, index);
      } else {
        prepareTracksForProcessing(superFolder);
        // console.log("SUper: ", superFolder);
      }
    });
  }
}

async function prepareTracksForProcessing(foldersFinalData) {
  const data = [];
  foldersFinalData.forEach((folder) => {
    folder.tracks.forEach((fileName) => {
      const filePath = path.join(folder.path, fileName);
      const parsed = fileTracker.getTracks.some(
        (file) => file.fileLocation == filePath
      );
      if (!parsed) {
        data.push({ fileName, filePath, folder });
      }
    });
  });
  if (data.length !== 0) {
    processTracks(data, 0);
    // console.log("process Tracks: ", data);
  }
}

async function processTracks(data, index) {
  console.log("Beginning to parse " + data[index].fileName);
  const newTrack = await createParsedTrack(data[index].filePath);
  window.webContents.send("newTrack", newTrack);
  console.log("newTrack:", newTrack);
  console.log("Done parsing " + data[index].fileName);
  if (index !== data.length - 1) {
    processTracks(data, index + 1);
    // win.webContents.send("parsingProgress", [index + 2, data.length]);
    console.log("parsingProgress", [index + 2, data.length]);
  } else {
    fileTracker.saveChanges();
    window.webContents.send("parsingDone", data.length);
    return;
  }
}

async function parseFolder(folderPath, subFolders, foldersFinalData) {
  return new Promise((resolve) => {
    (function recursiveReader(folderPath, subFolders, foldersFinalData) {
      subFolders.shift();
      const folderObject_notParsed = {
        name: folderPath.replace(/(.*)[\/\\]/, "").split(".")[0],
        path: folderPath,
        tracks: [],
      };
      fs.readdir(folderPath, async (err, files) => {
        let newSubFolders = files.filter((file) =>
          fs.lstatSync(path.join(folderPath, file)).isDirectory()
        );
        newSubFolders = newSubFolders.map((item) =>
          path.join(folderPath, item)
        );
        subFolders = [...subFolders, ...newSubFolders];
        const audioFiles = files.filter((file) =>
          SUPPORTED_FORMATS.includes(path.parse(file).ext)
        );
        folderObject_notParsed.tracks = audioFiles;

        foldersFinalData = [...foldersFinalData, folderObject_notParsed];
        if (subFolders[0]) {
          recursiveReader(subFolders[0], subFolders, foldersFinalData);
        } else {
          resolve(foldersFinalData);
          console.log("I'm Done Reading all the folders");
          // playerReady();
        }
      });
    })(folderPath, subFolders, foldersFinalData);
  });
}

function saveAppData() {
  console.log("Savings App Data...");
  fileTracker.saveChanges();
  playbackStats.saveChanges();
}

// module.exports = {
//   fileTracker,
// };
