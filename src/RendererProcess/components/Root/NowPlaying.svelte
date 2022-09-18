<script>
  import { queuelistStore } from "../../store/player";
  import { toggleNowPlaying } from "../../store/status";
  import { handleNavigation } from "../../store/statusManager";
  import { ArrowLeftTwoIcon } from "../Icons";
  import TrackLists from "../Track/TrackLists.svelte";
  import GlassBg from "../Widgets/GlassBG.svelte";
</script>

<div class="now-playing" class:show-now-playing={$toggleNowPlaying}>
  <GlassBg />

  <div class="now-playing-content">
    <li class="go-back">
      <span class="icon" on:click={handleNavigation}>
        <svelte:component this={ArrowLeftTwoIcon} />
      </span>
    </li>
    <!-- {#if $toggleNowPlaying}
      <TrackLists tracks={$queuelistStore} />
    {/if} -->
  </div>
</div>

<style lang="scss">
  .now-playing {
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
    &.show-now-playing {
      visibility: visible;
      opacity: 1;
    }

    .now-playing-content {
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
