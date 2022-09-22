<script>
  import { playbackManager, queuelistStore } from "../../store/player";
  import {
    nextSong,
    prevSong,
    repeatSong,
    shuffleSong,
    stepBackward,
    stepForward,
    togglePlaying,
  } from "../../store/playerManager";
  import { handleRouting } from "../../store/statusManager";
  import { defaultCoverArt } from "../../utilities";
  import {
    Backward10Icon,
    Forward10Icon,
    NextBoldIcon,
    PauseBoldIcon,
    PlayBoldIcon,
    PreviousBoldIcon,
    RepeatBoldIcon,
    RepeatOneBoldIcon,
    ShuffleBoldIcon,
  } from "../Icons";
  import Track from "../Track/Track.svelte";
  import TrackBar from "../Widgets/TrackBar.svelte";
</script>

<div class="now-playing">
  <div class="track-list">
    <Track tracks={$queuelistStore} />
  </div>
  <div class="control">
    <div class="control-cover">
      <img
        src={$playbackManager?.nowPlaying?.albumArt || defaultCoverArt}
        alt="cover-art"
      />
      <div class="cover-detail">
        <h1>
          {$playbackManager?.nowPlaying?.title ||
            $playbackManager?.nowPlaying?.defaultTitle}
        </h1>
        <div class="detail-sub">
          <p
            on:click={() =>
              handleRouting(
                `#/artist-details/${$playbackManager?.nowPlaying?.artist}`
              )}
          >
            {$playbackManager?.nowPlaying?.artist ||
              $playbackManager?.nowPlaying?.defaultArtist}
          </p>
          <p class="dot">&#x2022;</p>
          <p
            on:click={() =>
              handleRouting(
                `#/album-details/${$playbackManager?.nowPlaying?.album}`
              )}
          >
            {$playbackManager?.nowPlaying?.album}
          </p>
        </div>
      </div>
    </div>
    <div class="control-track-bar">
      <TrackBar />
    </div>
    <div class="control-btn">
      <span
        class="icon repeat-icon left-flare"
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
      <span class="icon backward-icon left-flare" on:click={stepBackward}>
        <svelte:component this={Backward10Icon} />
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
      <span class="icon forward-icon right-flare" on:click={stepForward}>
        <svelte:component this={Forward10Icon} />
      </span>
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
</div>

<style lang="scss">
  .now-playing {
    width: 100%;
    height: 100%;
    padding: 60px 60px 20px 60px;
    position: absolute;
    top: 0;

    display: flex;
    flex-direction: column;

    .control {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
    }

    .track-list {
      flex: 1;
      /* height: calc(100% - 100px); */
      overflow-y: auto;
      /* margin-top: 20px; */
    }
  }

  .control-track-bar {
    margin-top: 20px;
  }

  .control-btn {
    margin: 10px 0 20px 0;
    display: flex;
    /* justify-content: space-between; */
    /* justify-content: center; */
    align-items: center;
    gap: 20px;
  }

  .play-pause {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 4px;
    background-color: rgba(255, 255, 255, 0.1);
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  .icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: default;
    width: 50px;
    height: 50px;
    border-radius: 50%;

    :global(svg) {
      width: 25px;
      height: 25px;
    }
    &.left-flare:hover {
      background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.1),
        transparent
      );
    }
    &.right-flare:hover {
      background-image: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.1)
      );
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

  .control-cover {
    display: flex;
    align-items: center;
    padding-left: 20px;
    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      object-position: center;
      margin-right: 20px;
    }

    .cover-detail {
      h1 {
        font-size: 30px;
        font-weight: 200;
      }
      .detail-sub {
        display: flex;
        align-items: center;
      }
      p {
        font-weight: 200;
        font-size: 15px;
        margin-right: 10px;
        &:hover:not(.dot) {
          opacity: 0.5;
          cursor: pointer;
        }
      }
    }
  }
</style>
