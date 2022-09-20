<script>
  import {
    accentColorsConfig,
    themesConfig,
    windowStyleConfig,
  } from "../../config/appearance";
  import {
    toggleControlStyle,
    toggleDim,
    toggleTransparency,
    toggleWindowSystemStyle,
  } from "../../store/status";
  import {
    handleToggleControlStyle,
    handleToggleDimMode,
    handleToggleTransparency,
    handleToggleWindowSystemStyle,
  } from "../../store/statusManager";
  import { currentTheme, currentWindowStyle } from "../../store/theme";
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
</script>

<div class="appearance">
  <StyleLayout>
    <div slot="style-title">Layout style</div>
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

      <SwitchLayout value={$toggleDim}>
        <div slot="title">Dim mode</div>
        <div slot="description">Low light mode. Reduce player brightness</div>
        <div slot="switch">
          <Switch
            checked={$toggleDim}
            toggle={(e) => {
              handleToggleDimMode(e.target.checked);
            }}
          />
        </div>
      </SwitchLayout>
      <SwitchLayout value={$toggleControlStyle}>
        <div slot="title">Mini control</div>
        <div slot="description">Turn on to switch to mini control player</div>
        <div slot="switch">
          <Switch
            checked={$toggleControlStyle}
            toggle={(e) => {
              handleToggleControlStyle(e.target.checked);
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
      <SwitchLayout value={$toggleWindowSystemStyle}>
        <div slot="title">Use sytem style</div>
        <div slot="description">Turn on to automatically use system style.</div>
        <div slot="switch">
          <Switch
            checked={$toggleWindowSystemStyle}
            toggle={(e) => {
              handleToggleWindowSystemStyle(e.target.checked);
            }}
          />
        </div>
      </SwitchLayout>
    </div>
  </StyleLayout>
</div>
