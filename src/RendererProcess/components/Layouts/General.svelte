<script>
  import isElectron from "../../../../isElectron";
  import { handleToggleEqualizer } from "../../store/statusManager";

  import Switch from "../Addon/Switch.svelte";
  import StyleLayout from "../Widgets/StyleLayout.svelte";
  import SwitchLayout from "../Widgets/SwitchLayout.svelte";
  let checked1 = false;
  let checked2 = false;
  let checked3 = false;
  let checked4 = false;
  let checked5 = false;
  let checked6 = false;

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

  <!-- <StyleLayout>
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
  </StyleLayout> -->

  <StyleLayout>
    <div slot="style-title">Queue</div>
    <div slot="style-content">
      <SwitchLayout value={checked5}>
        <div slot="title">Current playing track</div>
        <div slot="description">
          Automatically scroll to current playing track index
        </div>
        <div slot="switch">
          <Switch
            checked={checked5}
            toggle={(e) => (checked5 = e.target.checked)}
          />
        </div>
      </SwitchLayout>
    </div>
  </StyleLayout>

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
      <SwitchLayout value={checked4}>
        <div slot="title">Artist name</div>
        <div slot="description">
          Turn on to show artist name along side song title
        </div>
        <div slot="switch">
          <Switch
            checked={checked4}
            toggle={(e) => (checked4 = e.target.checked)}
          />
        </div>
      </SwitchLayout>
      <SwitchLayout value={checked6}>
        <div slot="title">Album name</div>
        <div slot="description">
          Turn on to show album name along side song title
        </div>
        <div slot="switch">
          <Switch
            checked={checked6}
            toggle={(e) => (checked6 = e.target.checked)}
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
