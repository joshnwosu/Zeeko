const app = require("electron");

let setWindowSize;

function pingRequestToNode(message) {
  checkWindowSize();
  app.ipcRenderer.send(message);
}

async function checkWindowSize() {
  app.ipcRenderer.on("window-max", () => {
    setWindowSize = "max";
  });
  app.ipcRenderer.on("window-min", () => {
    setWindowSize = "min";
  });
}

export { setWindowSize, pingRequestToNode };
