<script>
  import { location, replace } from "svelte-spa-router";
  // import path from "path";

  // const path = require("path");

  // let src = "./assets/images/281951.jpg";
  let src = "./assets/images/default-cover-art.jpg";

  let browserFile;
  let audio;
  let seekBarWidth;
  let volume = 0.5;

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
  } from "../../components/Icons";
  import {
    playerStore,
    playbackManager,
    audioContext,
    selectedSong,
    queuelistStore,
  } from "../../store";
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
    addToSelectedTracks,
    togglePlaying,
    isInFavorites,
    addSelectedTracksToPlaylist,
    deleteSelectedTrackFromPlaylist,
    checkIfInFavorite,
    encodeTrackFile,
  } from "../../store/playbackManager";

  $: if ($playerStore.length) $audioContext = audio;

  $: if ($selectedSong) initPlayer();

  function initPlayer() {
    let index = getSongIndex($queuelistStore, $selectedSong);
    audio.src = encodeTrackFile($queuelistStore[index]);

    audio.onloadeddata = () => {
      audio.play();
      $playbackManager.nowPlaying = getSong($queuelistStore, $selectedSong);
      checkIfInFavorite();
    };

    audio.oncanplay = () => {
      $playbackManager.duration = audio.duration;
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
    if (isInFavorites()) {
      console.log("Track removed from favorite");
      deleteSelectedTrackFromPlaylist($playbackManager.nowPlaying);
    } else {
      console.log("Track added to favorite");
      addSelectedTracksToPlaylist("Favorites");
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
</script>

<audio bind:this={audio} />

<div class="control-panel" class:hide={$location == "/now-playing"}>
  <div class="wrapper left">
    <div class="cover-art">
      <img src={$playbackManager?.nowPlaying?.albumArt || src} alt={src} />
    </div>
    <div class="title-artist-wrapper">
      <div class="title">
        <p>
          {$playbackManager?.nowPlaying?.title ||
            $playbackManager?.nowPlaying?.defaultTitle ||
            "Click to play"}
        </p>
      </div>
      <div
        class="artist"
        on:click={() =>
          push(`/artist-details/${$playbackManager?.nowPlaying?.artist}`)}
      >
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
          class:in-favorite={$playbackManager?.isInFavorite}
          on:click={toggleFavorite}
        >
          {#if $playbackManager?.isInFavorite}
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
          <svelte:component this={BackwardBoldIcon} />
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
          <svelte:component this={ForwardBoldIcon} />
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
      <div class="seek-bar" on:click={goToPosition}>
        <input on:input={seek} type="range" value="0" min="0" max="100" />
        <div class="seek-progress" style="width: {seekBarWidth}">
          <div class="seek-knob" />
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
    <span
      class="icon expand-icon right-flare"
      on:click={() => window?.api?.titlebar("fullscreen")}
    >
      <svelte:component this={MaximizeIcon} />
    </span>
  </div>
</div>

<style lang="scss">
  .seek-bar {
    height: 5px;
    background-color: rgba(255, 255, 255, 0.1);
    margin-left: 10px;
    border-radius: 5px;
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
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: #ffffff;
        position: absolute;
        margin-right: -8px;
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
    &.shuffle-on,
    &.repeat-on,
    &.in-favorite {
      :global(svg) {
        :global(path) {
          fill: #65e14d !important;
        }
      }
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
    background-color: rgba(0, 0, 0, 0.6);
    background-color: #12121290;
    backdrop-filter: blur(20px);
    z-index: 1000000;

    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: 0px 10px;
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
      }
      &.middle {
        flex-direction: column;
        justify-content: center;
        flex: 2;
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
        margin-left: 20px;
        margin-right: 20px;

        p {
          font-size: 12px;
          letter-spacing: 0.5px;
        }

        .seek-bar {
          margin: 0 20px;
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
        .seek-bar {
          width: 120px;
        }
      }
    }
  }
</style>
