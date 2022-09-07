<script>
  import isElectron from "../../../../isElectron";
  import { handleToggleEqualizer } from "../../store/statusManager";

  import Switch from "../Addon/Switch.svelte";
  import SeperatorLayout from "../Widgets/SeperatorLayout.svelte";
  import StyleLayout from "../Widgets/StyleLayout.svelte";
  import SwitchLayout from "../Widgets/SwitchLayout.svelte";
  let checked1 = false;
  let checked2 = false;

  const pickFolder = () => {
    if (isElectron()) {
      window?.api?.media("addScanFolder");
    } else {
      console.log("Opening Browser Dialog...");
      // browserFile.click();
      getDir();
    }
  };

  async function getDir() {
    const dirHandle = await window?.showDirectoryPicker();
    // run code for dirHandle
    console.log("Browser Dir HERE: ", dirHandle);
  }
</script>

<div>
  <div class="music-select">
    <h1>Music on this PC</h1>
    <p on:click={pickFolder}>Choose where we look for music</p>
  </div>

  <div class="music-select">
    <h1>Equalizer</h1>
    <p on:click={handleToggleEqualizer}>Open equalizer</p>
  </div>

  <!-- <h2>First panel</h2>
  <p>{checked1} {checked2}</p>
  <Switch checked={checked1} toggle={(e) => (checked1 = e.target.checked)} />
  <Switch checked={checked2} toggle={(e) => (checked2 = e.target.checked)} /> -->

  <StyleLayout>
    <div slot="style-title">Display artist art</div>
    <div slot="style-content">
      <SwitchLayout value={checked1}>
        <div slot="title">Background art</div>
        <div slot="description">Set now playing artist art as background.</div>
        <div slot="switch">
          <Switch
            checked={checked1}
            toggle={(e) => (checked1 = e.target.checked)}
          />
        </div>
      </SwitchLayout>
      <SeperatorLayout />
      <SwitchLayout value={checked2}>
        <div slot="title">Transparency</div>
        <div slot="description">
          When transparency is turned off, background art will be invisible.
        </div>
        <div slot="switch">
          <Switch
            checked={checked2}
            toggle={(e) => (checked2 = e.target.checked)}
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
