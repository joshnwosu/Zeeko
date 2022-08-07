<script>
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
  import TrackLists from "../components/Track/TrackLists.svelte";
  import { playlistStore } from "../store";
</script>

<main class="page" transition:fade>
  <ScreenHeader title={$playlistStore[0].name} />
  <div class="screen-view">
    <TrackLists tracks={$playlistStore[0].tracks} />
  </div>
</main>
