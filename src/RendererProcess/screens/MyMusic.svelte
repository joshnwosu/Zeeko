<script>
  export let params = {};
  console.log(params); // just for removing the annoying warning

  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import { link, location, querystring } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
  import {
    MicrophoneIcon,
    MusicDashboardIcon,
    MusicIcon,
    FolderIcon,
  } from "../components/Icons";
</script>

<main class="page" transition:fade>
  <ScreenHeader name="My music">
    <div class="song-tab">
      <nav>
        <a
          href="/my-music/"
          use:link
          use:active={{ className: "active-tab", inactiveClassName: "" }}
        >
          <svelte:component this={MusicIcon} />
          <span>Songs</span>
        </a>
        <a
          href="/my-music/artists"
          use:link
          use:active={{ className: "active-tab", inactiveClassName: "" }}
        >
          <svelte:component this={MicrophoneIcon} />
          <span>Artists</span>
        </a>
        <a
          href="/my-music/albums"
          use:link
          use:active={{ className: "active-tab", inactiveClassName: "" }}
        >
          <svelte:component this={MusicDashboardIcon} />
          <span>Albums</span>
        </a>
        <a
          href="/my-music/folders"
          use:link
          use:active={{ className: "active-tab", inactiveClassName: "" }}
        >
          <svelte:component this={FolderIcon} />
          <span>Folders</span>
        </a>
      </nav>
    </div>
  </ScreenHeader>
  <div class="screen-view">
    {#if $location == "/my-music/"}
      <h1>Songs</h1>
    {:else if $location == "/my-music/artists"}
      <h1>Artists</h1>
    {:else if $location == "/my-music/albums"}
      <h1>Albums</h1>
    {:else if $location == "/my-music/folders"}
      <h1>Folders</h1>
    {/if}

    <!-- <h1>Location: {$location}</h1> -->
    <!-- <h1>Query: {$querystring}</h1> -->
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
    <h1>Hello world</h1>
  </div>
</main>

<style>
  /* .song-tab {
    margin-top: 20px;
  }
  .song-tab nav {
    display: flex;
    overflow-x: auto;
  }
  .song-tab nav::-webkit-scrollbar {
    display: none;
  }
  .song-tab a {
    font-size: 10px;
    font-weight: 400;
    color: #ffffff;
    margin-right: 10px;
    padding: 7px 20px;
    border-radius: 20px;
    background-color: #171c26;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .song-tab a span {
    margin-left: 10px;
  } */
</style>
