<script>
  import { push } from "svelte-spa-router";

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
  let playing = false;
  const src = "./assets/images/281951.jpg";
</script>

<div class="control-panel">
  <div class="wrapper left">
    <div class="cover-art">
      <img {src} alt={src} />
    </div>
    <div class="title-artist-wrapper">
      <div class="title">
        <p>Ed Sheeran - Bad Habits [Official]</p>
      </div>
      <div class="artist" on:click={() => push("/my-music/artists")}>
        <p>Ed Sheeran</p>
      </div>
    </div>
  </div>
  <div class="wrapper middle">
    <div class="control-button">
      <div class="control-button-inner">
        <span class="icon heart-icon left-flare">
          <svelte:component this={HeartBoldIcon} />
        </span>
        <span class="icon more-icon left-flare">
          <svelte:component this={MoreIcon} />
        </span>
      </div>
      <div class="control-button-inner main-control">
        <span class="icon previous-icon left-flare">
          <svelte:component this={PreviousBoldIcon} />
        </span>
        <span class="icon backward-icon left-flare">
          <svelte:component this={BackwardBoldIcon} />
        </span>
        <div class="play-pause">
          <span class="icon play-pause-icon">
            {#if playing}
              <svelte:component this={PlayBoldIcon} />
            {:else}
              <svelte:component this={PauseBoldIcon} />
            {/if}
          </span>
        </div>
        <span class="icon forward-icon right-flare">
          <svelte:component this={ForwardBoldIcon} />
        </span>
        <span class="icon next-icon right-flare">
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
      <span class="icon left-flare">
        <p>01:08</p>
      </span>
      <div class="seek-bar">
        <div class="seek-progress">
          <div class="seek-knob" />
        </div>
      </div>
      <span class="icon right-flare">
        <p>03:49</p>
      </span>
    </div>
  </div>
  <div class="wrapper right">
    <span class="icon equalizer-icon left-flare">
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

    &:hover {
      p {
        opacity: 1 !important;
      }
    }

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
      width: 24px;
      height: 24px;
    }
    &:hover:not(.play-pause-icon) {
      :global(svg) {
        /* width: 25px; */
        /* height: 25px; */
        :global(path) {
          fill: #ffffff;
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
    background-color: rgba(14, 18, 26, 0.8);
    /* background-color: rgba(23, 28, 38, 0.9); */
    backdrop-filter: blur(50px);
    z-index: 1000;

    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: 0px 20px;

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
        justify-content: space-between;
        flex: 1.5;
      }
      &.right {
        /* width: 30%; */
        justify-content: flex-end;
      }
      .cover-art {
        width: 70px;
        height: 70px;
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
        height: 50px;

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
      align-items: flex-end;
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
