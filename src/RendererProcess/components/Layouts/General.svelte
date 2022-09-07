<script>
  import isElectron from "../../../../isElectron";

  import Switch from "../Addon/Switch.svelte";
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

  <!-- <h2>First panel</h2>
  <p>{checked1} {checked2}</p>
  <Switch checked={checked1} toggle={(e) => (checked1 = e.target.checked)} />
  <Switch checked={checked2} toggle={(e) => (checked2 = e.target.checked)} /> -->

  <div class="style">
    <div class="style-title">Style</div>
    <div class="style-content">
      <div class="system-wrapper">
        <div>
          <div class="system-label">Transparency</div>
          <p class="system-description">
            When transparency is turned off, background album art will be
            invisible.
          </p>
        </div>
        <div class="system-switch">
          <Switch
            checked={checked1}
            toggle={(e) => (checked1 = e.target.checked)}
          />
          <span class="system-toggle-label">{checked1 ? "On" : "Off"}</span>
        </div>
      </div>
      <div class="system-wrapper">
        <div>
          <div class="system-label">Animation</div>
          <p class="system-description">Set transition for cool effect.</p>
        </div>
        <div class="system-switch">
          <Switch
            checked={checked2}
            toggle={(e) => (checked2 = e.target.checked)}
          />
          <span class="system-toggle-label">{checked2 ? "On" : "Off"}</span>
        </div>
      </div>
    </div>
  </div>
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
