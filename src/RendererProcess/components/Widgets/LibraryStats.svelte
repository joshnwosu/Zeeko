<script>
  import { push } from "svelte-spa-router";
  import {
    foldersStore,
    albumsStore,
    artistsStore,
    playerStore,
    playlistStore,
  } from "../../store/player";
  import {
    FolderIcon,
    MicrophoneIcon,
    MusicIcon,
    PlayIcon,
    MusicFilterIcon,
    GalleryIcon,
  } from "../Icons";
  $: libraries = [
    {
      name: "Tracks",
      total: $playerStore.length,
      icon: MusicIcon,
      color: "#EA9E10",
      click: () => push("/my-music/"),
    },
    {
      name: "Albums",
      total: $albumsStore.length,
      icon: GalleryIcon,
      color: "#E91010",
      click: () => push("/my-music/albums"),
    },
    {
      name: "Artists",
      total: $artistsStore.length,
      icon: MicrophoneIcon,
      color: "#EA1093",
      click: () => push("/my-music/artists"),
    },
    {
      name: "Folders",
      total: $foldersStore.length,
      icon: FolderIcon,
      color: "#CC10EA",
      click: () => push("/my-music/folders"),
    },
    {
      name: "Playlists",
      total: $playlistStore.length,
      icon: MusicFilterIcon,
      color: "#5910EA",
      click: () => push("/playlists"),
    },
  ];
</script>

<div class="library-stats">
  <h1>Library Stats</h1>
  <div class="library-cards">
    {#each libraries as library}
      <div
        class="card"
        style="background-color: {library.color}"
        on:click={library.click}
      >
        <span class="card-icon">
          <svelte:component this={library.icon} />
        </span>
        <div class="card-text">
          <h3>{library.name}</h3>
          <p>{library.total}</p>
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .library-stats {
    margin-bottom: 20px;
    h1 {
      font-size: 20px;
      font-weight: 300;
      color: #ffffff;
      margin-bottom: 10px;
    }
  }

  .library-cards {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
  }
  .card {
    width: 250px;
    height: 200px;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: 0.2s ease;

    .card-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ffffff20;
      :global(svg) {
        width: 20px;
        height: 20px;
        opacity: 0.7;
      }
    }
    .card-text {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      h3 {
        font-size: 18px;
        font-weight: 300;
        color: #ffffff;
        line-height: 1.5;
      }
      p {
        font-size: 40px;
        font-weight: 200;
        color: #ffffff80;
      }
    }
  }
</style>
