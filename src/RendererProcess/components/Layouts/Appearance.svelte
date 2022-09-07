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
  let isTransparent = false;
</script>

<div class="appearance" style="--accent-color: {$currentAccentColor}">
  <div class="style">
    <div class="style-title">Style</div>
    <div class="style-content">
      <div class="theme">
        {#each themesConfig as theme}
          <div class="theme-color" on:click={() => changeTheme(theme.name)}>
            <div class="theme-img theme-{theme.name}" />
            <p>{theme.name}</p>
          </div>
        {/each}
      </div>
      <div class="color">
        <div class="color-label">Accents</div>
        <div class="accent-colors">
          {#each accentColorsConfig as color, index}
            <div class="accent-color" on:click={() => changeAccentColor(index)}>
              <span class="ring" class:active={$currentAccentColor == color} />
              <span style="background-color: {color}" class="shade" />
            </div>
          {/each}
        </div>
      </div>
      <div class="system-wrapper">
        <div class="system-label">Transparency</div>
        <div class="system-switch">
          <Switch
            checked={isTransparent}
            toggle={(e) => (isTransparent = e.target.checked)}
          />
          <span class="system-toggle-label">{isTransparent ? "On" : "Off"}</span
          >
        </div>
      </div>
    </div>
  </div>

  <div class="style">
    <div class="style-title">Window style</div>
    <div class="style-content">
      <div class="theme">
        {#each windowStyleConfig as style, index}
          <div class="theme-color" on:click={() => changeWindowStyle(index)}>
            <div class="theme-img theme-dark" />
            <p>{style.name}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .appearance {
    width: 700px;
  }
  .style {
    margin-bottom: 20px;
    .style-title {
      font-size: 16px;
      font-weight: 400;
      padding: 10px;
    }
    .style-content {
      border: 1px solid #222222;
      background-color: #121212;
      border-radius: 10px;
    }
  }

  .theme {
    display: flex;
    /* border: 1px solid red; */
    gap: 20px;
    justify-content: space-between;
    padding: 20px;
    .theme-color {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .theme-img {
        width: 100%;
        height: 130px;
        background-color: #33333350;
        border-radius: 10px;
        border-top: 1px solid #222222;
        &.theme-Dark {
          background-color: #222222;
        }
        &.theme-Light {
          background-color: #eeeeee;
        }
        &.theme-Amoled {
          background-color: #000000;
        }
      }

      p {
        font-size: 14px;
        font-weight: 400;
        margin-top: 10px;
      }
    }
  }

  .color {
    border: 1px solid #12121250;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .color-label {
      font-size: 16px;
      font-weight: 400;
    }
    .accent-colors {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .accent-color {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: relative;
        /* margin-right: 10px; */
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
      .shade {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .system-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    border-top: 1px solid #222222;
    .system-switch {
      display: flex;
      align-items: center;
      .system-toggle-label {
        display: block;
        width: 30px;
        font-size: 12px;
        font-weight: 400;
        text-transform: uppercase;
        text-align: right;
      }
    }
  }
</style>
