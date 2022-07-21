const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");

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
  window = new BrowserWindow({
    width: 1200,
    height: 600,
    // icon: __dirname + '/public/assets/images/icon.png',
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: false,
      enableRemoteModule: true,
      backgroundThrottling: false,
      webSecurity: true,
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
