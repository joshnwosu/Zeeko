<script>
  import isElectron from "../../../../isElectron";
  import { handleToggleEqualizer } from "../../store/statusManager";

  import Switch from "../Addon/Switch.svelte";
  import StyleLayout from "../Widgets/StyleLayout.svelte";
  import SwitchLayout from "../Widgets/SwitchLayout.svelte";
  let checked3 = false;

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

  <StyleLayout>
    <div slot="style-title">Track configuration</div>
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
