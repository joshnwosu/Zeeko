<script>
  import { toggleEqualizer } from "../../../store/status";
  import { EqualizerManager } from "../../../store/player";

  function loadPreset(preset) {
    console.log("Preset: ", preset);
  }
</script>

<div class="equalizer" class:open={$toggleEqualizer}>
  <h1>Equalizer</h1>
  <div class="presets">
    {#each $EqualizerManager.equalizerPresets as preset}
      <button on:click={() => loadPreset(preset)}>{preset.name}</button>
    {/each}
  </div>
</div>

<style lang="scss">
  .equalizer {
    width: 400px;
    height: calc(100% - 100px);
    position: fixed;
    right: 60px;
    top: 0;
    bottom: 0;
    background-color: #12121280;
    z-index: 99;
    backdrop-filter: blur(20px);
    transform: translateY(100%);
    transition: 200ms ease;
    padding: 50px;
    &.open {
      transform: translateY(0);
    }
  }
</style>
