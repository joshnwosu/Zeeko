<script>
  import ActionButton from "./ActionButton.svelte";
</script>

<div class="frame">
  <div class="left" />

  <div class="right">
    <ActionButton />
  </div>
</div>

<style lang="scss">
  .frame {
    width: calc(100% - 60px);
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0;
    right: 0;
    top: 0;
    padding-right: 60px;
    -webkit-app-region: drag;
    position: fixed;
    z-index: 99999999;
    background-color: transparent;
    .left,
    .right {
      -webkit-app-region: no-drag;
    }
    /* .right {
      background-color: #000000;
    } */
  }
</style>
