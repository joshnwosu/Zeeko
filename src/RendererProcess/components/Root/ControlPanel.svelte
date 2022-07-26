<script>
  import { PlayIcon, PauseIcon } from "../../components/Icons";
</script>

<div class="control-panel">
  <svelte:component this={PlayIcon} />
  <svelte:component this={PauseIcon} />
</div>

<style>
  .control-panel {
    position: fixed;
    /* border: 1px solid green; */
    width: 100vw;
    height: 80px;
    bottom: 0;
    background-color: rgba(17, 17, 17, 0.9);
    backdrop-filter: blur(50px);
    z-index: 1000;
  }
</style>
