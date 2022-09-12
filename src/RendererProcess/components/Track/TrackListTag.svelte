<script>
  export let tracks;
  import { push } from "svelte-spa-router";
  import {
    playbackManager,
    playlistStore,
    selectedSong,
  } from "../../store/player";
  import {
    addSelectedTracksToPlaylist,
    deleteSelectedTrackFromPlaylist,
    encodeTrackFile,
    fetchDuration,
    formatDuration,
    formatIndex,
    getSong,
    pauseSong,
    playSong,
    selectedTrack,
  } from "../../store/playerManager";
  import { currentAccentColor } from "../../store/theme";
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

<div class="tracks" style="--accent-color: {$currentAccentColor}">
  {#each tracks as track}
    <div
      class="track-tag"
      class:playing-track={$selectedSong == track.fileLocation}
      on:dblclick={(e) => {
        if (
          e.target.tagName === "BUTTON" ||
          e.target.parentElement.tagName === "BUTTON"
        ) {
          return false;
        }
        selectedTrack(track.fileLocation, tracks);
      }}
      on:contextmenu={displayContextMenu}
    >
      <div class:track-playing={$selectedSong == track.fileLocation} />
      {#if $selectedSong == track.fileLocation}
        <span class="track-animation">
          <PlayAnimation />
        </span>
      {/if}

      <span class="track-title"> <p>{track.title}</p></span>

      <span class="track-play-pause-icon">
        {#if $selectedSong == track.fileLocation}
          {#if $playbackManager.playing}
            <button class="icon" on:click={pauseSong}
              ><svelte:component this={PauseIcon} /></button
            >
          {:else}
            <button class="icon" on:click={playSong}
              ><svelte:component this={PlayIcon} /></button
            >
          {/if}
        {:else}
          <button
            class="icon"
            on:click={() => selectedTrack(track.fileLocation, tracks)}
            ><svelte:component this={PlayIcon} /></button
          >
        {/if}
      </span>
    </div>
  {/each}
</div>

<style lang="scss">
  .tracks {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 10px 0;
  }
  .track-tag {
    position: relative;
    display: inline-flex;
    background-color: #121212;
    padding: 5px 10px 5px 20px;
    border-radius: 20px;
    overflow: hidden;
    max-width: 200px;
    &:hover:not(.playing-track) {
      background-color: var(--accent-color);
    }

    .track-playing {
      background-color: var(--accent-color);
      opacity: 0.5;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      pointer-events: none;
      display: flex;
      align-items: center;
    }

    span {
      display: flex;
    }

    .track-animation {
      margin-right: 20px;
      align-items: center;
    }

    .track-title {
      width: 100%;
      flex: 1;
      overflow: hidden;
      align-items: center;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        font-weight: 400;
        color: #e9e9e9;
      }
    }

    .track-play-pause-icon {
      margin-left: 20px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #33333350;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        width: 25px;
        height: 25px;
        /* border: 1px solid red; */
        margin-top: 5px;
      }
    }
  }
</style>
