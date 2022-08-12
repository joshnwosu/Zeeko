const fs = require("fs");
const { directories } = require("./directories");

class PlaylistsTracker {
  playlists = [{ name: "Favorites", tracks: [] }];

  constructor() {
    if (fs.existsSync(directories.playlistsLocation)) {
      try {
        const data = JSON.parse(
          fs.readFileSync(directories.playlistsLocation, "utf-8")
        );
        this.playlists = data;
      } catch (error) {
        console.log("An error occured while reading playlistTracker file");
      }
    }
  }
  updatePlaylists(playlists) {
    this.playlists = playlists;
    this.saveChanges();
  }
  deleteFile(pathToTrack) {
    // only works for favorites
    const indexOfDeletedTrack = this.playlists[0].tracks.findIndex(
      (track) => track.fileLocation == pathToTrack
    );
    this.playlists[0].tracks.splice(indexOfDeletedTrack, 1);
    this.saveChanges();
  }
  saveChanges() {
    fs.writeFile(
      directories.playlistsLocation,
      JSON.stringify(this.playlists),
      (err) => {
        if (err) console.log(err);
      }
    );
  }

  get getPlaylists() {
    return this.playlists;
  }
}

module.exports = {
  playlistTracker: new PlaylistsTracker(),
};
