const fs = require("fs");
const path = require("path");
const NodeID3 = require("node-id3");
const { directories } = require("../modules/directories");
const { fileTracker } = require("../modules/filesTracker");
const {
  removeMIME,
  extractTitleAndArtist,
  writeImageBuffer,
} = require("../utilities");

function createParsedTrack(fileLocation) {
  return new Promise((resolve, reject) => {
    const track = {
      r_fileLocation: "",
      fileLocation: "",
      albumArt: "",
      album: "",
      title: "",
      artist: "",
      genre: "",
      year: "",
      extractedTitle: "",
      defaultTitle: "",
      extractedArtist: "",
      defaultArtist: "",
      fileName: "",
      length: "",
      date: "",
      dateAdded: 0,
      trackNumber: "",
      folderInfo: {
        name: path.parse(path.parse(fileLocation).dir).base,
        path: path.parse(fileLocation).dir,
      },
    };
    track.r_fileLocation = "file://" + fileLocation;
    track.fileLocation = fileLocation;
    track.fileName = path.parse(fileLocation).name;
    console.log("The file: ", fileLocation);
    NodeID3.read(fileLocation, async (err, tags) => {
      if (tags && tags.image && tags.image.imageBuffer) {
        tags.image.mime = tags.image.mime.replace(/image\//g, "") || "jpg";
        const albumArtPath = path.join(
          directories.albumCover,
          `${removeMIME(
            decodeURI(track.fileName).replace(/[^a-zA-Z0-9-_]/g, "")
          )}.${tags.image.mime}`
        );
        writeImageBuffer(tags.image.imageBuffer, albumArtPath);
        track.albumArt = albumArtPath;
      }
      track.title = tags.title || track.fileName;
      track.extractedTitle = extractTitleAndArtist(track.fileName).title;

      track.artist = tags.artist || "Unknown Artist";
      track.extractedArtist = extractTitleAndArtist(track.fileName).artist;

      track.album = tags.album ? tags.album.trim() : "Unknown Album";

      track.genre = tags.genre ? tags.genre.trim() : "Unknown Genre";

      track.year = tags.year;

      track.defaultTitle =
        track.title || track.extractedTitle || track.fileName;

      track.defaultArtist = track.artist || track.extractedArtist;

      track.length = tags.length;

      track.date = tags.date;

      track.trackNumber = tags.trackNumber;

      fs.stat(track.fileLocation, (err, stats) => {
        track.dateAdded = stats.ctimeMs;
      });

      fileTracker.addFile(track);
      resolve(track);
    });
  });
}

module.exports = {
  createParsedTrack,
};
