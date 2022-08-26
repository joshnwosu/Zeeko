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
  import { Svrollbar } from "svrollbar";
  import { onMount } from "svelte";

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
    if (getSong($playlistStore[0].tracks, tracks[index].fileLocation)) {
      deleteSelectedTrackFromPlaylist(tracks[index].fileLocation);
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

<Svrollbar {viewport} {contents} />
<AnotherVirtualScrollList
  width="100%"
  height={trackWrapperHeight}
  itemCount={tracks.length}
  itemSize={50}
  overscanCount={0}
>
  <div
    on:dblclick={(e) => playThisTrack(e, index)}
    class:even={index % 2 == 0}
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
    <div class="title col"><p>{tracks[index].title}</p></div>
    <div class="artist col"><p>{tracks[index].artist}</p></div>
    <div class="album col"><p>{tracks[index].album}</p></div>
    <div class="genre col"><p>{tracks[index].genre}</p></div>
    <div class="year col"><p>{tracks[index].year || ""}</p></div>
    <div class="duration col" align="right">
      {#await fetchDuration(encodeTrackFile(tracks[index]))}
        <p>--:--</p>
      {:then duration}
        <p>{formatDuration(duration)}</p>
      {:catch error}
        <p>--:--</p>
      {/await}
    </div>
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
  <div slot="footer" class="footer" />
</AnotherVirtualScrollList>

<style lang="scss">
  .col {
    padding-right: 20px;
    /* border: 1px solid red; */
    overflow: hidden;
    p {
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-size: 13px;
      font-weight: 400;
      color: #e9e9e9;
    }
  }

  .track {
    /* border: 1px solid red; */
    padding: 0 20px;
    display: grid;
    grid-template-columns:
      50px 1.5fr 1fr 1fr minmax(100px, 150px) minmax(20px, 70px) minmax(
        20px,
        70px
      )
      50px;
    gap: 10px;
    align-items: center;
    &.even {
      background-color: #121212;
    }
    &:hover {
      background-color: #333333;
    }
  }

  .footer {
    height: 200px;
    background-color: transparent;
  }
</style>
