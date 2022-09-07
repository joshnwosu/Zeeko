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
  import AccentColorLayout from "../Widgets/AccentColorLayout.svelte";
  import StyleLayout from "../Widgets/StyleLayout.svelte";
  import SwitchLayout from "../Widgets/SwitchLayout.svelte";
  import ThemeLayout from "../Widgets/ThemeLayout.svelte";
  let isAnimate = false;
  let isTransparent = false;
</script>

<div class="appearance" style="--accent-color: {$currentAccentColor}">
  <StyleLayout>
    <div slot="style-title">Style</div>
    <div slot="style-content">
      <ThemeLayout data={themesConfig} changeValue={changeTheme} />

      <AccentColorLayout {changeAccentColor} {accentColorsConfig} />

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
  </StyleLayout>

  <StyleLayout>
    <div slot="style-title">Window style</div>
    <div slot="style-content">
      <ThemeLayout data={windowStyleConfig} changeValue={changeWindowStyle} />
    </div>
  </StyleLayout>
</div>
