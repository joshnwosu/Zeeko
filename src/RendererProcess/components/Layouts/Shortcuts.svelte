<script>
  import Switch from "../Addon/Switch.svelte";
  import StyleLayout from "../Widgets/StyleLayout.svelte";
  import SwitchLayout from "../Widgets/SwitchLayout.svelte";
  let checked = false;
</script>

<div class="shortcuts">
  <!-- <div class="heading">
    <p>Shortcuts</p>
    <div class="heading-wrapper">
      <Switch {checked} toggle={(e) => (checked = e.target.checked)} />
      <span class="label">{checked ? "On" : "Off"}</span>
    </div>
  </div> -->
  <StyleLayout>
    <div slot="style-title">Shortcuts</div>
    <div slot="style-content">
      <SwitchLayout value={checked}>
        <div slot="title">Toggle shortcut</div>
        <div slot="description">
          Activate to use keyboard for quick interatction.
        </div>
        <div slot="switch">
          <Switch {checked} toggle={(e) => (checked = e.target.checked)} />
        </div>
      </SwitchLayout>
    </div>
  </StyleLayout>
</div>

<style lang="scss">
  /* .shortcuts {
    .heading {
      .heading-wrapper {
        display: flex;
      }
    }
  } */
</style>
