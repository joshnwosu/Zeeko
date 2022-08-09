<script>
  import { queuelistStore } from "../../store";
  import { toggleNowPlaying } from "../../store/status";
  import TrackLists from "../Track/TrackLists.svelte";
</script>

<div class="now-playing" class:show-now-playing={$toggleNowPlaying}>
  <!-- {#if $toggleNowPlaying}
    <TrackLists tracks={$queuelistStore} />
  {/if} -->
</div>

<style lang="scss">
  .now-playing {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #00000080;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    visibility: hidden;
    opacity: 0;
    transform: translateY(50%);
    transition: 0.2s ease;
    backdrop-filter: blur(100px);
    padding: 60px 20px;
    overflow-y: auto;
    &.show-now-playing {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
