<script>
  import { toggleModal } from "../../store/status";
  import { handleToggleEqualizer } from "../../store/statusManager";

  import Switch from "../Addon/Switch.svelte";
  import StyleLayout from "../Widgets/StyleLayout.svelte";
  import SwitchLayout from "../Widgets/SwitchLayout.svelte";
  let checked3 = false;
  let checked4 = false;
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
    <div slot="style-title">Track setting</div>
    <div slot="style-content">
      <SwitchLayout value={checked3}>
        <div slot="title">Track index</div>
        <div slot="description">Display track index number</div>
        <div slot="switch">
          <Switch
            checked={checked3}
            toggle={(e) => (checked3 = e.target.checked)}
          />
        </div>
      </SwitchLayout>
      <SwitchLayout value={checked4}>
        <div slot="title">Tag</div>
        <div slot="description">Display track in tag style</div>
        <div slot="switch">
          <Switch
            checked={checked4}
            toggle={(e) => (checked4 = e.target.checked)}
          />
        </div>
      </SwitchLayout>
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
