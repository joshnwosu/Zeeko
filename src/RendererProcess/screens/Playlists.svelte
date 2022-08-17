<script>
  import { push } from "svelte-spa-router";
  import PlaylistCaption from "../components/Playlist/PlaylistCaption.svelte";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
  import PlaylistCover from "../components/Widgets/PlaylistCover.svelte";
  import { playlistStore } from "../store/player";
  import { getFirstAlbumArt } from "../store/playerManager";
  import { displayContextMenu } from "../utilities/contextMenu";

  const menuItems = [
    {
      content: `Copy`,
      events: {
        click: (e) => console.log(e, "Copy Button Click"),
        // mouseover: () => console.log("Copy Button Mouseover")
        // You can use any event listener from here
      },
    },

    { content: `Paste` },
    { content: `Cut` },
    { content: `Download` },
    {
      content: `Delete`,
      divider: "top", // top, bottom, top-bottom
    },
  ];
</script>

<main class="page">
  <ScreenHeader title="Playlists" />
  <div class="screen-view">
    {#each $playlistStore as playlist}
      <div
        class="playlist-card"
        on:click={() => push(`/playlist-details/${playlist.name}`)}
        on:contextmenu={displayContextMenu}
      >
        <!-- transition:tweenMe -->
        <figure>
          <PlaylistCover img={getFirstAlbumArt(playlist?.tracks)} />
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
