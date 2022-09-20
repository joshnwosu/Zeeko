<script>
  import { toggleModalPage } from "../../store/status";
  import { handleNavigation } from "../../store/statusManager";
  import { ArrowLeftTwoIcon } from "../Icons";
  import NowPlaying from "../Root/NowPlaying.svelte";
  import Search from "../Root/Search.svelte";
  import GlassBg from "../Widgets/GlassBG.svelte";
</script>

<div class="modal-page" class:show-modal-page={$toggleModalPage != "close"}>
  <GlassBg />

  <div class="modal-page-content">
    <li class="go-back">
      <span class="icon" on:click={handleNavigation}>
        <svelte:component this={ArrowLeftTwoIcon} />
      </span>
    </li>
    {#if $toggleModalPage == "now-playing"}
      <NowPlaying />
    {:else if $toggleModalPage == "search"}
      <Search />
    {/if}
  </div>
</div>

<style lang="scss">
  .modal-page {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    visibility: hidden;
    opacity: 0;
    &.show-modal-page {
      visibility: visible;
      opacity: 1;
    }

    .modal-page-content {
      position: relative;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99;
    }
  }

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
</style>
