<script>
  import { toggleTransparency } from "../../store/status";
  import { handleNavigation } from "../../store/statusManager";
  import { ArrowLeftTwoIcon } from "../Icons";
</script>

<div
  class="glass-bg"
  style="background-color: {$toggleTransparency ? '#12121280' : '#121212'}"
>
  <li class="go-back">
    <span class="icon" on:click={handleNavigation}>
      <svelte:component this={ArrowLeftTwoIcon} />
    </span>
  </li>
  <slot />
</div>

<style lang="scss">
  .glass-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #00000080;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(100px);
    overflow-y: auto;

    .go-back {
      display: inline-flex;
      .icon {
        width: 60px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: default;
        &:hover {
          background-color: #ffffff10;
        }
        :global(svg) {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
</style>
