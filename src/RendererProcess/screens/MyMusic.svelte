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
  import Genres from "../views/Genres.svelte";

  const prefix = "/my-music";
  const routes = {
    "/": Song,
    "/artists": Artist,
    "/albums": Albums,
    "/genres": Genres,
  };
</script>

<main class="page" transition:fade>
  {#if params}
    <ScreenHeader title="My music" />
  {/if}
  <div class="song-tab">
    <nav>
      <span on:click={() => push(`${prefix}/`)}> Songs </span>
      <span on:click={() => push(`${prefix}/artists`)}> Artists </span>
      <span on:click={() => push(`${prefix}/albums`)}> Albums </span>
      <span on:click={() => push(`${prefix}/genres`)}> Genres </span>
    </nav>
  </div>
  <div class="screen-view">
    <Router {routes} {prefix} restoreScrollState={true} />
  </div>
</main>

<style lang="scss">
  .page {
    &::-webkit-scrollbar-track-piece:start {
      margin-top: 50px;
    }
  }
  .song-tab {
    position: sticky;
    top: 100px;
    padding: 20px;
    background-color: #000000;
    z-index: 2;
    backdrop-filter: blur(20px);
    nav {
      span {
        font-size: 16px;
        color: #ffffff;
        background-color: transparent;
        border: none;
        margin-right: 20px;
        text-transform: capitalize;
        font-weight: 400;
      }
    }
  }
</style>
