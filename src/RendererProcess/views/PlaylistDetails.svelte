<script>
  export let params;
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import BlurImg from "../components/Widget/BlurImg.svelte";
  import Cover from "../components/Widget/Cover.svelte";
  import { playlistStore } from "../store";
  import { getFisrtAlbumArt } from "../store/playbackManager";
  let playlist;

  $: (function getPlaylist(payload) {
    playlist = $playlistStore.filter((playlist) => playlist.name == payload)[0];
  })(params.name);
</script>

<main class="page playlist-details" transition:fade>
  <div class="header">
    <BlurImg img={getFisrtAlbumArt(playlist)} />
    <div class="header-content">
      <Cover img={getFisrtAlbumArt(playlist)} />
      <div class="details">
        <h1>{params.name}</h1>
        <p>{playlist.tracks.length} Songs</p>
      </div>
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
    background-color: #121212;
    position: relative;
    .header-content {
      width: 100%;
      display: flex;
      position: relative;
      padding: 50px 20px;
      z-index: 3;
      .details {
        padding: 20px;
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
  }
</style>
