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
  import AccentColor from "../Widgets/AccentColor.svelte";
  import SwitchLayout from "../Widgets/SwitchLayout.svelte";
  let isAnimate = false;
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
      <AccentColor {changeAccentColor} {accentColorsConfig} />

      <SwitchLayout value={isTransparent}>
        <div slot="title">Transparency</div>
        <div slot="description">
          When transparency is turned off, background album art will be
          invisible.
        </div>
        <div slot="switch">
          <Switch
            checked={isTransparent}
            toggle={(e) => (isTransparent = e.target.checked)}
          />
        </div>
      </SwitchLayout>

      <SwitchLayout value={isAnimate}>
        <div slot="title">Animation</div>
        <div slot="description">Set transition for cool effect.</div>
        <div slot="switch">
          <Switch
            checked={isAnimate}
            toggle={(e) => (isAnimate = e.target.checked)}
          />
        </div>
      </SwitchLayout>
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
</style>
