<script>
  export let params;
  import PlaylistView from "../components/Playlist/PlaylistView.svelte";
  import TrackLists from "../components/Track/TrackLists.svelte";
  import { albumsStore } from "../store/player";
  import { getFirstAlbumArt } from "../store/playerManager";
  import { defaultCoverArt } from "../utilities";
  $: albumData =
    $albumsStore.filter((album) => album.name == params.name)[0] || [];
</script>

<main class="page">
  {#if $albumsStore.length}
    <div class="header">
      <div class="figure">
        <img
          src={getFirstAlbumArt(albumData?.tracks) || defaultCoverArt}
          alt="album"
        />
      </div>
      <div class="header-right">
        <div class="text">
          <h1>{params.name}</h1>
          <p>Tracks &#x2022; {albumData?.tracks.length}</p>
        </div>
      </div>
    </div>

    {#if albumData?.tracks}
      <PlaylistView>
        <TrackLists tracks={albumData?.tracks} />
      </PlaylistView>
    {/if}
  {/if}
</main>

<style lang="scss">
  .header {
    height: 150px;
    background-color: #121212;
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 0 20px;
    .figure {
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #121212;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    .header-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .text {
        p {
          font-size: 12px;
        }
      }
    }
  }
</style>
