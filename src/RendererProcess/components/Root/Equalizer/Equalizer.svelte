<script>
  import { toggleEqualizer } from "../../../store/status";
  import { EqualizerManager } from "../../../store/player";
  import FilterSlider from "./FilterSlider.svelte";
  import {
    updateBandFilter,
    loadPreset,
    changeBandGains,
  } from "../../../store/playerManager";
  import TriangleSlider from "./TriangleSlider.svelte";
  import { currentAccentColor } from "../../../store/theme";
  import { clickOutside } from "../../../utilities";

  function updateSlider(event) {
    updateBandFilter(event.detail);
  }
</script>

<div
  class="equalizer"
  class:open={$toggleEqualizer}
  use:clickOutside
  on:click_outside={() => toggleEqualizer.set(false)}
>
  <div class="equalizer-header">
    <h1>Equalizer</h1>
    <div class="close" on:click={() => toggleEqualizer.set(false)}>
      <p>&times;</p>
    </div>
  </div>
  <div class="presets" style="--accent-color: {$currentAccentColor}">
    {#each $EqualizerManager.equalizerPresets as preset}
      <button
        class:active={$EqualizerManager.currentPreset == preset.name}
        on:click={() => loadPreset(preset)}>{preset.name}</button
      >
    {/each}
  </div>

  <div class="filter_sliders">
    {#each $EqualizerManager.bands as band, index}
      <div class="filter">
        <p>{band.value}db</p>
        <svelte:component
          this={FilterSlider}
          bandIndex={index}
          filterValue={band.value}
          on:rangeUpdated={updateSlider}
        />
        <p>{band.frequency}</p>
      </div>
    {/each}
  </div>

  <div class="b_t">
    <svelte:component
      this={TriangleSlider}
      filterName="Bass"
      on:newGainValues={(event) => changeBandGains(event.detail)}
    />
    <svelte:component
      this={TriangleSlider}
      filterName="Treble"
      on:newGainValues={(event) => changeBandGains(event.detail)}
    />
    <svelte:component this={TriangleSlider} filterName="VBoost" />
  </div>
</div>

<style lang="scss">
  .equalizer {
    height: calc(100% - 100px);
    position: fixed;
    right: 60px;
    top: 0;
    bottom: 0;
    background-image: linear-gradient(-90deg, #000000, #00000020);
    z-index: 99;
    backdrop-filter: blur(20px);
    transform: translateX(20%);
    transition: 200ms cubic-bezier(0.075, 0.82, 0.165, 1);
    padding: 50px;
    opacity: 0;
    visibility: hidden;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
    &.open {
      transform: translateX(0%);
      opacity: 1;
      visibility: visible;
    }
  }

  .equalizer-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .close {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;

      border-radius: 50%;
      &:hover {
        background-color: #121212;
      }

      p {
        color: #ffffff;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 5px;
      }
    }
  }

  .presets {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    button {
      border: none;
      background-color: #ffffff20;
      color: #ffffff;
      border-radius: 20px;
      padding: 10px 20px;
      font-size: 12px;

      &.active,
      &:hover {
        background-color: var(--accent-color);
        color: #000000;
      }
    }
  }

  .filter_sliders {
    flex: 1;
    display: flex;
    gap: 10px;
    justify-content: space-evenly;
    position: relative;
    .filter {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      p {
        width: 50px;
        font-size: 12px;
        border: 1px solid #ffffff05;
        text-align: center;
      }
    }
  }

  .b_t {
    width: 100%;
    height: 50px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0px;
  }
</style>
