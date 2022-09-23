<script>
  import { audioContext, playbackManager } from "../../store/player";
  import { formatDuration } from "../../store/playerManager";

  let seekBar;
  let seekProgress;

  $: audio = $audioContext;
  $: seekBarWidth =
    Math.floor(
      ($playbackManager.currentTime / $playbackManager.duration) * 100
    ) + "%";

  function seek(e) {
    if (audio.src) {
      let seekPercent = parseInt(e.srcElement.value);
      seekBarWidth = `${seekPercent}%`;
      audio.currentTime = (seekPercent * audio.duration) / 100;
    }
  }

  function goToPosition(e) {
    if (audio.src) {
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

<div class="track-bar">
  <span class="">
    <p>{formatDuration($playbackManager.currentTime) || "00:00"}</p>
  </span>
  <div class="seek-bar-wrap" on:click={goToPosition}>
    <div class="seek-bar" bind:this={seekBar}>
      <input on:input={seek} type="range" value="0" min="0" max="100" />
      <div
        class="seek-progress"
        bind:this={seekProgress}
        style="width: {seekBarWidth}"
      >
        <div class="seek-knob" />
      </div>
    </div>
  </div>

  <span class="">
    <p>{formatDuration($playbackManager.duration) || "00:00"}</p>
  </span>
</div>

<style lang="scss">
  .track-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 5px;
    margin-left: 15px;
    margin-right: 15px;

    p {
      font-size: 10px;
      letter-spacing: 0.5px;
    }

    .seek-bar {
      flex: 1;
    }
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
</style>
