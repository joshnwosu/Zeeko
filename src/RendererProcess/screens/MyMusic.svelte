<script>
  export let params = {};
  // console.log(params); // just for removing the annoying warning

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
  import ArtistModal from "../components/Modal/ArtistModal.svelte";

  const prefix = "/my-music";
  const routes = {
    "/": Song,
    "/artists": Artist,
    "/albums": Albums,
    "/folders": Folders,
  };
</script>

<main class="page" transition:fade>
  <ArtistModal />
  {#if params}
    <ScreenHeader title="My music" />
  {/if}
  <div class="song-tab">
    <nav>
      <span on:click={() => push(`${prefix}/`)}> Songs </span>
      <span on:click={() => push(`${prefix}/artists`)}> Artists </span>
      <span on:click={() => push(`${prefix}/albums`)}> Albums </span>
      <span on:click={() => push(`${prefix}/folders`)}> Folders </span>
    </nav>
  </div>
  <div class="screen-view">
    <Router {routes} {prefix} restoreScrollState={false} />
  </div>
</main>

<style lang="scss">
  .song-tab {
    position: sticky;
    top: 80px;
    padding: 20px;
    background-color: rgba(0, 0, 0, 1);
    /* backdrop-filter: blur(100px); */
    z-index: 2;
    nav {
      span {
        font-size: 14px;
        color: #ffffff;
        background-color: transparent;
        border: none;
        /* border: 1px solid red; */
        margin-right: 20px;
        text-transform: capitalize;
        font-weight: 400;
      }
    }
  }
</style>
