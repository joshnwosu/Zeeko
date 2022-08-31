<script>
  import {
    accentColorsConfig,
    themesConfig,
    windowStyleConfig,
  } from "../../config/appearance";
  import { currentAccentColor } from "../../store/theme";
  import {
    changeAccentColor,
    changeTheme,
    changeWindowStyle,
  } from "../../store/themeManager";
  import Switch from "../Addon/Switch.svelte";
  let checked1 = false;
</script>

<div class="appearance" style="--accent-color: {$currentAccentColor}">
  <div class="section accent-color-section">
    <h1>Choose your accent color</h1>
    <div class="accent-colors">
      {#each accentColorsConfig as color, index}
        <div class="accent-color" on:click={() => changeAccentColor(index)}>
          <span class="ring" class:active={$currentAccentColor == color} />
          <span style="background-color: {color}" class="color" />
        </div>
      {/each}
    </div>
  </div>

  <div class="section theme-section">
    <h1>Choose your theme</h1>
    <div class="flex theme-wrapper">
      {#each themesConfig as theme}
        <div class="flex-item theme" on:click={() => changeTheme(theme.name)}>
          <div class="box" />
          <p>{theme.name}</p>
        </div>
      {/each}
    </div>
  </div>

  <div class="section window-style-section">
    <h1>Choose window style</h1>
    <div class="flex window-style-wrapper">
      {#each windowStyleConfig as style, index}
        <div
          class="flex-item window-style"
          on:click={() => changeWindowStyle(index)}
        >
          <div class="box" />
          <p>{style.name}</p>
        </div>
      {/each}
    </div>
  </div>

  <div class="section system-section">
    <p>Use system preference</p>
    <!-- <h1>Use system preference</h1> -->
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
      padding: 10px 0;
      margin-bottom: 10px;
      h1 {
        font-weight: 400;
        font-size: 18px;
        margin-bottom: 10px;
      }

      .flex {
        display: flex;
        .flex-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 10px;
          .box {
            width: 180px;
            height: 120px;
            background-color: #121212;
            border-radius: 10px;
            box-shadow: 0px 2px 2px 0 rgba(0, 0, 0, 0.1);
          }

          p {
            margin-top: 10px;
            font-size: 14px;
          }
        }
      }
    }

    .accent-color-section {
      .accent-colors {
        display: flex;
        align-items: center;

        .accent-color {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          position: relative;
          margin-right: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: nowrap;
          z-index: 0;
        }

        .ring {
          width: 50px;
          height: 50px;
          border: 3px solid transparent;
          border-radius: 50%;
          transition: all 200ms linear;
          position: absolute;
          transform: scale(0);
          &.active {
            border-color: var(--accent-color);
            transform: scale(1);
          }
        }
        .color {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .system-section {
      p {
        font-size: 16px;
        font-weight: 300;
      }
      .system-wrapper {
        display: flex;
        align-items: center;
        margin-top: 10px;
        .label {
          font-size: 12px;
          margin-left: 10px;
        }
      }
    }
  }
</style>
