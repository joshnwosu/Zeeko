<script>
  import { toggleControlStyle } from "../../store/status";
</script>

<div
  class="screen-view"
  style="padding-bottom: {$toggleControlStyle ? '0px' : '100px'}"
>
  <slot />
</div>

<style lang="scss">
  :global(.screen-view) {
    padding: 0px 20px 100px 20px;
    transition: 300ms ease-in-out;
  }
</style>
