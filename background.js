const { app, screen, BrowserWindow } = require("electron");
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

    // frame: false,
    // opacity: 0.9,
    // backgroundColor: "#222222",
    // transparent: true,

    webPreferences: {
      contextIsolation: false,
      nodeIntegration: false,
      enableRemoteModule: true,
      backgroundThrottling: false,
      webSecurity: true,
      webviewTag: true,
      webgl: false,
    },
  });

  window.loadURL(path.join(__dirname, "public/index.html"));

  if (isDev) window.webContents.openDevTools();

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

// app.on("ready", () => {
//   const mainWindow = new BrowserWindow();
//   mainWindow.loadFile(path.join(__dirname, "public/index.html"));
//   mainWindow.webContents.openDevTools();
// });
