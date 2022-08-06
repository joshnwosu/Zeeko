<script>
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
  import { playlistStore } from "../store";
</script>

<main class="page" transition:fade>
  <ScreenHeader title="Playlists" />
  <div class="screen-view">
    <!-- <p>Playlists</p> -->
    {#each $playlistStore as playlist}
      <p>{playlist.name}</p>
    {/each}
  </div>
</main>
