<script>
  export let params = {};
  // console.log(params); // just for removing the annoying warning

  // import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
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

<main class="page">
  {#if params}
    <ScreenHeader title="My music" />
  {/if}
  <div class="song-tab">
    <nav>
      <span
        on:click={() => push(`${prefix}/`)}
        class:active={$location == `${prefix}/`}
      >
        Songs
      </span>
      <span
        on:click={() => push(`${prefix}/artists`)}
        class:active={$location == `${prefix}/artists`}
      >
        Artists
      </span>
      <span
        on:click={() => push(`${prefix}/albums`)}
        class:active={$location == `${prefix}/albums`}
      >
        Albums
      </span>
      <!-- <span
        on:click={() => push(`${prefix}/genres`)}
        class:active={$location == `${prefix}/genres`}
      >
        Genres
      </span> -->
    </nav>
  </div>

  <Router {routes} {prefix} restoreScrollState="true" />
</main>

<style lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    &::-webkit-scrollbar-track-piece:start {
      margin-top: 50px;
    }
  }
  .song-tab {
    position: sticky;
    top: 100px;
    padding: 0 20px;
    background-color: #000000;
    z-index: 2;
    backdrop-filter: blur(20px);
    height: 50px;

    display: flex;
    align-items: center;
    nav {
      display: flex;
      align-items: center;
      height: 100%;
      flex: 1;
      border-bottom: 1px solid #ffffff20;
      span {
        display: inline-flex;
        height: 100%;
        align-items: center;
        font-size: 14px;
        color: #ffffff65;
        background-color: transparent;
        border: none;
        margin-right: 40px;
        text-transform: capitalize;
        font-weight: 400;
        border-top: 3px solid transparent;
        border-bottom: 3px solid transparent;
        &.active {
          border-bottom-color: #333333;
          color: #ffffff;
        }
        &:hover {
          color: #ffffff;
        }
      }
    }
  }
</style>
