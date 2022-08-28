<script>
  import { toggleEqualizer } from "../../../store/status";
  import { EqualizerManager } from "../../../store/player";
  import FilterSlider from "./FilterSlider.svelte";
  import {
    updateBandFilter,
    loadPreset,
    changeBandGains,
  } from "../../../store/playerManager";
</script>

<div class="equalizer" class:open={$toggleEqualizer}>
  <h1>Equalizer</h1>
  <div class="presets">
    {#each $EqualizerManager.equalizerPresets as preset}
      <button
        on:click={() => loadPreset(preset)}
        class:active={$EqualizerManager.currentPreset == preset.name}
        >{preset.name}</button
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
          on:rangeUpdated={(event) => updateBandFilter(event.detail)}
        />
        <p>{band.frequency}</p>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .equalizer {
    height: calc(100% - 100px);
    position: fixed;
    right: 60px;
    top: 0;
    bottom: 0;
    background-color: #00000080;
    z-index: 99;
    backdrop-filter: blur(20px);
    transform: translateY(100%);
    transition: 200ms ease-in-out;
    padding: 50px;
    opacity: 0;
    visibility: hidden;
    box-sizing: border-box;
    &.open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }

  .presets {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    button {
      border: none;
      background-color: #ffffff05;
      color: #ffffff;
      border-radius: 20px;
      padding: 10px 20px;
      font-size: 12px;
      &.active,
      &:hover {
        background-color: #65e14d;
        color: #000000;
      }
    }
  }

  .filter_sliders {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    justify-content: space-evenly;
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
</style>
