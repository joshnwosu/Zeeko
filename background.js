const { app, screen, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");

// use ping | request | message

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

let window = null;

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
    width: width / 1.2,
    height: height / 1.2,
    maxWidth: width,
    maxHeight: height,
    minWidth: 400,
    minHeight: 500,
    // icon: __dirname + '/public/assets/images/icon.png',
    frame: false,

    webPreferences: {
      contextIsolation: true,
      // nodeIntegration: true,
      enableRemoteModule: true,
      backgroundThrottling: false,
      webSecurity: false,
      webviewTag: true,
      preload: path.join(__dirname, "preload.js"),
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
};

app.on("ready", () => {
  createWindow();
});

ipcMain.on("minimize", () => window.minimize());
ipcMain.on("maximize", () => {
  if (window.isMaximized()) {
    window.unmaximize();
    window.center();
  } else {
    window.maximize();
  }
});
ipcMain.on("closeWindow", () => {
  saveAppData();
  window.close();
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

function saveAppData() {
  console.log("Savings App Data...");
}
