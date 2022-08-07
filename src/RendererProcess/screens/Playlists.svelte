<script>
  import { push } from "svelte-spa-router";

  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import {
    AddIcon,
    MusicPlaylistIcon,
    PlayBoldIcon,
    PlayIcon,
  } from "../components/Icons";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
  import { playlistStore } from "../store";
  function getFisrtAlbumArt(playlist) {
    let v;
    playlist.tracks.some((track) => (v = track.albumArt));
    return v;
  }
</script>

<main class="page" transition:fade>
  <ScreenHeader title="Playlists" />
  <div class="screen-view">
    {#each $playlistStore as playlist}
      <div
        class="playlist-card"
        on:click={() => push(`/playlist-details/${playlist.name}`)}
      >
        <figure>
          <div class="cover">
            <div class="stack stack-queue">
              {#if getFisrtAlbumArt(playlist)}
                <div class="filler" />
                <div class="filler" />
                <div class="filler" />
                <div class="filler">
                  <div class="hover">
                    <span class="hover-btn">
                      <svelte:component this={AddIcon} />
                    </span>
                    <span class="hover-btn">
                      <svelte:component this={PlayBoldIcon} />
                    </span>
                  </div>
                  <img src={getFisrtAlbumArt(playlist)} alt={`album-art`} />
                </div>
              {:else}
                <div class="filler" />
                <div class="filler" />
                <div class="filler" />
                <div class="filler no-img">
                  <div class="hover">
                    <span class="hover-btn">
                      <svelte:component this={AddIcon} />
                    </span>
                    <span class="hover-btn">
                      <svelte:component this={PlayBoldIcon} />
                    </span>
                  </div>
                  <span>
                    <svelte:component this={MusicPlaylistIcon} />
                  </span>
                </div>
              {/if}
            </div>
          </div>
          <figcaption class="label">
            <p class="name">{playlist.name}</p>
            <p class="length">{playlist.tracks.length} Songs</p>
          </figcaption>
        </figure>
      </div>
    {/each}
  </div>
</main>

<style lang="scss">
  .screen-view {
    display: flex;
  }
  .playlist-card {
    .cover {
      position: relative;
      .stack {
        width: 250px;
        height: 200px;
        padding: 0;
        position: relative;
        max-width: 100%;
        margin-top: 20px;
      }
      .stack .filler {
        width: 250px;
        height: 200px;
        position: absolute;
        top: 0;
        left: 0;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
      }

      .stack .filler:last-child {
        position: relative;
        background-color: #121212;
        overflow: hidden;
        &:hover {
          .hover {
            visibility: visible;
            opacity: 1;
          }
          img {
            transform: scale(1);
          }
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transform: scale(2);
          transition: 0.2s ease;
        }
        &.no-img {
          display: flex;
          justify-content: center;
          align-items: center;
          :global(svg) {
            width: 80px;
            height: 80px;
            opacity: 0.05;
          }
        }

        .hover {
          position: absolute;
          width: 100%;
          height: 100%;
          /* top: 0; */
          /* left: 0; */
          background-color: #12121280;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2;
          /* backdrop-filter: blur(5px); */
          visibility: hidden;
          opacity: 0;
          transition: 0.2s ease;
          .hover-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 60px;
            height: 60px;
            background-color: #00000050;
            border-radius: 50%;
            margin: 0 10px;
            cursor: pointer;
            :global(svg) {
              width: 30px;
              height: 30px;
              opacity: 1 !important;
              /* :global(path) {
                fill: #ffffff !important;
                stroke: #ffffff !important;
              } */
            }
          }
        }
      }

      .stack-queue {
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
      }

      .stack-queue {
        transform: scale(0.9);
      }

      .stack-queue .filler {
        backface-visibility: hidden;
        transform-origin: 50% -50%;
      }

      .stack-queue .filler:first-child {
        transform: scale(0.7);
        background-color: #444;
      }

      .stack-queue .filler:nth-child(2) {
        transform: scale(0.8);
        background-color: #333;
      }

      .stack-queue .filler:nth-child(3) {
        transform: scale(0.9);
        background-color: #222;
      }
    }
    .label {
      padding-left: 20px;

      p {
        font-size: 14px;
        margin-bottom: 5px;
        &.name {
          opacity: 1;
          font-weight: 400;
        }
        &.length {
          opacity: 0.6;
          font-size: 10px;
        }
      }
    }
  }
</style>
