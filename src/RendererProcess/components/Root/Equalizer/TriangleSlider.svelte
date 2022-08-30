<script>
  import { createEventDispatcher } from "svelte";
  import { currentAccentColor } from "../../../store/theme";
  import { gainNode } from "./Equalizer";
  const dispatch = createEventDispatcher();
  export let filterName;
  let barHeight;
  let barHeightForVolumeBoost;

  const updateInput = (e) => {
    const filterValue = parseInt(e.srcElement.value);
    if (filterName == "VBoost") {
      adjustVolumeBoost(filterValue);
      return;
    }
    if (filterName == "Bass") {
      adjustBase(filterValue);
      barHeight = `${(parseInt(filterValue) / 15) * 100}%`;
      return;
    } else {
      adjustTreble(filterValue);
      barHeight = `${(parseInt(filterValue) / 15) * 100}%`;
    }
    console.log("Hello");
    // dispatch("newGainValues");
  };

  const adjustBase = (filterValue) => {
    const bandGains = [0, 0, 0, 0, 0];
    bandGains[0] = filterValue - 2 < 0 ? 0 : filterValue - 2;
    bandGains[1] = filterValue - 4 < 0 ? 0 : filterValue - 4;
    bandGains[2] = filterValue - 6 < 0 ? 0 : -filterValue + 6;
    bandGains[3] = filterValue - 5 < 0 ? 0 : -filterValue + 5;
    bandGains[4] = filterValue - 4 < 0 ? 0 : -filterValue + 4;
    dispatch("newGainValues", bandGains);
  };
  const adjustTreble = (filterValue) => {
    const bandGains = [0, 0, 0, 0, 0];
    bandGains[0] = filterValue - 4 < 0 ? 0 : -filterValue + 4;
    bandGains[1] = filterValue - 5 < 0 ? 0 : -filterValue + 5;
    bandGains[2] = filterValue - 6 < 0 ? 0 : -filterValue + 6;
    bandGains[3] = filterValue - 4 < 0 ? 0 : filterValue - 4;
    bandGains[4] = filterValue - 2 < 0 ? 0 : filterValue - 2;
    dispatch("newGainValues", bandGains);
  };
  const adjustVolumeBoost = (filterValue) => {
    const boostedVolume = 1 + parseInt(filterValue) / 15;
    if (boostedVolume > 1) {
      gainNode.gain.value = 1 + parseInt(filterValue) / 15;
    } else {
      // Do something here
    }
  };
</script>

<div class="triangle_slider" style="--accent-color: {$currentAccentColor}">
  <div class="slider_wrapper">
    <input on:input={updateInput} type="range" min="0" max="15" value="0" />
    {#if filterName === "VBoost"}
      <div class="slider_progress" style="height: {barHeightForVolumeBoost}" />
    {:else}
      <div class="slider_progress" style="height: {barHeight};" />
    {/if}
  </div>
  <p>
    {filterName}
  </p>
</div>

<style lang="scss">
  .triangle_slider {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    input {
      position: absolute;
      bottom: 0;
      transform: rotate(-90deg) translateX(10px);
      width: 100%;
      height: 70%;
      z-index: 3;
      opacity: 0;
    }
    .slider_wrapper {
      position: relative;
      display: inline-block;
      width: 80px;
      filter: url("#goo");
      display: flex;
      flex-direction: column-reverse;
      overflow: hidden;
      &::before {
        content: "";
        display: block;
        padding-top: 86%;
        background: var(--accent-color);
        filter: brightness(1.5);
        clip-path: polygon(100% 0, 50% 100%, 0 0);
      }
    }

    .slider_progress {
      position: absolute;
      bottom: 0;
      height: 100%;
      width: 100%;
      &::before {
        content: "";
        display: block;
        padding-top: 86%;
        background: var(--accent-color);
        clip-path: polygon(100% 0, 50% 100%, 0 0);
      }
    }
    p {
      text-align: center;
      color: white;
      font-size: 12px;
    }
  }
</style>
