<script>
  import { queuelistStore } from "../../store/player";
  import { toggleNowPlaying } from "../../store/status";
  import TrackLists from "../Track/TrackLists.svelte";
  import GlassBg from "../Widgets/GlassBG.svelte";
</script>

<div class="now-playing" class:show-now-playing={$toggleNowPlaying}>
  <GlassBg>
    <!-- {#if $toggleNowPlaying}
    <TrackLists tracks={$queuelistStore} />
  {/if} -->
  </GlassBg>
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
  }
</style>
