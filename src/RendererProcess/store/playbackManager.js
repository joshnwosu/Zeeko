import {
  audioContext,
  playbackManager,
  selectedSong,
  playerStore,
  queuelistStore,
} from ".";

let audio;
let player;
let queueList;
let status;
let currentTrack;

audioContext.subscribe((context) => {
  audio = context;
});

playerStore.subscribe((tracks) => {
  player = tracks;
});

queuelistStore.subscribe((queue) => {
  queueList = queue;
});

playbackManager.subscribe((data) => {
  status = data;
});

selectedSong.subscribe((track) => {
  currentTrack = track;
});

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
  if (!queueList) return;
  else {
    if (queueList[index]) {
      playbackManager.update((status) => {
        status.lastPlayed.push(index);
        return status;
      });
    }
    selectedSong.set(
      queueList[index >= queueList.length ? 0 : index].fileLocation
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
  if (!queueList.length) {
    queuelistStore.set(player);
  }
  let index = getSongIndex(queueList, currentTrack);
  if (!status.shuffle) {
    index++;
    if (index > queueList.length - 1) index = 0;
  } else {
    if (queueList.length > 1) {
      let temp = index;
      while (index == temp) {
        index = Math.floor(Math.random() * queueList.length);
      }
    }
  }
  if (queueList[index]) {
    playTrack(index);
  }
}

export function prevSong() {
  if (!audio.src) return;
  let index = getSongIndex(queueList, currentTrack);

  if (!status.shuffle) {
    if (index == 0) index = queueList.length;
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
