<script>
  import { accentColorsConfig } from "../../config/accentColors";
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
  </div>

  <div class="system">
    <p>Use system preference</p>
    <Switch checked={checked1} toggle={(e) => (checked1 = e.target.checked)} />
  </div>
</div>

<style lang="scss">
  .appearance {
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
          margin-right: 10px;
        }
      }
    }
  }
</style>
