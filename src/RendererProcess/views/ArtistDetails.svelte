<script>
  export let params;
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import PlaylistHeader from "../components/Playlist/PlaylistHeader.svelte";
  import PlaylistView from "../components/Playlist/PlaylistView.svelte";
  import TrackLists from "../components/Track/TrackLists.svelte";
  import { artistsStore } from "../store/player";
  import { defaultCoverArt } from "../utilities";
  $: artistData =
    $artistsStore.filter((artist) => artist.name == params.name)[0] || [];

  $: console.log("Artist: ", artistData);
</script>

<main class="page" transition:fade>
  {#if $artistsStore.length}
    <div class="header">
      <h1>{params.name}</h1>
    </div>

    <h1 class="title">Albums</h1>
    <div class="container">
      <div class="flex-content">
        {#if artistData?.albums}
          {#each artistData?.albums as item}
            <div class="card">
              <img
                src={item?.tracks[0]?.albumArt || defaultCoverArt}
                alt="album"
              />
              <div class="content">
                <p class="name">{item.name}</p>
                <p class="artist">{item.artist}</p>
              </div>
            </div>
          {/each}
        {/if}
      </div>
    </div>

    <h1 class="title">Tracks</h1>
    {#if artistData?.tracks}
      <TrackLists tracks={artistData?.tracks} />
    {/if}
  {/if}
</main>

<style lang="scss">
  .page {
    h1.title {
      font-size: 18px;
      font-weight: 200;
      color: #ffffff;
      padding: 10px;
    }
  }
  .container {
    width: 100%;
    display: flex;
    overflow-x: auto;
    .flex-content {
      display: flex;
      overflow-x: auto;
      flex-shrink: 0;
      gap: 10px;
      align-items: flex-start;
      .card {
        width: 200px;
        border-radius: 5px;
        overflow: hidden;
        &:hover {
          background-color: #121212;
        }
        img {
          width: 100%;
          height: 160px;
          object-fit: cover;
          object-position: center;
        }

        .content {
          padding: 10px;
          P {
            font-size: 12px;
            color: #ffffff;
            &.artist {
              color: #ffffff65;
            }
          }
        }
      }
    }
  }

  .header {
    height: 200px;
    background-color: #000000;
    position: sticky;
    top: 0;
    z-index: 2;
  }
</style>
