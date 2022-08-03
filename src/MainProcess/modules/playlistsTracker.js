const fs = require("fs");
const { directories } = require("./directories");

class PlaylistsTracker {
  playlists = [{ name: "Favorite", track: [] }];

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
