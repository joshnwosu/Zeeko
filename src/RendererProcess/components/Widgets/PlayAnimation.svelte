<script>
  import { playbackManager } from "../../store/player";
  import { currentAccentColor } from "../../store/theme";
</script>

<div
  class="loader-container"
  class:pauseAnim={!$playbackManager.playing}
  class:playAnim={$playbackManager.playing}
  style="--acent-color: {$currentAccentColor}"
>
  <div class="rectangle-1" />
  <div class="rectangle-2" />
  <div class="rectangle-3" />
</div>

<style>
  /* wave animation */
  .loader-container {
    position: relative;
    height: 15px;
    width: 15px;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
  }

  .loader-container > div {
    height: 4px;
    width: 2px;
    border-radius: 4px;
    animation: load 1.5s ease-in-out infinite;
    background-color: var(--accent-color);
  }

  .loader-container .rectangle-2 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }

  .loader-container .rectangle-3 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  /* .pause-animation {
    -webkit-animation-play-state: paused;
    animation-play-state: paused;
    cursor: pointer;
} */

  .pauseAnim > div {
    animation-play-state: paused !important;
  }

  .playAnim > div {
    animation-play-state: running !important;
  }

  @keyframes load {
    0%,
    100% {
      height: 5px;
    }

    16.67% {
      height: 10px;
    }

    33.33% {
      height: 5px;
    }

    50% {
      height: 10px;
    }

    66.67% {
      height: 5px;
    }

    83.34% {
      height: 10px;
    }
  }
</style>
