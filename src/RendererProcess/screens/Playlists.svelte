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
      <div class="playlist-card">
        <div class="cover" />
        <div class="label">
          <p class="name">{playlist.name}</p>
          <p class="length">{playlist.tracks.length} Songs</p>
        </div>
      </div>
    {/each}
  </div>
</main>

<style lang="scss">
  .screen-view {
    display: flex;
  }
  .playlist-card {
    margin-right: 10px;
    .cover {
      width: 250px;
      height: 180px;
      background-color: #121212;

      padding: 20px;
    }
    .label {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px 0 0;

      p {
        font-size: 14px;
        &.name {
          opacity: 1;
          font-weight: 400;
        }
        &.length {
          opacity: 0.6;
          font-size: 10px;
        }
      }
    }
  }
</style>
