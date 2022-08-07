<script>
  import { push } from "svelte-spa-router";
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import PlaylistCaption from "../components/Playlist/PlaylistCaption.svelte";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
  import PlaylistCover from "../components/Widget/PlaylistCover.svelte";
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
          <PlaylistCover img={getFisrtAlbumArt(playlist)} />
          <figcaption>
            <PlaylistCaption
              name={playlist.name}
              length={playlist.tracks.length}
              fontSize={14}
            />
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
    figcaption {
      padding-left: 5px;
      margin-top: 10px;
    }
  }
</style>
