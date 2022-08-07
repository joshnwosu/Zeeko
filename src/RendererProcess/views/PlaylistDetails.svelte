<script>
  export let params;
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import StackCard from "../components/Widget/StackCard.svelte";
  import { playlistStore } from "../store";
  let playlist;

  $: (function getPlaylist(payload) {
    playlist = $playlistStore.filter((playlist) => playlist.name == payload)[0];
  })(params.name);
</script>

<main class="page playlist-details" transition:fade>
  <div class="header">
    <StackCard>
      <!--  -->
    </StackCard>
    <div class="details">
      <h1>{params.name}</h1>
      <p>{playlist.tracks.length} Songs</p>
    </div>
  </div>

  <div class="playlist-view">
    {#each playlist.tracks as playlist}
      <p>{playlist.fileLocation}</p>
    {/each}
  </div>
</main>

<style lang="scss">
  .header {
    width: 100%;
    /* height: 250px; */
    background-color: #121212;
    display: flex;
    padding: 50px 20px;
    /* align-items: flex; */
    .details {
      padding: 20px 0;
      h1 {
        font-weight: 200;
      }

      p {
        font-size: 12px;
        margin-top: 10px;
        opacity: 0.6;
      }
    }
  }
</style>
