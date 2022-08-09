<script>
  import { toggleDim } from "../../store/clickFunc";
</script>

<div class="dim" class:show={$toggleDim} />

<style lang="scss">
  .dim {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #00000050;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999999999999;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    &.show {
      opacity: 1;
      visibility: visible;
    }
  }
</style>
