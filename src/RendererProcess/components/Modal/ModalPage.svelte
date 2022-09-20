<script>
  import { toggleModalPage, toggleTransparency } from "../../store/status";
  import { handleGoBack } from "../../store/statusManager";
  import { ArrowLeftTwoIcon } from "../Icons";
  import NowPlaying from "../Root/NowPlaying.svelte";
  import Search from "../Root/Search.svelte";
</script>

<div
  class="modal-page"
  class:show-modal-page={$toggleModalPage != "close"}
  style="background-color: {$toggleTransparency ? '#12121250' : '#121212'}"
>
  <li class="go-back">
    <span class="icon" on:click={handleGoBack}>
      <svelte:component this={ArrowLeftTwoIcon} />
    </span>
  </li>
  <div class="modal-page-content">
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
    transition: 200ms ease;
    backdrop-filter: blur(50px);
    &.show-modal-page {
      visibility: visible;
      opacity: 1;
      .modal-page-content {
        transform: translateY(0);
      }
    }

    .modal-page-content {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99;
      transform: translateY(100%);
      transition: 300ms ease-in-out;
      /* border: 1px solid red; */
      /* padding-top: 60px; */
    }
  }

  .go-back {
    position: absolute;
    display: inline-flex;
    z-index: 999;
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
