<script>
  import { push } from "svelte-spa-router";
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import PlaylistCaption from "../components/Playlist/PlaylistCaption.svelte";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
  import PlaylistCover from "../components/Widget/PlaylistCover.svelte";
  import { playlistStore } from "../store/player";
  import { getFisrtAlbumArt } from "../store/playbackManager";
  import {
    gsap,
    ScrollTrigger,
    Draggable,
    MotionPathPlugin,
    Flip,
  } from "gsap/all";
  import { displayContextMenu } from "../utilities/contextMenu";

  function tweenMe(node) {
    let tl = gsap.timeline();
    const duration = 1;

    tl.from(node, {
      duration,
      opacity: 0,
    }).from(
      node,
      {
        duration,
        xPercent: 20,
        rotation: 9,
        yPercent: 20,
        ease: "bounce.out",
      },
      `-=${duration * 0.75}`
    );

    // return {
    //   /* GSAP's duration is in seconds. Svelte's is in miliseconds */
    //   duration: tl.totalDuration() * 1000,
    //   tick: (t) => {
    //     tl.progress(t);
    //   },
    // };
  }

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

<main class="page" transition:fade>
  <ScreenHeader title="Playlists" />
  <div class="screen-view">
    {#each $playlistStore as playlist}
      <div
        class="playlist-card"
        on:click={() => push(`/playlist-details/${playlist.name}`)}
        on:contextmenu={displayContextMenu}
      >
        <figure transition:tweenMe>
          <PlaylistCover img={getFisrtAlbumArt(playlist)} />
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
