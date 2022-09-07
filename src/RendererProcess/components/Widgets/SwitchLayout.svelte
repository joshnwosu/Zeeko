<script>
  export let value;
</script>

<div class="system-wrapper">
  <div>
    <div class="system-label">
      <slot name="title" />
    </div>
    <p class="system-description">
      <slot name="description" />
    </p>
  </div>
  <div class="system-switch">
    <slot name="switch" />
    <span class="system-toggle-label">{value ? "On" : "Off"}</span>
  </div>
</div>

<style lang="scss">
  .system-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;

    .system-description {
      font-size: 12px;
      color: #ffffff50;
      margin-top: 3px;
    }
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
