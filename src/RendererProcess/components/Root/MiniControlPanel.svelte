<script>
  import { playbackManager, playlistStore } from "../../store/player";
  import {
    getSong,
    nextSong,
    prevSong,
    repeatSong,
    shuffleSong,
    toggleFavorite,
    togglePlaying,
  } from "../../store/playerManager";
  import { toggleControlStyle } from "../../store/status";
  import {
    handleRouting,
    handleToggleControlStyle,
    handleToggleModalPage,
  } from "../../store/statusManager";
  import { defaultCoverArt } from "../../utilities";
  import {
    ArrowDownIcon,
    HeartBoldIcon,
    HeartIcon,
    NextBoldIcon,
    PauseBoldIcon,
    PlayBoldIcon,
    PreviousBoldIcon,
    RepeatBoldIcon,
    RepeatOneBoldIcon,
    ShuffleBoldIcon,
  } from "../Icons";
  import TrackBar from "../Widgets/TrackBar.svelte";
</script>

<div class="mini-control" class:hide={!$toggleControlStyle}>
  <div class="collapse" on:click={() => handleToggleControlStyle(false)}>
    <svelte:component this={ArrowDownIcon} />
  </div>
  <div class="meta">
    <img
      src={$playbackManager?.nowPlaying?.albumArt || defaultCoverArt}
      alt="cover-art"
      on:click={() => handleToggleModalPage("now-playing")}
    />
    <h1>
      {$playbackManager?.nowPlaying?.title ||
        $playbackManager?.nowPlaying?.defaultTitle ||
        "Click to play"}
    </h1>
    <div class="artist">
      <p
        on:click={() =>
          handleRouting(
            `#/artist-details/${$playbackManager?.nowPlaying?.artist}`
          )}
      >
        {$playbackManager?.nowPlaying?.artist ||
          $playbackManager?.nowPlaying?.defaultArtist ||
          "Select a song to play"}
      </p>

      <span
        class="icon heart-icon left-flare"
        class:in-favorite={getSong(
          $playlistStore[0].tracks,
          $playbackManager?.nowPlaying?.fileLocation
        )}
        on:click={toggleFavorite}
      >
        {#if getSong($playlistStore[0].tracks, $playbackManager?.nowPlaying?.fileLocation)}
          <svelte:component this={HeartBoldIcon} />
        {:else}
          <svelte:component this={HeartIcon} />
        {/if}
      </span>
    </div>
  </div>

  <div class="track-progress">
    <TrackBar name="mini-control-panel" />
  </div>

  <div class="control-btn">
    <span
      class="icon repeat-icon right-flare"
      class:repeat-on={$playbackManager?.repeat == 1 ||
        $playbackManager?.repeat == 2}
      on:click={repeatSong}
    >
      {#if $playbackManager?.repeat == 0}
        <svelte:component this={RepeatBoldIcon} />
      {:else if $playbackManager?.repeat == 1}
        <svelte:component this={RepeatBoldIcon} />
      {:else if $playbackManager?.repeat == 2}
        <svelte:component this={RepeatOneBoldIcon} />
      {/if}
    </span>
    <span class="icon previous-icon left-flare" on:click={prevSong}>
      <svelte:component this={PreviousBoldIcon} />
    </span>
    <div class="play-pause" on:click={togglePlaying}>
      <span class="icon play-pause-icon">
        {#if $playbackManager.playing}
          <svelte:component this={PauseBoldIcon} />
        {:else}
          <svelte:component this={PlayBoldIcon} />
        {/if}
      </span>
    </div>
    <span class="icon next-icon right-flare" on:click={nextSong}>
      <svelte:component this={NextBoldIcon} />
    </span>
    <span
      class="icon shuffle-icon right-flare"
      class:shuffle-on={$playbackManager?.shuffle}
      on:click={shuffleSong}
    >
      <svelte:component this={ShuffleBoldIcon} />
    </span>
  </div>
</div>

<style lang="scss">
  .track-progress {
    /* padding: 0 20px; */
    margin: 20px 0;
  }
  .collapse {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff20;
    position: absolute;
    right: 10px;
    top: 0;
    border-radius: 50%;
    transform: scale(0.5);
    opacity: 0;
    transition: 200ms cubic-bezier(0.075, 0.82, 0.165, 1);
    :global(svg) {
      width: 15px;
      height: 15px;
    }
  }
  .mini-control {
    width: 280px;
    min-height: 100px;
    position: fixed;
    bottom: 0;
    left: 0;
    /* background-color: #12121250; */
    transform: translateY(0px);
    transition: 300ms ease-in-out;
    z-index: 999;
    &:hover {
      .collapse {
        transform: scale(1);
        opacity: 1;
      }
    }
    &.hide {
      transform: translateY(100%);
    }

    .meta {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      overflow: hidden;
      img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        object-position: center;
        border-radius: 10px;
      }

      h1,
      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: 200;
        /* border: 1px solid red; */
      }

      h1 {
        width: 80%;
        font-size: 16px;
        text-align: center;
        margin-top: 10px;
      }
      p {
        font-size: 12px;
        text-align: left;
        margin-right: 10px;
        opacity: 0.5;
        &:hover {
          opacity: 0.2;
          cursor: pointer;
        }
      }
      .artist {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 20px;
      }
    }

    .control-btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      background-color: #12121250;
      padding: 30px 20px;
    }

    .icon {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      cursor: default;

      :global(svg) {
        width: 20px;
        height: 20px;
      }
      &:hover:not(.play-pause-icon) {
        :global(svg.svg-icon-bold) {
          :global(path) {
            fill: #ffffff;
          }
        }
        :global(svg.svg-icon-outline) {
          :global(path) {
            stroke: #ffffff;
          }
        }
      }
    }
  }
</style>
