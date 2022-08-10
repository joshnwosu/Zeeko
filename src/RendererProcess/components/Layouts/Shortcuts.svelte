<script>
  import Switch from "../Addon/Switch.svelte";
  let checked = false;
</script>

<div class="shortcuts">
  <div class="heading">
    <p>Shortcuts</p>
    <div class="heading-wrapper">
      <Switch {checked} toggle={(e) => (checked = e.target.checked)} />
      <span class="label">{checked ? "On" : "Off"}</span>
    </div>
  </div>
</div>

<style lang="scss">
  .shortcuts {
    .heading {
      .heading-wrapper {
        display: flex;
      }
    }
  }
</style>
