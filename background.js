const { app, screen, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");

// use ping | request | message

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

let window = null;

if (isDev) {
  // require("electron-reload")(__dirname, {
  //   electron: require(`${__dirname}/node_modules/electron`),
  // });

  require("electron-reload")(__dirname, {
    // electron: path.join(__dirname, "../node_modules", ".bin", "electron"),
    electron: require(`${__dirname}/node_modules/electron`),
    awaitWriteFinish: true,
  });
}

const createWindow = () => {
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.workAreaSize;
  window = new BrowserWindow({
    width: width / 1.2,
    height: height / 1.2,
    maxWidth: width,
    maxHeight: height,

    // icon: __dirname + '/public/assets/images/icon.png',

    frame: false,
    // opacity: 0.9,
    // backgroundColor: "#222222",
    // transparent: true,
    // titleBarStyle: "hiddenInset",
    // titleBarOverlay: true,
    fullscreenable: true,
    maximizable: true,
    resizable: true,
    minimizable: true,

    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      backgroundThrottling: false,
      webSecurity: false,
      webviewTag: true,
      // webgl: false,
    },
  });

  window.loadURL(path.join(__dirname, "public/index.html"));

  if (isDev) window.webContents.openDevTools({ mode: "right" });

  window.on("closed", () => {
    window = null;
  });

  window.webContents.on("did-fail-load", () => {
    window.loadURL(path.join(__dirname, "public/index.html"));
  });

  // window.on("show", () => {
  //   window.center();
  // });

  // window.once("ready-to-show", () => {
  //   window.show();
  // });
};

app.on("ready", () => {
  createWindow();
});

ipcMain.on("minimize", () => window.minimize());
ipcMain.on("maximize", () => {
  if (window.isMaximized()) {
    window.webContents.send("window-min");
    window.unmaximize();
    window.center();
  } else {
    window.webContents.send("window-max");
    window.maximize();
  }
});
// ipcMain.on("maximize", () => {
//   window.unmaximize();
//   window.center();
// });
// ipcMain.on("restore", () => {
//   window.webContents.send("window-size", { restore: true });
//   window.maximize();
// });
ipcMain.on("closeWindow", () => {
  saveAppData();
  window.close();
});

function saveAppData() {
  console.log("Savings App Data...");
}
