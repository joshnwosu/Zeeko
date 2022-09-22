<script>
  import {
    toggleModal,
    toggleTrackIndex,
    toggleTrackStyle,
  } from "../../store/status";
  import {
    handleToggleEqualizer,
    handleToggleTrackIndex,
    handleToggleTrackStyle,
  } from "../../store/statusManager";

  import Switch from "../Addon/Switch.svelte";
  import StyleLayout from "../Widgets/StyleLayout.svelte";
  import SwitchLayout from "../Widgets/SwitchLayout.svelte";
</script>

<div>
  <div class="music-select">
    <h1>Music on this PC</h1>
    <p on:click={() => toggleModal.set("add-music")}>
      Choose where we look for music
    </p>
  </div>

  <div class="music-select">
    <h1>Equalizer</h1>
    <p on:click={handleToggleEqualizer}>Open equalizer</p>
  </div>

  <StyleLayout>
    <div slot="style-title">Track configuration</div>
    <div slot="style-content">
      <SwitchLayout value={$toggleTrackStyle}>
        <div slot="title">Change track style</div>
        <div slot="description">Display tracks in tag style</div>
        <div slot="switch">
          <Switch
            checked={$toggleTrackStyle}
            toggle={(e) => handleToggleTrackStyle(e.target.checked)}
          />
        </div>
      </SwitchLayout>
      <!-- {#if $toggleTrackStyle} -->
      <SwitchLayout value={$toggleTrackIndex}>
        <div slot="title">Track tag index</div>
        <div slot="description">Show track tag index number</div>
        <div slot="switch">
          <Switch
            checked={$toggleTrackIndex}
            toggle={(e) => handleToggleTrackIndex(e.target.checked)}
          />
        </div>
      </SwitchLayout>
      <!-- {/if} -->
    </div>
  </StyleLayout>
</div>

<style lang="scss">
  .music-select {
    margin-bottom: 20px;
    p {
      font-size: 14px;
      color: #ffffff40;
      padding: 10px 0;
      display: inline-block;
      &:hover {
        color: #ffffff80;
      }
    }
  }
</style>
