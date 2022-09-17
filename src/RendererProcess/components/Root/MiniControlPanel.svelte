<script>
  import { toggleControlStyle } from "../../store/status";
</script>

<div class="mini-control" class:hide={!$toggleControlStyle}>
  <p>Mini controller</p>
</div>

<style lang="scss">
  .mini-control {
    width: 280px;
    height: 200px;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #333333;
    transform: translateY(0px);
    transition: 300ms ease-in-out;
    z-index: 999;
    &.hide {
      transform: translateY(300px);
    }
  }
</style>
