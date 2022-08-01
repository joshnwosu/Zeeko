const fs = require("fs");
const { directories } = require("../modules/directories");

function writeImageBuffer(imageBuffer, savePath) {
  fs.writeFileSync(savePath, imageBuffer);
}

function extractTitleAndArtist(trackName) {
  const split = trackName.split("-");
  let artist;
  let title;
  if (trackName.includes("_-")) {
    artist = split[0];
    title = split[1];
  } else if (trackName.includes("-")) {
    artist = split[1];
    title = split[0];
  } else {
    return { artist: "unknown", title: null };
  }
  artist = artist.replace(/_/g, " ").trim();
  title = title
    .replace(/_/g, " ")
    .replace(/\(.*\).*/gi, "")
    .replace(/\[.*\].*/gi, "")
    .replace(/\)/, "")
    .trim();
  return { artist, title };
}

function removeMIME(str) {
  return str.replace(/(\.mp3)|(\.m4a)|(\.ogg)|(\.wav)/gi, "");
}

module.exports = {
  removeMIME,
  extractTitleAndArtist,
  writeImageBuffer,
};
