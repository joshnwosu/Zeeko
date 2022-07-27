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
  } from "../../components/Icons";
  let playing = false;
</script>

<div class="control-panel">
  <div class="wrapper left">
    <div class="cover-art" />
    <div class="title-artist-wrapper">
      <div class="title">
        <p>Talking to the moon</p>
      </div>
      <div class="artist" on:click={() => push("/my-music/artists")}>
        <p>Bruno Mars</p>
      </div>
    </div>
  </div>
  <div class="wrapper middle">
    <div class="control-button">
      <div class="control-button-inner">
        <span class="icon shuffle-icon left-flare">
          <svelte:component this={ShuffleBoldIcon} />
        </span>
        <span class="icon repeat-icon left-flare">
          <!-- <svelte:component this={RepeatBoldIcon} /> -->
          <svelte:component this={RepeatOneBoldIcon} />
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
        <span class="icon heart-icon right-flare">
          <svelte:component this={HeartBoldIcon} />
        </span>
        <span class="icon more-icon right-flare">
          <svelte:component this={MoreIcon} />
        </span>
      </div>
    </div>
    <div class="track-bar">
      <p>03:49</p>
      <div class="seek-bar">
        <div class="seek-progress" />
      </div>
      <p>01:08</p>
    </div>
  </div>
  <div class="wrapper right" />
</div>

<style lang="scss">
  .control-panel {
    position: absolute;
    /* border: 1px solid green; */
    width: 100%;
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
    padding: 10px 10px;

    .wrapper {
      /* border: 1px solid red; */
      display: flex;
      &.left {
        width: 20%;
        align-items: center;
      }
      &.middle {
        width: 60%;
        flex-direction: column;
        justify-content: space-between;
      }
      &.right {
        width: 20%;
      }
      .cover-art {
        width: 60px;
        height: 60px;
        border-radius: 5px;
        background-color: #f7f8d9;
        /* background-color: #65e14d; */
        margin-right: 10px;
      }
      .title-artist-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
      }
      .title {
        font-size: 16px;
        font-weight: 200;
        opacity: 0.8;
        margin-bottom: 5px;
      }
      .artist {
        font-size: 12px;
        font-weight: 400;
      }
    }

    .middle {
      padding: 0 20px;
      :global(svg) {
        width: 22px;
        height: 22px;
        :global(path) {
          fill: #999999;
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

        p {
          font-size: 10px;
          opacity: 0.5;
          letter-spacing: 0.5px;
        }

        .seek-bar {
          width: 100%;
          height: 5px;
          background-color: rgba(255, 255, 255, 0.05);
          margin: 0 20px;
          border-radius: 5px;
          position: relative;
          .seek-progress {
            background-color: #65e14d;
            width: 100px;
            height: 100%;
            border-radius: 5px;
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      }
    }
  }
</style>
