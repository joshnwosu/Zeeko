<script>
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
  import { playlistStore } from "../store";
  // let albumArt = '';

  function getFisrtAlbumArt(playlist) {
    let v;
    playlist.tracks.some((track) => (v = track.albumArt));
    return v;
  }

  // $: $playlistStore.forEach(playlist => playlist.tracks.some(s => {
  //   albumArt = s
  // }))
</script>

<main class="page" transition:fade>
  <ScreenHeader title="Playlists" />
  <div class="screen-view">
    {#each $playlistStore as playlist}
      <div class="playlist-card">
        <div class="cover">
          {#if getFisrtAlbumArt(playlist)}
            <img src={getFisrtAlbumArt(playlist)} alt={`album-art`} />
          {/if}
        </div>
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

      /* padding: 20px; */
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
    .label {
      margin-top: 10px;
      padding: 0 10px 0 10px;

      p {
        font-size: 14px;
        margin-bottom: 5px;
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
