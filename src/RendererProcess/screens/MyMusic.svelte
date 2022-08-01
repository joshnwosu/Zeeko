<script>
  export let params = {};
  console.log(params); // just for removing the annoying warning

  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import Router, { link, location, querystring, push } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
  import {
    MicrophoneIcon,
    MusicDashboardIcon,
    MusicIcon,
    FolderIcon,
  } from "../components/Icons";
  import Song from "../views/Songs.svelte";
  import Artist from "../views/Artists.svelte";
  import Albums from "../views/Albums.svelte";
  import Folders from "../views/Folders.svelte";

  const prefix = "/my-music";
  const routes = {
    "/": Song,
    "/artists": Artist,
    "/albums": Albums,
    "/folders": Folders,
  };
</script>

<main class="page" transition:fade>
  <ScreenHeader title="My music" />
  <div class="song-tab">
    <nav>
      <a
        href={`${prefix}/`}
        use:link
        use:active={{ className: "active-tab", inactiveClassName: "" }}
      >
        <span>Songs</span>
      </a>
      <a
        href={`${prefix}/artists`}
        use:link
        use:active={{ className: "active-tab", inactiveClassName: "" }}
      >
        <span>Artists</span>
      </a>
      <a
        href={`${prefix}/albums`}
        use:link
        use:active={{ className: "active-tab", inactiveClassName: "" }}
      >
        <span>Albums</span>
      </a>
      <a
        href={`${prefix}/folders`}
        use:link
        use:active={{ className: "active-tab", inactiveClassName: "" }}
      >
        <span>Folders</span>
      </a>
    </nav>
  </div>
  <div class="screen-view">
    <Router {routes} {prefix} restoreScrollState={true} />
    <!-- <h1>Location: {$location}</h1> -->
    <!-- <h1>Query: {$querystring}</h1> -->
  </div>
</main>

<style lang="scss">
  .song-tab {
    position: sticky;
    top: 150px;
    padding: 20px;
    background-color: #0e121a;
    /* background-color: rgba(14, 18, 26, 0.8); */
    backdrop-filter: blur(20px);
    z-index: 2;
    nav {
      a {
        font-size: 18px;
        color: #ffffff;
      }
    }
  }
</style>
