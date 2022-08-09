<script>
  export let tracks;
  import { push } from "svelte-spa-router";
  import { playbackManager, selectedSong } from "../../store";
  import {
    formatIndex,
    pauseSong,
    playSong,
    selectedTrack,
  } from "../../store/playbackManager";
  import { preventBubbling } from "../../utilities";
  // import { displayContextMenu } from "../../utilities/contextMenu";
  import { AddIcon, HeartIcon, PauseIcon, PlayIcon } from "../Icons";
  import PlayAnimation from "../Widget/PlayAnimation.svelte";

  function displayContextMenu(e) {
    e.preventDefault();
    const { clientX, clientY } = e;
    const contextMenu = document.querySelector(".contextMenu");

    const positionY =
      clientY + contextMenu.scrollHeight >= window.innerHeight
        ? window.innerHeight - contextMenu.scrollHeight - 20
        : clientY;
    const positionX =
      clientX + contextMenu.scrollWidth >= window.innerWidth
        ? window.innerWidth - contextMenu.scrollWidth - 20
        : clientX;

    contextMenu.setAttribute(
      "style",
      `
      --top: ${positionY}px;
      --left: ${positionX}px;
      --width: ${contextMenu.scrollWidth}px;
      height: ${contextMenu.scrollHeight}px;
      `
    );

    const keyframes = [
      { opacity: 0, transform: "scale(0.5) translateY(-10px)", height: 0 },
      {
        opacity: 1,
        transform: "scale(1) translateY(0px)",
        height: `${contextMenu.scrollHeight}px`,
      },
    ];

    const timing = {
      duration: 100,
      iterations: 1,
    };

    contextMenu.animate(keyframes, timing);
  }
</script>

<table>
  <tbody>
    {#if tracks.length}
      {#each tracks as track, index}
        <tr
          class="track"
          class:playing-track={$selectedSong == track.fileLocation}
          on:dblclick|stopPropagation={(e) => {
            preventBubbling(e);
            selectedTrack(track.fileLocation, tracks);
          }}
          on:contextmenu={(e) => displayContextMenu(e)}
        >
          <td class="check-box">
            <button class="icon" on:click={() => console.log("Checky")}>
              <span class="checker" />
            </button>
          </td>
          <td class="index">
            {#if $selectedSong == track.fileLocation}
              <PlayAnimation />
            {:else}
              <p>{formatIndex(index)}</p>
            {/if}
          </td>
          <td class="title">
            <div class="title-wrapper">
              <p>{track.title}</p>
              <div class="icon-wrapper">
                {#if $selectedSong == track.fileLocation}
                  {#if $playbackManager.playing}
                    <button class="icon" on:click={pauseSong}
                      ><svelte:component this={PauseIcon} /></button
                    >
                  {:else}
                    <button class="icon" on:click={playSong}
                      ><svelte:component this={PlayIcon} /></button
                    >
                  {/if}
                {:else}
                  <button
                    class="icon"
                    on:click={() => selectedTrack(track.fileLocation, tracks)}
                    ><svelte:component this={PlayIcon} /></button
                  >
                {/if}
                <button class="icon" on:click={() => console.log("Addy")}
                  ><svelte:component this={AddIcon} /></button
                >
              </div>
            </div>
          </td>
          <td class="artist"
            ><p>
              <span on:click={() => push(`#/artist-details/${track.artist}`)}
                >{track.artist}</span
              >
            </p></td
          >
          <td class="album"
            ><p>
              <span on:click={() => push(`#/artist-details/${track.album}`)}
                >{track.album}</span
              >
            </p></td
          >
          <td class="genre"><p>{track.genre}</p></td>
          <td class="year" align="right"><p>{track.year || ""}</p></td>
          <td class="favorite" align="right">
            <button class="icon" on:click={() => console.log("Hearty")}>
              <svelte:component this={HeartIcon} />
            </button>
          </td>
        </tr>
      {/each}
    {/if}
  </tbody>
</table>

<style lang="scss">
  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    tbody {
      white-space: nowrap;

      tr {
        width: 100%;
        padding: 10px 0;
        height: 50px;
        &.playing-track {
          background-color: transparent !important;
          background-image: linear-gradient(
            45deg,
            transparent,
            #222222
          ) !important;
          td {
            p {
              color: #ffffff;
            }

            .icon {
              display: flex !important;
            }
          }
        }
        &:nth-child(even) {
          background-color: #121212;
        }
        &:hover {
          background-color: #222222;
          td {
            .checker {
              visibility: visible;
              opacity: 1;
            }
            .icon {
              display: flex !important;
            }
            p {
              color: #ffffff;
            }
          }
        }
      }
      td {
        width: 100%;
        flex: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right: 20px;
        :global(svg.svg-icon-outline) {
          :global(path) {
            stroke: #ffffff;
          }
        }

        :global(svg.svg-icon-bold) {
          :global(path) {
            fill: #ffffff;
          }
        }
        &:last-child {
          padding-right: 0;
        }
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
          font-weight: 400;
          color: #e9e9e9;
          span {
            /* color: #ffffff; */
            opacity: 1;
            cursor: pointer;
            &:hover {
              opacity: 0.5;
            }
          }
        }
      }
    }
  }

  .icon {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    display: none;
    &:hover {
      background-color: #333333;
    }
  }

  .title {
    width: 200%;
    .title-wrapper {
      display: flex;
      align-items: center;
      p {
        margin-right: 20px;
        color: #ffffff;
        font-weight: 400;
      }
      .icon-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
      }
    }
  }

  .index {
    width: 50px;
  }

  .year {
    width: 100px;
  }

  .favorite {
    width: 50px;
  }

  .check-box {
    width: 70px;

    .checker {
      display: inline-flex;
      width: 15px;
      height: 15px;
      border: 1px solid #ffffff;
      visibility: hidden;
      opacity: 0;
      &:hover {
        border-color: #ffffff;
      }
    }
  }
</style>
