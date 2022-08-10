<script>
  import {
    accentColorsConfig,
    themesConfig,
    windowStyleConfig,
  } from "../../config/appearance";
  import Switch from "../Addon/Switch.svelte";
  let checked1 = false;
</script>

<div class="appearance">
  <div class="section accent-color-section">
    <h1>Choose your accent color</h1>
    <div class="accent-color">
      {#each accentColorsConfig as color}
        <span style="background-color: {color}" class="color" />
      {/each}
    </div>
  </div>

  <div class="section theme-section">
    <h1>Choose your theme</h1>
    <div class="theme-wrapper">
      {#each themesConfig as theme}
        <div class="theme">
          <div />
          <p>{theme.name}</p>
        </div>
      {/each}
    </div>
  </div>

  <div class="section window-style-section">
    <h1>Choose window style</h1>
    <div class="window-style-wrapper">
      {#each windowStyleConfig as style}
        <div class="window-style">
          <div />
          <p>{style.name}</p>
        </div>
      {/each}
    </div>
  </div>

  <div class="section system-section">
    <p>Use system preference</p>
    <div class="system-wrapper">
      <Switch
        checked={checked1}
        toggle={(e) => (checked1 = e.target.checked)}
      />
      <span class="label">{checked1 ? "On" : "Off"}</span>
    </div>
  </div>
</div>

<style lang="scss">
  .appearance {
    width: 900px;
    .section {
      h1 {
        font-weight: 400;
        font-size: 18px;
      }

      .accent-color {
        display: flex;
        align-items: center;
        .color {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 5px;
        }
      }
    }

    .system-section {
      .system-wrapper {
        display: flex;
        align-items: center;
      }
    }
  }
</style>
