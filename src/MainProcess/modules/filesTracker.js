const fs = require("fs");
const { directories } = require("./directories");

function removeDuplicates(targetArray, prop) {
  return targetArray.filter((obj, index, arr) => {
    return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === index;
  });
}

class FilesTracker {
  processedFiles = [];
  constructor() {
    if (fs.existsSync(directories.filesTrackerLocation)) {
      try {
        const data = JSON.parse(
          fs.readFileSync(directories.filesTrackerLocation, "utf-8")
        );
        this.processedFiles = data;
        this.checkForDeletedTracks();
      } catch (error) {
        console.log("Error in reading file tracker file", error);
      }
    }
  }
  addFile(track) {
    this.processedFiles.unshift(track);
  }
  updateFile(track) {
    const index = this.processedFiles.findIndex(
      (track) => track.fileLocation == track.fileLocation
    );
    this.processedFiles[index] = track;
    this.saveChanges();
  }
  checkForDeletedTracks() {
    console.log("Checking for deleted tracks");
    const deletedTracks = this.processedFiles.filter(
      (track) => !fs.existsSync(track.fileLocation)
    );
    deletedTracks
      .map((track) => track.fileLocation)
      .forEach((path) => this.deleteFile(path));
  }
  deleteFile(pathToTrack) {
    const indexOfDeletedTrack = this.processedFiles.findIndex(
      (track) => track.fileLocation == pathToTrack
    );
    this.processedFiles.splice(indexOfDeletedTrack, 1);
    this.saveChanges();
  }

  deleteFileBasedOnDirectory(folderPath) {
    // const indexOfDeletedTrack = this.processedFiles.findIndex(
    //   (track) =>
    //     track.folderInfo.path.replace(/(.*)[\/\\]/, "") ==
    //     folderPath.replace(/(.*)[\/\\]/, "")
    // );
    // this.processedFiles.splice(indexOfDeletedTrack, 1);
    // this.saveChanges();
    // console.log("lol:", indexOfDeletedTrack, folderPath);

    // console.log("My guy");

    const filtered = this.processedFiles.filter(
      (track) =>
        track.folderInfo.path.replace(/(.*)[\/\\]/, "") !=
        folderPath.replace(/(.*)[\/\\]/, "")
    );

    // console.log(filtered.length);
    this.processedFiles = filtered;
    this.saveChanges();

    // this.processedFiles.forEach((track, index) => {
    //   if (
    //     track.folderInfo.path.replace(/(.*)[\/\\]/, "") ==
    //     folderPath.replace(/(.*)[\/\\]/, "")
    //   ) {
    //     // console.log("The track: ", track, folderPath);
    //     this.processedFiles.splice(index, 1);
    //     this.saveChanges();
    //     // this.deleteFile(track.fileLocation);
    //   }
    // });
  }

  clearData() {
    this.processedFiles = [];
  }
  saveChanges() {
    fs.writeFile(
      directories.filesTrackerLocation,
      JSON.stringify(removeDuplicates(this.processedFiles, "fileLocation")),
      (err) => {
        if (err) console.log(err);
      }
    );
  }
  get getTracks() {
    return this.processedFiles;
  }
}

module.exports = {
  fileTracker: new FilesTracker(),
};
