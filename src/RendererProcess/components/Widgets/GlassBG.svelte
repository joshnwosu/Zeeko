<script>
  import { toggleTransparency } from "../../store/status";
</script>

<div
  class="glass-bg"
  style="background-color: {$toggleTransparency ? '#12121250' : '#121212'}"
/>

<style lang="scss">
  .glass-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    backdrop-filter: blur(50px);
    z-index: 0;
  }
</style>
