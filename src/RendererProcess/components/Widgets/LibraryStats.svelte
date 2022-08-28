<script>
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
    },
    {
      name: "Albums",
      total: $albumsStore.length,
      icon: GalleryIcon,
      color: "#E91010",
    },
    {
      name: "Artists",
      total: $artistsStore.length,
      icon: MicrophoneIcon,
      color: "#EA1093",
    },
    {
      name: "Folders",
      total: $foldersStore.length,
      icon: FolderIcon,
      color: "#CC10EA",
    },
    {
      name: "Playlists",
      total: $playlistStore.length,
      icon: MusicFilterIcon,
      color: "#5910EA",
    },
  ];
</script>

<div class="library-stats">
  <h1>Library Stats</h1>
  <div class="library-cards">
    {#each libraries as library}
      <div class="card" style="background-color: {library.color}">
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
    flex-wrap: nowrap;
    align-items: center;
    gap: 10px;
    /* justify-content: space-between; */
    /* border: 1px solid red; */
  }
  .card {
    width: 200px;
    height: 180px;
    /* background-color: #ffffff10 !important; */
    border-radius: 10px;
    padding: 20px;
    /* margin-right: 20px; */
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: 0.2s linear;
    &:hover {
      transform: translateY(-10px);
    }
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
      align-items: center;
      h3 {
        font-size: 18px;
        font-weight: 300;
        color: #ffffff;
        line-height: 1.5;
      }
      p {
        font-size: 15px;
        font-weight: 200;
        color: #ffffff80;
      }
    }
  }
</style>
