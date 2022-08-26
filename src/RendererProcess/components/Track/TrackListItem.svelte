<script>
  export let tracks;
  export let track;
  export let index;
  // export let index;
  import { push } from "svelte-spa-router";
  import {
    playbackManager,
    playlistStore,
    selectedSong,
  } from "../../store/player";
  import {
    addSelectedTracksToPlaylist,
    deleteSelectedTrackFromPlaylist,
    getSong,
    pauseSong,
    playSong,
    selectedTrack,
  } from "../../store/playerManager";
  import { displayContextMenu } from "../../utilities/contextMenu";
  import {
    AddIcon,
    HeartBoldIcon,
    HeartIcon,
    PauseIcon,
    PlayIcon,
  } from "../Icons";
  import PlayAnimation from "../Widgets/PlayAnimation.svelte";

  function toggleFavorite(track) {
    if (getSong($playlistStore[0].tracks, track.fileLocation)) {
      deleteSelectedTrackFromPlaylist(track.fileLocation);
    } else {
      addSelectedTracksToPlaylist(track);
    }
  }
</script>

<div
  class="track"
  on:dblclick={(e) => {
    if (
      e.target.tagName === "BUTTON" ||
      e.target.parentElement.tagName === "BUTTON"
    ) {
      return false;
    }
    selectedTrack(track.fileLocation, tracks);
  }}
>
  <p>{index}</p>
  <p>{track.title}</p>
</div>

<style lang="scss">
  .track {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    transition: none !important;
    &:hover {
      background-color: #333333;
    }
    &:nth-child(even) {
      background-color: #121212;
    }
  }
</style>
