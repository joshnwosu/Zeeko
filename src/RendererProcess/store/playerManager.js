import path from "path";
import { createdFilters } from "../components/Root/Equalizer/Equalizer";
import { presets } from "../components/Root/Equalizer/equalizerPresets";
import {
  genresStore,
  foldersStore,
  albumsStore,
  artistsStore,
  audioContext,
  playbackManager,
  selectedSong,
  playerStore,
  queuelistStore,
  playlistStore,
  selectedTracksStore,
  recentlyPlayedTracksStore,
  playStatsStore,
  EqualizerManager,
} from "./player";

let audio;
let player;
let queuelist;
let playlists;
let status;
let currentTrack;
let selectedTracks;
let recentlyPlayedTracks;

let storeGenres;
let storeFolders;
let storeAlbums;
let storeArtists;

let equalizerStore;

audioContext.subscribe((context) => {
  audio = context;
});

playerStore.subscribe((tracks) => {
  player = tracks;
});

queuelistStore.subscribe((tracks) => {
  queuelist = tracks;
});

playlistStore.subscribe((tracks) => {
  playlists = tracks;
});

selectedTracksStore.subscribe((tracks) => {
  selectedTracks = tracks;
});

playbackManager.subscribe((data) => {
  status = data;
});

selectedSong.subscribe((track) => {
  currentTrack = track;
});

foldersStore.subscribe((store) => {
  storeFolders = store;
});

albumsStore.subscribe((store) => {
  storeAlbums = store;
});

artistsStore.subscribe((store) => {
  storeArtists = store;
});

genresStore.subscribe((store) => {
  storeGenres = store;
});

recentlyPlayedTracksStore.subscribe((store) => {
  recentlyPlayedTracks = store;
});

EqualizerManager.subscribe((store) => {
  equalizerStore = store;
});

function sortArrayOfObjects(targetArray, param) {
  function compare(a, b) {
    if (a[`${param}`] < b[`${param}`]) {
      return -1;
    }
    if (a[`${param}`] > b[`${param}`]) {
      return 1;
    }
    return 0;
  }
  targetArray.sort(compare);
}

function removeDuplicates(targetArray, prop) {
  return targetArray.filter((obj, index, arr) => {
    return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === index;
  });
}

export function getFirstAlbumArt(tracks) {
  let albumArt;
  tracks?.some((track) => (albumArt = track.albumArt));
  return albumArt;
}

export function fetchDuration(path) {
  return new Promise((resolve) => {
    const audioSrc = new Audio();
    audioSrc.src = path;
    audioSrc.addEventListener("loadedmetadata", () => {
      // To keep a promise maintainable, only do 1
      // asynchronous activity for each promise you make
      resolve(audioSrc.duration);
    });
  });
}

export function fetchTotalDuration(paths) {
  // Create an array of promises and wait until all have completed
  return (
    Promise.all(paths.map((path) => fetchDuration(path)))
      // Reduce the results back to a single value
      .then((durations) =>
        durations.reduce((acc, duration) => acc + duration, 0)
      )
  );
}

export function formatDuration(length) {
  let seconds = Math.floor(length % 60) || 0;
  let minutes = Math.floor(length / 60) || 0;
  let hours = Math.floor(minutes / 60) || 0;

  hours %= 24;
  minutes %= 60;
  seconds %= 60;

  seconds = seconds <= 9 ? "0" + seconds : seconds;
  minutes = minutes <= 9 ? "0" + minutes : minutes;
  hours = hours <= 9 ? "0" + hours : hours;

  return length >= 3600
    ? `${hours}:${minutes}:${seconds}`
    : `${minutes}:${seconds}`;
}

export function encodeTrackFile(track) {
  let prefix = "file://";
  let trackExtension = path.extname(track.fileLocation);
  let trackPath = track.folderInfo.path;
  let encodedFileName = encodeURIComponent(path.basename(track.fileName));

  return prefix + path.join(trackPath, encodedFileName) + trackExtension;
}

export function formatIndex(num) {
  let index = num + 1;
  return index <= 9 ? "0" + index : index;
}

export function getSong(arr, id) {
  if (arr.length) return arr.find((track) => track.fileLocation == id);
}

export function getSongIndex(arr, id) {
  if (arr.length) return arr.findIndex((track) => track.fileLocation == id);
}

export function playTrack(index) {
  if (!queuelist) return;
  else {
    if (queuelist[index]) {
      playbackManager.update((status) => {
        status.lastPlayed.push(index);
        return status;
      });
    }
    selectedSong.set(
      queuelist[index >= queuelist.length ? 0 : index].fileLocation
    );

    window?.api?.isPlaying(true);
  }
}

export function togglePlaying() {
  if (!audio.src) return nextSong();

  if (audio.paused) {
    audio.play();
    window?.api?.isPlaying(true);
  } else {
    audio.pause();
    window?.api?.isPlaying(false);
  }
}

export function playSong() {
  audio.play();
}

export function pauseSong() {
  audio.pause();
}

export function selectedTrack(id, tracks) {
  selectedSong.set("");
  if (id != undefined) {
    selectedSong.set(id);

    if (player.length) queuelistStore.set(tracks);
  }
}

export function playAll(tracks) {
  selectedSong.set("");
  queuelistStore.set(tracks);
  selectedSong.set(tracks[0].fileLocation);
}

export function nextSong() {
  if (!queuelist.length) {
    queuelistStore.set(player);
  }
  let index = getSongIndex(queuelist, currentTrack);
  if (!status.shuffle) {
    index++;
    if (index > queuelist.length - 1) index = 0;
  } else {
    if (queuelist.length > 1) {
      let temp = index;
      while (index == temp) {
        index = Math.floor(Math.random() * queuelist.length);
      }
    }
  }
  if (queuelist[index]) {
    playTrack(index);
  }
}

export function prevSong() {
  if (!audio.src) return;
  let index = getSongIndex(queuelist, currentTrack);

  if (!status.shuffle) {
    if (index == 0) index = queuelist.length;
    else index--;
  } else {
    status.lastPlayed.pop();
    index = status.lastPlayed.pop();
  }

  if (index == undefined || index < 0) index = 0;
  playTrack(index);
}

export function stepForward() {
  if (!audio.src) return;
  audio.currentTime += 10;
}

export function stepBackward() {
  if (!audio.src) return;
  audio.currentTime -= 10;
}

export function shuffleSong() {
  if (!audio.src) return;
  if (status.shuffle) {
    playbackManager.update((s) => {
      s.shuffle = false;
      return s;
    });
  } else {
    playbackManager.update((s) => {
      s.shuffle = true;
      return s;
    });
    if (status.repeat == 2) {
      playbackManager.update((s) => {
        s.repeat = 1;
        return s;
      });
    }
  }

  // console.log("s: ", status);
}

export function repeatSong() {
  if (!audio.src) return;
  if (status.repeat == 0) {
    playbackManager.update((s) => {
      s.repeat = 1;
      return s;
    });
  } else if (status.repeat == 1) {
    playbackManager.update((s) => {
      s.repeat = 2;
      return s;
    });
    if (status.shuffle) {
      playbackManager.update((s) => {
        s.shuffle = false;
        return s;
      });
    }
  } else if (status.repeat == 2) {
    playbackManager.update((s) => {
      s.repeat = 0;
      return s;
    });
  }
}

export function playNextTrack() {
  let index = getSongIndex(queuelist, currentTrack);
  if (status.shuffle) {
    if (queuelist.length > 1) {
      let temp = index;
      while (index == temp) {
        index = Math.floor(Math.random() * queuelist.length);
      }
      if (queuelist[index]) {
        playTrack(index);
      }
    }
  } else {
    if (!status.repeat) {
      if (index >= queuelist.length - 1) {
        console.log("All music played");
      } else {
        index++;
        playTrack(index);
      }
    } else if (status.repeat == 1) {
      if (index >= queuelist.length - 1) {
        index = 0;
      } else {
        index++;
      }
      playTrack(index);
    } else if (status.repeat == 2) {
      if (queuelist[index]) {
        audio.play();
      }
    }
  }
}

export function addToSelectedTracks(track) {
  const index = getSongIndex(selectedTracks, track.fileLocation);
  if (index > -1) {
    selectedTracks.splice(index, 1);
  } else {
    selectedTracks.unshift(track);
  }
  console.log(selectedTracks);
}

export function clearSelectedTracks() {
  selectedTracks = [];
}

// export function addSelectedTracksToPlaylist(payload) {
//   if (payload == "Favorites") {
//     // selectedTracks.forEach((track) => {
//     // playlists[0].tracks.push(status.nowPlaying);

//     playlistStore.update((store) => {
//       store[0].tracks.push(status.nowPlaying);
//       return store;
//     });
//     // });
//     // console.log("Payload: ", status.nowPlaying);
//     console.log({ playlists: playlists[0] });
//     // return;
//   }
//   // playlists.forEach((playlist, index) => {
//   //   if (playlist.name == payload) {
//   //     selectedTracks.forEach((track) => {
//   //       playlists[index].tracks.push(track);
//   //       playlists[index].tracks = removeDuplicates(
//   //         playlists[0].tracks,
//   //         "fileLocation"
//   //       );
//   //     });
//   //   }
//   // });
// }

// export function deleSelectedTrackFromPlaylist(payload) {
//   // console.log(payload);
//   if (payload) {
//     playlists[0].tracks.forEach((track) => {
//       const index = getSongIndex(playlists[0].tracks, currentTrack);
//       playlists[0].tracks.splice(index, 1);
//     });
//     // console.log(playlists[0]);
//     console.log({ playlists: playlists[0] });
//   }
// }

// export function extractColorFromImage() {
//   getColors("./assets/images/default-cover-art.jpg")
//     .then((colors) => {
//       console.log("The Colors: ", colors);
//     })
//     .catch((err) => {
//       console.log("Error: ", err);
//     });
// }

export function createPlaylist(payload) {
  const newPlaylist = {
    name: payload,
    tracks: [],
  };
  playlistStore.update((store) => {
    store.push(newPlaylist);
    return store;
  });
  window?.api?.updatePlaylists(playlists);
}

export function addSelectedTracksToPlaylist(payload) {
  if (payload) {
    playlistStore.update((store) => {
      store[0].tracks.unshift(payload);
      return store;
    });
    window?.api?.updatePlaylists(playlists);
  }
}

export function deleteSelectedTrackFromPlaylist(payload) {
  const index = getSongIndex(playlists[0].tracks, payload);
  if (payload) {
    playlistStore.update((store) => {
      store[0].tracks.splice(index, 1);
      return store;
    });
    window?.api?.updatePlaylists(playlists);
  }
}

export function getToPosition(e) {
  if (audio.src) {
    const seekBar = document.querySelector(".seek-bar");
    const seekProgress = document.querySelector(".seek-progress");
    const length = e.clientX - seekBar.getBoundingClientRect().x;
    const percentageSeek = Math.ceil(
      (length / window.getComputedStyle(seekBar).width.replace("px", "")) * 100
    );
    // console.log(percentageSeek);
    seekProgress.style.width = `${percentageSeek}%`;
    audio.currentTime = percentageSeek * audio.duration;
    console.log(percentageSeek * audio.duration);
  }
}

export function addTrack(payload) {
  console.log("Called from the store....");
  const trackAlreadyAdded = player.some(
    (track) => track.fileLocation == payload.fileLocation
  );
  if (!trackAlreadyAdded) {
    playerStore.update((store) => {
      store.push(payload);
      return store;
    });
  }
}

export function updateTrack(payload) {
  // const trackIndex = getSongIndex(player, payload);
  // playerStore.update((store) => {
  //   store.splice(trackIndex, 1);
  //   return store;
  // })
}

export function deleteTrack(payload) {
  const trackIndex = getSongIndex(player, payload);
  playerStore.update((store) => {
    store.splice(trackIndex, 1);
    return store;
  });
}

export function restoreTracks(payload) {
  playerStore.set(payload);
}

export function restoreRecentlyPlayed(payload) {
  recentlyPlayedTracksStore.set(payload);
  // console.log("Recent played: ", payload);
}

export function restorePlaylists(payload) {
  playlistStore.set(payload);
  // console.log("Playlist: ", payload);
}

export function setPlayStats(payload) {
  playStatsStore.set(payload);
  // console.log("Play stats: ", payload);
}

export function generateGenreData() {
  genresStore.set([]);

  const genreNames = new Set(
    player.map((track) => track.genre).filter((genre) => genre)
  );

  genreNames.forEach((genre) => {
    const genreInfo = {
      name: genre.trim(),
      picture: null,
      tracks: [],
      albums: [],
    };
    const tracks = player.filter((track) => track.genre === genre);
    genreInfo.tracks = tracks;
    const albums = tracks.map((track) => track.album).filter((album) => album);
    albums.forEach((album) => {
      const newAlbum = {
        name: album,
        genre: genre,
        tracks: tracks.filter((track) => track.album === album),
      };
      genreInfo.albums.push(newAlbum);
      // genreInfo.picture = getFirstAlbumArt(newAlbum);
    });
    genreInfo.albums = removeDuplicates(genreInfo.albums, "name");
    storeGenres.unshift(genreInfo);
  });
  sortArrayOfObjects(storeGenres, "name");
  // console.log("Genre: ", storeGenres);
}

export function generateArtistsData() {
  artistsStore.set([]);

  // Get list of artist names
  const artistNames = new Set(
    player.map((track) => track.artist).filter((artist) => artist)
  );

  artistNames.forEach((artist) => {
    const artistInfo = {
      name: artist.trim(),
      picture: null,
      tracks: [],
      albums: [],
    };
    const tracksFromCurrentArtist = player.filter(
      (track) => track.artist === artist
    );
    artistInfo.tracks = tracksFromCurrentArtist;

    const albumsFromCurrentArtist = tracksFromCurrentArtist
      .map((track) => track.album)
      .filter((album) => album);

    albumsFromCurrentArtist.forEach((album) => {
      const newAlbum = {
        name: album.trim(),
        artist: artist,
        tracks: tracksFromCurrentArtist.filter(
          (track) => track.album === album
        ),
      };
      artistInfo.albums.push(newAlbum);
    });
    artistInfo.albums = removeDuplicates(artistInfo.albums, "name");

    // artistsStore.update((store) => {
    //   store.unshift(artistInfo);
    //   return store;
    // });
    storeArtists.unshift(artistInfo);
  });

  sortArrayOfObjects(storeArtists, "name");
  // console.log("Artists:", storeArtists);
}

export function generateAlbumsData() {
  albumsStore.set([]);

  const albumNames = new Set(
    player.map((track) => track.album).filter((album) => album)
  );

  albumNames.forEach((album) => {
    const albumInfo = {
      name: album.trim(),
      artist: "",
      tracks: [],
    };
    const tracks = player.filter((track) => track.album === album);
    albumInfo.tracks = tracks;
    albumInfo.artist = tracks[0].artist;
    albumsStore.update((store) => {
      store.unshift(albumInfo);
      return store;
    });
  });
  sortArrayOfObjects(storeAlbums, "name");
  // console.log("Albums:", storeAlbums);
}

export function generateFoldersData() {
  foldersStore.set([]);
  let folders = player.map((track) => track.folderInfo);
  folders = removeDuplicates(folders, "path");
  folders.forEach((folder) => {
    const folderInfo = {
      name: folder.name,
      path: folder.path,
      tracks: [],
    };
    const tracks = player.filter(
      (track) => track.folderInfo.path === folder.path
    );
    folderInfo.tracks = tracks;
    foldersStore.update((store) => {
      store.unshift(folderInfo);
      return store;
    });
  });
  sortArrayOfObjects(storeFolders, "name");
  // console.log("Folders:", storeFolders);
}

// Equalizer manager;

export function updateBandFilter(data) {
  // console.log("Data: ", data);
  equalizerStore.bands[data.targetBandIndex].value = data.newValue;
  createdFilters[data.targetBandIndex].gain.value = data.newValue;
  EqualizerManager.update((store) => {
    store.currentPreset = "Custom";
    return store;
  });
  const customBandValues = equalizerStore.bands.map((band) => band.value);
  presets[1].bandValues = [...customBandValues];
}

export function loadPreset(preset) {
  EqualizerManager.update((store) => {
    store.currentPreset = preset.name;
    return store;
  });
  preset.bandValues.forEach((bandValue, index) => {
    equalizerStore.bands[index].value = bandValue;
    createdFilters[index].gain.value = bandValue;
  });
  // console.log("Preset: ", preset);
}

export function changeBandGains(payload) {
  // console.log("Updating bands", payload);
  EqualizerManager.update((store) => {
    store.bands.map((band, index) => (band.value = payload[index]));
    return store;
  });
  createdFilters.map((filter, index) => (filter.gain.value = payload[index]));
}
