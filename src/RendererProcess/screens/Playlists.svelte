<script>
  import { push } from "svelte-spa-router";
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
  import Cover from "../components/Widget/Cover.svelte";
  import { playlistStore } from "../store";
  import { getFisrtAlbumArt } from "../store/playbackManager";
</script>

<main class="page" transition:fade>
  <ScreenHeader title="Playlists" />
  <div class="screen-view">
    {#each $playlistStore as playlist}
      <div
        class="playlist-card"
        on:click={() => push(`/playlist-details/${playlist.name}`)}
      >
        <figure>
          <Cover img={getFisrtAlbumArt(playlist)} />
          <figcaption class="label">
            <p class="name">{playlist.name}</p>
            <p class="length">{playlist.tracks.length} Songs</p>
          </figcaption>
        </figure>
      </div>
    {/each}
  </div>
</main>

<style lang="scss">
  .screen-view {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
  }
  .playlist-card {
    margin-bottom: 50px;
    margin-right: 20px;
    .label {
      padding-left: 5px;
      margin-top: 10px;
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
