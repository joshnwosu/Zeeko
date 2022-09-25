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
  import { toggleTrackIndex } from "../../store/status";
  import { handleRouting } from "../../store/statusManager";
  import { currentAccentColor } from "../../store/theme";
  import { displayContextMenu } from "../../utilities/contextMenu";
  import Checker from "../Addon/Checker.svelte";
  import {
    AddIcon,
    HeartBoldIcon,
    HeartIcon,
    PauseIcon,
    PlayIcon,
  } from "../Icons";

  function toggleFavorite(track) {
    if (getSong($playlistStore[0].tracks, track.fileLocation)) {
      deleteSelectedTrackFromPlaylist(track.fileLocation);
    } else {
      addSelectedTracksToPlaylist(track);
    }
  }
</script>

<div class="tracks">
  {#each tracks as track, index}
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
      on:contextmenu={(e) => displayContextMenu(e, "track")}
    >
      <div class="track-bg" />
      <div class="track-tag-wrapper">
        <span class="track-checker-icon track-icon mr">
          <button class="icon" on:click={() => console.log(track.fileLocation)}>
            <svelte:component this={Checker} />
          </button>
        </span>
        <span class="track-title">
          {#if $toggleTrackIndex}
            <p class="index">{formatIndex(index)}</p>
            <span>&#x2022;</span>
          {/if}
          <p class="title">{track.title}</p>
          <!-- <span>&#x2022;</span>
          <p
            class="artist"
            on:click={() => handleRouting(`#/artist-details/${track.artist}`)}
          >
            {track.artist}
          </p> -->
        </span>
        <span class="track-play-pause-icon track-icon ml">
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

        <span
          class="track-heart-icon track-icon ml"
          class:in-favorite={getSong(
            $playlistStore[0].tracks,
            track.fileLocation
          )}
        >
          <button class="icon" on:click={() => toggleFavorite(track)}>
            {#if getSong($playlistStore[0].tracks, track.fileLocation)}
              <svelte:component this={HeartBoldIcon} />
            {:else}
              <svelte:component this={HeartIcon} />
            {/if}
          </button>
        </span>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .tracks {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 10px 0;
    transition: all 300ms ease-in-out;
    /* justify-content: space-evenly; */
  }
  .track-tag {
    /* width: 300px; */
    max-width: 300px;
    position: relative;
    background-color: #121212;
    border-radius: 20px;
    overflow: hidden;

    &:hover {
      .track-bg {
        opacity: 0.2;
      }
      .track-checker-icon {
        display: flex !important;
      }
    }

    &.playing-track {
      .track-bg {
        opacity: 0.5;
      }
      .track-tag-wrapper {
        .track-icon {
          &.track-heart-icon,
          &.track-play-pause-icon {
            display: flex !important;
          }
        }
      }
    }

    .track-bg {
      background-color: var(--accent-color);
      opacity: 0;
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
      z-index: 1;
    }

    .track-tag-wrapper {
      display: flex;
      position: relative;
      padding: 0px 20px;
      height: 40px;
      align-items: center;
      z-index: 2;
    }

    span {
      display: flex;
    }

    .track-title {
      width: 100%;
      flex: 1;
      overflow: hidden;
      align-items: center;
      p {
        /* max-width: 200px; */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        font-weight: 400;
        color: #e9e9e9;
        /* &.artist:hover {
          opacity: 0.5;
          cursor: pointer;
        } */

        &.index {
          opacity: 0.5;
          font-size: 10px;
        }
      }
      span {
        display: block;
        font-size: 30px;
        margin: 0 10px;
        opacity: 0.5;
      }
    }

    .track-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #12121220;
      display: flex;
      justify-content: center;
      align-items: center;

      &.ml {
        margin-left: 10px;
      }

      &.mr {
        margin-right: 10px;
      }

      &:hover {
        background-color: #12121250;
      }
      .icon {
        width: 25px;
        height: 25px;
        margin-top: 5px;
      }

      &.track-play-pause-icon {
        margin-left: 30px;
      }

      &.track-heart-icon,
      &.track-play-pause-icon,
      &.track-checker-icon {
        display: none;
      }
    }
  }
</style>
