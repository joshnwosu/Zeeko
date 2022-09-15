<script>
  import {
    accentColorsConfig,
    themesConfig,
    windowStyleConfig,
  } from "../../config/appearance";
  import { toggleTransparency } from "../../store/status";
  import { handleToggleTransparency } from "../../store/statusManager";
  import {
    currentAccentColor,
    currentTheme,
    currentWindowStyle,
  } from "../../store/theme";
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
  $: systemStyle = false;
</script>

<div class="appearance" style="--accent-color: {$currentAccentColor}">
  <StyleLayout>
    <div slot="style-title">Theme</div>
    <div slot="style-content">
      <ThemeLayout
        data={themesConfig}
        selected={$currentTheme.name}
        changeValue={changeTheme}
      />

      <AccentColorLayout {changeAccentColor} {accentColorsConfig} />

      <SwitchLayout value={$toggleTransparency}>
        <div slot="title">Transparency</div>
        <div slot="description">
          When transparency is turned off, background album art will be
          invisible.
        </div>
        <div slot="switch">
          <Switch
            checked={$toggleTransparency}
            toggle={(e) => {
              handleToggleTransparency(e.target.checked);
            }}
          />
        </div>
      </SwitchLayout>
    </div>
  </StyleLayout>

  <StyleLayout>
    <div slot="style-title">Window style</div>
    <div slot="style-content">
      <ThemeLayout
        data={windowStyleConfig}
        selected={$currentWindowStyle.name}
        changeValue={changeWindowStyle}
      />
      <SwitchLayout value={systemStyle}>
        <div slot="title">Default style</div>
        <div slot="description">Use default system style.</div>
        <div slot="switch">
          <Switch
            checked={systemStyle}
            toggle={(e) => (systemStyle = e.target.checked)}
          />
        </div>
      </SwitchLayout>
    </div>
  </StyleLayout>
</div>
