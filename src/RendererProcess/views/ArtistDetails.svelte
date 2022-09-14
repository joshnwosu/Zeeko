<script>
  export let params;
  import { UserIcon } from "../components/Icons";
  import PlaylistView from "../components/Playlist/PlaylistView.svelte";
  import TrackLists from "../components/Track/TrackLists.svelte";
  import TrackListTag from "../components/Track/TrackListTag.svelte";
  import AlbumCard from "../components/Widgets/AlbumCard.svelte";
  import { artistsStore } from "../store/player";
  $: artistData =
    $artistsStore.filter((artist) => artist.name == params.name)[0] || [];
</script>

<main class="page">
  {#if $artistsStore.length}
    <div class="header">
      <div class="figure">
        <svelte:component this={UserIcon} />
      </div>
      <div class="header-right">
        <div class="text">
          <h1>{params.name}</h1>
          <p>Albums &#x2022; {artistData?.albums.length}</p>
          <p>Tracks &#x2022; {artistData?.tracks.length}</p>
        </div>
      </div>
    </div>

    <h1 class="title">Albums</h1>
    <div class="container">
      <div class="flex-content">
        {#if artistData?.albums}
          <AlbumCard data={artistData?.albums} />
        {/if}
      </div>
    </div>

    <h1 class="title">Tracks</h1>
    {#if artistData?.tracks}
      <PlaylistView>
        <!-- <TrackLists tracks={artistData?.tracks} /> -->
        <TrackListTag tracks={artistData?.tracks} />
      </PlaylistView>
    {/if}
  {/if}
</main>

<style lang="scss">
  .page {
    h1.title {
      font-size: 18px;
      font-weight: 200;
      color: #ffffff;
      padding: 20px;
      position: sticky;
      top: 150px;
      z-index: 99;
      background-color: #000000;
    }
  }
  .container {
    width: 100%;
    display: flex;
    overflow-x: auto;
    padding: 0 20px;
    .flex-content {
      display: flex;
      overflow-x: auto;
      flex-shrink: 0;
      gap: 10px;
      align-items: flex-start;
    }
  }

  .header {
    height: 150px;
    background-color: #121212;
    position: sticky;
    top: 0;
    z-index: 99;
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
      background-color: #000000;
      border-radius: 50%;

      :global(svg) {
        width: 50px;
        height: 50px;
        opacity: 0.5;
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
