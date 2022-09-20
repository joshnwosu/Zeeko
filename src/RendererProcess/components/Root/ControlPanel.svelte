<script>
  import { onMount } from "svelte";
  import { defaultCoverArt } from "../../utilities";

  let audio;
  let volume = 0.5;
  let volumeBarWidth;

  import {
    PreviousBoldIcon,
    PlayBoldIcon,
    PauseBoldIcon,
    NextBoldIcon,
    HeartIcon,
    ShuffleBoldIcon,
    RepeatBoldIcon,
    HeartBoldIcon,
    MoreIcon,
    RepeatOneBoldIcon,
    VolumeHighBoldIcon,
    CandleBoldIcon,
    Forward10Icon,
    Backward10Icon,
    ChartIcon,
    ArrowDownIcon,
  } from "../../components/Icons";
  import {
    playerStore,
    playbackManager,
    audioContext,
    selectedSong,
    queuelistStore,
    playlistStore,
  } from "../../store/player";
  import { toggleControlStyle, toggleTransparency } from "../../store/status";
  import {
    getSong,
    getSongIndex,
    nextSong,
    playNextTrack,
    prevSong,
    repeatSong,
    shuffleSong,
    stepBackward,
    stepForward,
    togglePlaying,
    encodeTrackFile,
    toggleFavorite,
  } from "../../store/playerManager";
  import {
    handleToggleControlStyle,
    handleToggleEqualizer,
    handleToggleModal,
    handleToggleModalPage,
  } from "../../store/statusManager";
  import { gainNode, setupEqualizer } from "./Equalizer/Equalizer";
  import { currentAccentColor } from "../../store/theme";
  import TrackBar from "../Widgets/TrackBar.svelte";

  onMount(() => {
    setupEqualizer();
  });

  $: if ($playerStore.length) $audioContext = audio;

  $: if ($selectedSong) initPlayer();

  function initPlayer() {
    let index = getSongIndex($queuelistStore, $selectedSong);
    audio.src = encodeTrackFile($queuelistStore[index]);

    audio.onloadeddata = () => {
      audio.play();
      $playbackManager.nowPlaying = getSong($queuelistStore, $selectedSong);
    };

    audio.oncanplay = () => {
      $playbackManager.duration = audio.duration;
      window?.api?.playingTrack($playbackManager.nowPlaying);
    };

    audio.onplaying = () => {
      $playbackManager.playing = true;
    };

    audio.onpause = () => {
      $playbackManager.playing = false;
    };

    audio.ontimeupdate = () => {
      $playbackManager.currentTime = audio.currentTime;
    };

    audio.onended = () => {
      playNextTrack();
    };

    audio.onerror = () => {
      handleToggleModal("file-error");
      $playbackManager.playing = false;
    };
  }

  function changeVolume(e) {
    volume = e.srcElement.value;
    gainNode.gain.value = volume;
  }

  $: if (volume) {
    volumeBarWidth = `${Math.trunc(volume * 100)}%`;
  }
</script>

<audio bind:this={audio} id="audioTag" autoplay />

<div
  class="control-panel"
  class:hide={$toggleControlStyle}
  style="--accent-color: {$currentAccentColor}; background-color: {$toggleTransparency
    ? '#00000080'
    : '#000000'}"
>
  <div class="wrapper left">
    <div class="overlay" />
    <div
      class="cover-art"
      on:click={() => handleToggleModalPage("now-playing")}
    >
      <img
        src={$playbackManager?.nowPlaying?.albumArt || defaultCoverArt}
        alt="cover-art"
      />
    </div>
    <div class="title-artist-wrapper">
      <div class="title">
        <p>
          {$playbackManager?.nowPlaying?.title ||
            $playbackManager?.nowPlaying?.defaultTitle ||
            "Click to play"}
        </p>
      </div>
      <div class="artist">
        <p>
          {$playbackManager?.nowPlaying?.artist ||
            $playbackManager?.nowPlaying?.defaultArtist ||
            "Select a song to play"}
        </p>
      </div>
    </div>
    <span
      class="icon more-icon left-flare"
      on:click={() => handleToggleControlStyle(true)}
    >
      <svelte:component this={ArrowDownIcon} />
    </span>
  </div>
  <div class="wrapper middle">
    <div class="control-button">
      <div class="control-button-inner">
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
        <span class="icon more-icon left-flare">
          <svelte:component this={MoreIcon} />
        </span>
      </div>
      <div class="control-button-inner main-control">
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
      </div>
      <div class="control-button-inner">
        <span
          class="icon shuffle-icon right-flare"
          class:shuffle-on={$playbackManager?.shuffle}
          on:click={shuffleSong}
        >
          <svelte:component this={ShuffleBoldIcon} />
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
      </div>
    </div>
    <TrackBar name="control-panel" />
  </div>
  <div class="wrapper right">
    <span
      class="icon equalizer-icon left-flare"
      on:click={handleToggleEqualizer}
    >
      <svelte:component this={CandleBoldIcon} />
    </span>
    <div class="volume-bar">
      <span class="icon volum-icon left-flare">
        <svelte:component this={VolumeHighBoldIcon} />
      </span>
      <div class="seek-bar-wrap">
        <div class="seek-bar">
          <input
            on:input={changeVolume}
            min="0"
            value=".5"
            max="1"
            step="0.05"
            type="range"
          />
          <div class="seek-progress" style="width: {volumeBarWidth}">
            <div class="seek-knob" />
          </div>
        </div>
      </div>
    </div>
    <span
      class="icon expand-icon right-flare"
      on:click={() => handleToggleModalPage("now-playing")}
    >
      <svelte:component this={ChartIcon} />
    </span>
  </div>
</div>

<style lang="scss">
  :global(.shuffle-on),
  :global(.repeat-on),
  :global(.in-favorite) {
    :global(svg) {
      :global(path) {
        fill: var(--accent-color) !important;
      }
    }
  }
  .overlay {
    background-color: #22222250;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    visibility: hidden;
    opacity: 0;
  }
  .seek-bar-wrap {
    width: 100%;
    height: 10px;
    background-color: transparent;
    display: flex;
    align-items: center;
    margin: 0 20px;
  }
  .seek-bar {
    height: 3px;
    background-color: rgba(255, 255, 255, 0.1);
    position: relative;
    input {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 3;
      top: 0px;
      cursor: pointer;
      opacity: 0;
    }
    .seek-progress {
      background-color: var(--accent-color);
      height: 100%;
      border-radius: 5px;
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .seek-knob {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background-color: #ffffff;
        position: absolute;
        margin-right: -9px;
      }
    }
  }
  .icon {
    display: inline-flex;
    width: 50px;
    height: 50px;
    margin: 0 2px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    cursor: default;

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
  .control-panel {
    position: absolute;
    width: calc(100% - 0px);
    left: 0;
    height: 100px;
    bottom: 0;
    background-color: #00000080;
    backdrop-filter: blur(100px);
    z-index: 999;

    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: 0px 10px 0 0;
    transition: 300ms ease-in-out;

    &.hide {
      transform: translateY(100px);
    }

    .wrapper {
      display: flex;
      position: relative;
      overflow: hidden;
      flex: 1;
      &.left {
        align-items: center;
        padding: 0 10px;
        &:hover {
          .overlay {
            visibility: visible;
            opacity: 1;
          }
        }

        .more-icon {
          position: relative;
          z-index: 999;
        }
      }
      &.middle {
        flex-direction: column;
        justify-content: center;
        flex: 2.5;
      }
      &.right {
        justify-content: flex-end;
      }
      .cover-art {
        width: 80px;
        height: 80px;
        margin-right: 20px;
        position: relative;
        overflow: hidden;
        border-radius: 5px;
        z-index: 2;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }
      .title-artist-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        overflow: hidden;
        flex: 1;
        position: relative;
        z-index: 2;
      }
      .title,
      .artist {
        width: 100%;
        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .title {
        font-size: 18px;
        font-weight: 200;
        margin-bottom: 2px;
      }
      .artist {
        font-size: 12px;
        font-weight: 200;
        opacity: 0.5;
      }
    }

    .middle {
      padding: 0 20px;

      .control-button {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .control-button-inner {
          display: flex;
          align-items: center;
          &.main-control {
            :global(svg) {
              width: 25px;
              height: 25px;
            }
          }
        }
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
    }

    .right {
      align-items: center;
      justify-content: flex-end;
      .volume-bar {
        height: 50px;
        display: flex;
        align-items: center;
        .seek-bar-wrap {
          flex: 1;
          margin: 0;
          margin-left: 9px;
        }
        .seek-bar {
          width: 120px;
        }
      }
    }
  }
</style>
