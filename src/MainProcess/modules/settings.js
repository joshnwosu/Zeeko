const fs = require("fs");
const { directories } = require("./directories");

class Settings {
  settings = {
    foldersToScan: [directories.musicDirectory],
  };
  constructor() {
    if (fs.existsSync(directories.settingsLocation)) {
      try {
        const data = JSON.parse(
          fs.readFileSync(directories.settingsLocation, "utf-8")
        );
        this.settings = data;
      } catch (error) {
        console.log("An error occurred while reading settings file", error);
      }
    }
  }
  updateSettings(payload) {
    this.settings = payload;
    this.saveSettings();
  }
  addFolderToScan(folderPath) {
    this.settings.foldersToScan.push(folderPath);
    this.saveSettings();
  }
  removeFromScannedFolders(folderPath) {
    this.settings.foldersToScan.forEach((folder, index) => {
      if (
        folder.replace(/(.*)[\/\\]/, "") == folderPath.replace(/(.*)[\/\\]/, "")
      ) {
        this.settings.foldersToScan.splice(index, 1);
        return;
      }
    });
    this.saveSettings();
  }
  saveSettings() {
    fs.writeFile(
      directories.settingsLocation,
      JSON.stringify(this.settings),
      (err) => {
        if (err) console.log(err);
      }
    );
  }

  get getSttings() {
    return this.settings;
  }
}

module.exports = {
  settings: new Settings(),
};
