// const path = require("path");
import path from "path";
import {
  audioContext,
  playbackManager,
  selectedSong,
  playerStore,
  queuelistStore,
  playlistStore,
  selectedTracksStore,
} from ".";

let audio;
let player;
let queuelist;
let playlists;
let status;
let currentTrack;
let selectedTracks;

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

function removeDuplicates(targetArray, prop) {
  return targetArray.filter((obj, index, arr) => {
    return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === index;
  });
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
  }
}

export function togglePlaying() {
  if (!audio.src) return nextSong();

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
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

export function stepforward() {
  if (!audio.src) return;
  audio.currentTime += 10;
}

export function stepbackward() {
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

export function checkIfInFavorite() {
  playbackManager.update((store) => {
    store.isInFavorite = isInFavorites();
    return store;
  });
}

export function isInFavorites() {
  // console.log(playlists[0]);
  return playlists[0].tracks.some(
    (track) => track.fileLocation == status.nowPlaying.fileLocation
  );
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

export function addSelectedTracksToPlaylist(payload) {
  if (payload == "Favorites") {
    playlistStore.update((store) => {
      store[0].tracks.push(status.nowPlaying);
      return store;
    });
    // console.log({ playlists: playlists[0] });
    window?.api?.updatePlaylists(playlists);
  }
  checkIfInFavorite();
}

export function deleteSelectedTrackFromPlaylist(payload) {
  const index = getSongIndex(playlists[0].tracks, currentTrack);
  if (payload) {
    playlistStore.update((store) => {
      store[0].tracks.splice(index, 1);
      return store;
    });
    // console.log({ playlists: playlists[0] });
    window?.api?.updatePlaylists(playlists);
  }
  checkIfInFavorite();
}

export function restorePlaylists(payload) {
  // playlists = payload
  playlistStore.update((store) => {
    store.push(payload);
    return store;
  });
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
