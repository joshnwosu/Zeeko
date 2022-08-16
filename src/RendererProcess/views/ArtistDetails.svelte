<script>
  export let params;
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import { UserIcon } from "../components/Icons";
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
      <PlaylistView>
        <TrackLists tracks={artistData?.tracks} />
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
    height: 150px;
    background-color: #000000;
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
