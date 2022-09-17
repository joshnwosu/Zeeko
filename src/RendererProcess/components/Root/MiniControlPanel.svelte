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
  import { currentAccentColor } from "../../store/theme";
  import { defaultCoverArt } from "../../utilities";
  import {
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
</script>

<div
  class="mini-control"
  class:hide={!$toggleControlStyle}
  style="--accent-color: {$currentAccentColor};"
>
  <div class="meta">
    <img
      src={$playbackManager?.nowPlaying?.albumArt || defaultCoverArt}
      alt="cover-art"
    />
    <h1>
      {$playbackManager?.nowPlaying?.title ||
        $playbackManager?.nowPlaying?.defaultTitle ||
        "Click to play"}
    </h1>
    <p>
      {$playbackManager?.nowPlaying?.artist ||
        $playbackManager?.nowPlaying?.defaultArtist ||
        "Select a song to play"}
    </p>
  </div>

  <div class="control-btn">
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
    &.hide {
      transform: translateY(300px);
    }

    .meta {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      overflow: hidden;
      margin-top: 20px;
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
        text-align: center;
        width: 80%;
        margin-top: 10px;
      }

      h1 {
        font-size: 16px;
      }
      p {
        font-size: 12px;
      }
    }

    .control-btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      background-color: #12121250;
      padding: 30px 20px;

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
  }
</style>
