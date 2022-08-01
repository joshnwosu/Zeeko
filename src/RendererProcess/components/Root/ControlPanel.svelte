<script>
  import { location } from "svelte-spa-router";
  let src = "./assets/images/281951.jpg";

  let browserFile;
  let audio;
  let audioCurrentTime;
  let audioDuration;

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
    prevSong,
    stepbackward,
    stepforward,
    togglePlaying,
  } from "../../store/playbackManager";

  $: if ($playerStore.length) $audioContext = audio;

  $: if ($selectedSong) initPlayer();

  function initPlayer() {
    let index = getSongIndex($queuelistStore, $selectedSong);
    audio.src = $queuelistStore[index].r_fileLocation;

    audio.onloadeddata = () => {
      audio.play();
      $playbackManager.nowPlaying = getSong($queuelistStore, $selectedSong);
    };

    audio.oncanplay = () => {
      $playbackManager.duration = audio.duration;
      $playbackManager.currentTime = audio.currentTime;
    };

    audio.onplaying = () => {
      $playbackManager.playing = true;
    };

    audio.onpause = () => {
      $playbackManager.playing = false;
    };

    audio.ontimeupdate = () => {
      audioDuration = formatDuration(audio.duration);
      audioCurrentTime = formatDuration(audio.currentTime);
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
      <div class="artist" on:click={() => push("/my-music/artists")}>
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
        <span class="icon heart-icon left-flare">
          <svelte:component this={HeartIcon} />
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
        <span class="icon shuffle-icon right-flare">
          <svelte:component this={ShuffleBoldIcon} />
        </span>
        <span class="icon repeat-icon right-flare">
          <svelte:component this={RepeatOneBoldIcon} />
        </span>
      </div>
    </div>
    <div class="track-bar">
      <span class="">
        <p>{audioCurrentTime || "00:00"}</p>
      </span>
      <div class="seek-bar">
        <div class="seek-progress">
          <!-- <div class="seek-knob" /> -->
        </div>
      </div>
      <span class="">
        <p>{audioDuration || "00:00"}</p>
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
        <div class="seek-progress">
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
    background-color: rgba(255, 255, 255, 0.05);
    margin-left: 10px;
    border-radius: 5px;
    position: relative;
    .seek-progress {
      background-color: #65e14d;
      width: 50%;
      height: 100%;
      border-radius: 5px;
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .seek-knob {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #ffffff;
        position: absolute;
      }
    }
  }
  .icon {
    display: inline-flex;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    cursor: default;

    &.left-flare:hover {
      background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.05),
        transparent
      );
    }
    &.right-flare:hover {
      background-image: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.05)
      );
    }
    :global(svg) {
      width: 20px;
      height: 20px;
    }
    &:hover:not(.play-pause-icon) {
      :global(svg.svg-icon-bold) {
        /* width: 25px; */
        /* height: 25px; */
        :global(path) {
          fill: #ffffff;
        }
      }
      :global(svg.svg-icon-outline) {
        /* width: 25px; */
        /* height: 25px; */
        :global(path) {
          stroke: #ffffff;
        }
      }
    }
  }
  .control-panel {
    position: absolute;
    /* border: 1px solid green; */
    width: calc(100% - 0px);
    left: 0;
    height: 100px;
    bottom: 0;
    background-color: rgba(14, 18, 26, 0.6);
    /* background-color: rgba(23, 28, 38, 0.9); */
    backdrop-filter: blur(50px);
    z-index: 1000000;

    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: 0px 10px;
    /* padding-top: 20px; */
    /* padding-right: 20px; */
    /* border-top: 1px solid rgba(23, 28, 38, 1); */
    transition: 300ms ease-in-out;

    &.hide {
      transform: translateY(100px);
    }

    .wrapper {
      /* border: 1px solid red; */
      display: flex;
      position: relative;
      overflow: hidden;
      flex: 1;
      &.left {
        /* width: 30%; */
        align-items: center;
      }
      &.middle {
        /* width: 40%; */
        flex-direction: column;
        justify-content: center;
        flex: 1.5;
      }
      &.right {
        /* width: 30%; */
        justify-content: flex-end;
      }
      .cover-art {
        width: 80px;
        height: 80px;
        border-radius: 5px;
        /* background-color: #ffffff; */
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
      }
    }

    .middle {
      padding: 0 20px;
      /* :global(svg) {
        width: 22px;
        height: 22px;
        :global(path) {
          fill: #999999;
        }
      } */

      .control-button {
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* padding: 0 20px; */
        /* border: 1px solid red; */
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
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 4px;
        :global(svg) {
          width: 25px;
          height: 25px;
          :global(path) {
            fill: rgba(14, 18, 26, 0.8);
          }
        }
      }

      .track-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* padding: 0 20px; */
        /* border: 1px solid blue; */
        height: 20px;
        margin-top: 5px;

        p {
          font-size: 10px;
          opacity: 0.5;
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
      /* border: 1px solid red; */
      .volume-bar {
        /* width: 200px; */
        height: 50px;
        display: flex;
        align-items: center;
        .seek-bar {
          width: 150px;
        }
      }
    }
  }
</style>
