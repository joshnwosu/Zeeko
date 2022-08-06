<script>
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
  import { playlistStore } from "../store";
</script>

<main class="page" transition:fade>
  <ScreenHeader title={$playlistStore[0].name} />
  <div class="screen-view">
    {#each $playlistStore[0].tracks as tracks}
      <p>{tracks.fileLocation}</p>
    {/each}
  </div>
</main>
