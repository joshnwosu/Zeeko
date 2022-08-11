<script>
  import { defaultCoverArt } from "../../utilities";
  // import path from "path";

  // const path = require("path");

  let browserFile;
  let audio;
  let seekBarWidth;
  let volume = 0.5;
  let show = false;

  import { push } from "svelte-spa-router";
  import isElectron from "../../../../isElectron";
  import {
    PlayIcon,
    PauseIcon,
    BackwardIcon,
    PreviousIcon,
    ForwardIcon,
    NextIcon,
    PreviousBoldIcon,
    BackwardBoldIcon,
    PlayBoldIcon,
    PauseBoldIcon,
    ForwardBoldIcon,
    NextBoldIcon,
    HeartIcon,
    ShuffleBoldIcon,
    RepeatBoldIcon,
    HeartBoldIcon,
    MusicFilterBoldIcon,
    MoreIcon,
    RepeatOneBoldIcon,
    VolumeHighIcon,
    VolumeHighBoldIcon,
    MaximizeIcon,
    CandleIcon,
    CandleBoldIcon,
    Forward10Icon,
    Backward10Icon,
    WarningIcon,
  } from "../../components/Icons";
  import {
    playerStore,
    playbackManager,
    audioContext,
    selectedSong,
    queuelistStore,
    playlistStore,
  } from "../../store/player";
  import { toggleNowPlaying } from "../../store/status";
  import {
    formatDuration,
    getSong,
    getSongIndex,
    nextSong,
    playNextTrack,
    prevSong,
    repeatSong,
    shuffleSong,
    stepbackward,
    stepforward,
    // addToSelectedTracks,
    togglePlaying,
    addSelectedTracksToPlaylist,
    deleteSelectedTrackFromPlaylist,
    // checkIfInFavorite,
    encodeTrackFile,
  } from "../../store/playerManager";
  import Modal from "../Modal/Modal.svelte";

  $: if ($playerStore.length) $audioContext = audio;

  $: if ($selectedSong) initPlayer();

  function initPlayer() {
    let index = getSongIndex($queuelistStore, $selectedSong);
    audio.src = encodeTrackFile($queuelistStore[index]);

    audio.onloadeddata = () => {
      audio.play();
      $playbackManager.nowPlaying = getSong($queuelistStore, $selectedSong);
      // checkIfInFavorite();
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
      const percent = Math.floor(
        ($playbackManager.currentTime / $playbackManager.duration) * 100
      );
      seekBarWidth = `${percent}%`;
    };

    audio.onended = () => {
      playNextTrack();
    };

    audio.onerror = () => {
      show = true;
      $playbackManager.playing = false;
    };
  }

  const pickFolder = () => {
    if (isElectron()) {
      window?.api?.media("addScanFolder");
    } else {
      console.log("Opening Browser Dialog...");
      // browserFile.click();
      getDir();
    }
  };

  async function getDir() {
    const dirHandle = await window?.showDirectoryPicker();
    // run code for dirHandle
    console.log("Browser Dir HERE: ", dirHandle);
  }

  function toggleFavorite() {
    if (!audio.src) return;
    if (
      getSong(
        $playlistStore[0].tracks,
        $playbackManager?.nowPlaying.fileLocation
      )
    ) {
      console.log("Track removed from favorite");
      deleteSelectedTrackFromPlaylist($playbackManager.nowPlaying.fileLocation);
    } else {
      console.log("Track added to favorite");
      addSelectedTracksToPlaylist($playbackManager.nowPlaying);
    }
  }

  function seek(e) {
    if (audio.src) {
      let seekPercent = parseInt(e.srcElement.value);
      seekBarWidth = `${seekPercent}%`;
      audio.currentTime = (seekPercent * audio.duration) / 100;
    }
  }

  function changeVolume(e) {
    console.log(e.srcElement.value);
    volume = `${Math.trunc(e.srcElement.value * 100)}%`;
    audio.volume = e.srcElement.value;
    // gainNode.gain.value = this.volume;
    // this.setSettingValue({ property: "volume", newValue: this.volume });
  }

  function volumeBarWidth() {
    return `${Math.trunc(volume * 100)}%`;
  }

  function goToPosition(e) {
    if (audio.src) {
      const seekBar = document.querySelector(".seek-bar");
      const seekProgress = document.querySelector(".seek-progress");
      const length = e.clientX - seekBar.getBoundingClientRect().x;
      const percentageSeek = Math.ceil(
        (length / window.getComputedStyle(seekBar).width.replace("px", "")) *
          100
      );
      seekProgress.style.width = `${percentageSeek}%`;
      audio.currentTime = (percentageSeek * audio.duration) / 100;
    }
  }

  function onClose() {
    show = false;
    nextSong();
  }
</script>

<audio bind:this={audio} />

<Modal {show}>
  <div class="modal-content">
    <div class="modal-content-header">
      <svelte:component this={WarningIcon} />
      <h2>File error</h2>
    </div>

    <p>
      Can't play. An error occured trying to play the file. Close to skip to
      next track.
    </p>

    <p class="file-location">
      File Location:
      <span>{$selectedSong}</span>
    </p>
    <div class="modal-button-wrapper">
      <button on:click={onClose}>Close</button>
    </div>
  </div>
</Modal>

<div class="control-panel" class:hide={$toggleNowPlaying}>
  <div
    class="wrapper left"
    on:click={() => ($toggleNowPlaying = !$toggleNowPlaying)}
  >
    <div class="overlay" />
    <div class="cover-art">
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
        <span class="icon backward-icon left-flare" on:click={stepbackward}>
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
        <span class="icon forward-icon right-flare" on:click={stepforward}>
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
    <div class="track-bar">
      <span class="">
        <p>{formatDuration($playbackManager.currentTime) || "00:00"}</p>
      </span>
      <div class="seek-bar-wrap" on:click={goToPosition}>
        <div class="seek-bar">
          <input on:input={seek} type="range" value="0" min="0" max="100" />
          <div class="seek-progress" style="width: {seekBarWidth}">
            <div class="seek-knob" />
          </div>
        </div>
      </div>

      <span class="">
        <p>{formatDuration($playbackManager.duration) || "00:00"}</p>
      </span>
    </div>
  </div>
  <div class="wrapper right">
    <span class="icon equalizer-icon left-flare" on:click={pickFolder}>
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
          <div class="seek-progress" style="width: {volume}">
            <div class="seek-knob" />
          </div>
        </div>
      </div>
    </div>
    <span
      class="icon expand-icon right-flare"
      on:click={() => window?.api?.titlebar("fullscreen")}
    >
      <svelte:component this={MaximizeIcon} />
    </span>
  </div>
</div>

<style lang="scss">
  .shuffle-on,
  .repeat-on,
  .in-favorite {
    :global(svg) {
      :global(path) {
        fill: #65e14d !important;
      }
    }
  }

  .modal-content {
    width: 400px;
    background-color: #121212;
    padding: 20px;
    color: #ffffff;
    position: relative;
    z-index: 2;
    .modal-content-header {
      display: flex;
      align-items: center;
      h2 {
        font-weight: 400;
        font-size: 18px;
        margin-left: 10px;
      }
      :global(svg) {
        :global(path) {
          fill: orangered;
        }
      }
    }
    p {
      font-size: 14px;
      line-height: 1.5;
      margin: 20px 0;
      &.file-location {
        font-size: 12px;
        span {
          opacity: 0.5;
          display: block;
        }
      }
    }
    .modal-button-wrapper {
      display: flex;
      justify-content: flex-end;
      button {
        background-color: #333333;
        padding: 10px 50px;
        color: #fff;
        font-weight: 200;
        font-size: 12px;
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
    height: 2px;
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
      background-color: #65e14d;
      /* width: 50%; */
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
    /* background-color: rgba(0, 0, 0, 0.6); */
    background-color: #12121260;
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
        color: #ffffff60;
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
          /* &:not(.main-control) {
            opacity: 0;
          } */
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
        :global(svg) {
          width: 50px !important;
          height: 50px !important;
          :global(path) {
            fill: #ffffff;
          }
        }
      }

      .track-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 20px;
        margin-top: 5px;
        margin-left: 15px;
        margin-right: 15px;

        p {
          font-size: 12px;
          letter-spacing: 0.5px;
        }

        .seek-bar {
          flex: 1;
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
          /* border: 1px solid red; */
        }
        .seek-bar {
          width: 120px;
        }
      }
    }
  }
</style>
