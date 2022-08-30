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
    formatIndex,
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
  import AnotherVirtualScrollList from "../Virtual/AnotherVirtualScrollList.svelte";
  import PlayAnimation from "../Widgets/PlayAnimation.svelte";
  import { onMount } from "svelte";
  import { currentAccentColor } from "../../store/theme";

  let viewport;
  let contents;
  let trackWrapperHeight;

  onMount(() => {
    viewport = document.querySelector(".virtual-list-wrapper");
    contents = document.querySelector(".virtual-list-inner");
    trackWrapperHeight =
      document.querySelector(".track-wrapper").scrollHeight || 500;
  });

  function toggleFavorite(track) {
    if (getSong($playlistStore[0].tracks, track.fileLocation)) {
      deleteSelectedTrackFromPlaylist(track.fileLocation);
    } else {
      addSelectedTracksToPlaylist(track);
    }
  }

  function playThisTrack(e, i) {
    if (
      e.target.tagName === "BUTTON" ||
      e.target.parentElement.tagName === "BUTTON"
    ) {
      return false;
    }
    selectedTrack(tracks[i].fileLocation, tracks);
  }
</script>

<div class="track-wrapper" style="--accent-color: {$currentAccentColor}">
  <AnotherVirtualScrollList
    width="100%"
    height={trackWrapperHeight}
    itemCount={tracks.length}
    itemSize={50}
    overscanCount={20}
  >
    <div
      on:contextmenu={displayContextMenu}
      on:dblclick={(e) => playThisTrack(e, index)}
      class:even={index % 2 !== 0}
      class="track tr"
      slot="item"
      let:index
      let:style
      {style}
    >
      <div class="index col">
        {#if $selectedSong == tracks[index].fileLocation}
          <PlayAnimation />
        {:else}
          <p>{formatIndex(index)}</p>
        {/if}
      </div>
      <div class="title col">
        <p>{tracks[index].title}</p>
        <div class="icon-wrapper">
          {#if $selectedSong == tracks[index].fileLocation}
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
              on:click={() => selectedTrack(tracks[index].fileLocation, tracks)}
              ><svelte:component this={PlayIcon} /></button
            >
          {/if}
          <button class="icon" on:click={() => console.log("Addy")}
            ><svelte:component this={AddIcon} /></button
          >
        </div>
      </div>
      <div class="artist col"><p>{tracks[index].artist}</p></div>
      <div class="album col"><p>{tracks[index].album}</p></div>
      <div class="genre col"><p>{tracks[index].genre}</p></div>
      <div class="year col"><p>{tracks[index].year || ""}</p></div>
      <div
        class="favorite col"
        class:in-favorite={getSong(
          $playlistStore[0].tracks,
          tracks[index].fileLocation
        )}
      >
        <button class="icon" on:click={() => toggleFavorite(tracks[index])}>
          {#if getSong($playlistStore[0].tracks, tracks[index].fileLocation)}
            <svelte:component this={HeartBoldIcon} />
          {:else}
            <svelte:component this={HeartIcon} />
          {/if}
        </button>
      </div>
    </div>
    <!-- <div slot="footer" class="footer" /> -->
  </AnotherVirtualScrollList>
</div>

<style lang="scss">
  .track-wrapper {
    width: 100%;
    flex: 1;
    padding: 0 20px;
  }

  .icon {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    display: none;
    &:hover {
      background-color: #444444;
    }
  }

  .col {
    /* border: 1px solid red; */
    overflow: hidden;
    display: flex;
    p {
      /* width: 100%; */
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-size: 13px;
      font-weight: 400;
      color: #e9e9e9;
    }

    &.title {
      align-items: center;
      p {
        color: #ffffff;
        font-weight: 400;
      }
      .icon-wrapper {
        margin-left: 20px;
        flex: 1;
        display: flex;
        align-items: center;
      }
    }

    &.year,
    &.favorite {
      justify-content: flex-end;
    }

    &.year {
      p {
        text-align: right;
      }
    }
  }

  .track {
    /* border: 1px solid red; */
    padding: 0 0 0 20px;
    display: grid;
    grid-template-columns:
      50px 2fr 1fr 1fr minmax(100px, 150px) 50px
      50px;
    gap: 20px;
    align-items: center;
    &.even {
      background-color: #121212;
    }
    &:hover {
      background-color: #333333;
      .icon {
        display: flex !important;
      }
    }
  }

  /* .footer {
    height: 100px;
    background-color: transparent;
  } */
</style>
