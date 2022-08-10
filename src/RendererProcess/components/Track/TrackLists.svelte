<script>
  export let tracks;
  import { push } from "svelte-spa-router";
  import { playbackManager, selectedSong } from "../../store/player";
  import {
    formatIndex,
    pauseSong,
    playSong,
    selectedTrack,
  } from "../../store/playerManager";
  import { displayContextMenu } from "../../utilities/contextMenu";
  import { AddIcon, HeartIcon, PauseIcon, PlayIcon } from "../Icons";
  import PlayAnimation from "../Widgets/PlayAnimation.svelte";
</script>

<table>
  <tbody>
    {#if tracks.length}
      {#each tracks as track, index}
        <tr
          class="track"
          class:playing-track={$selectedSong == track.fileLocation}
          on:dblclick={(e) => {
            if (
              e.target.tagName === "BUTTON" ||
              e.target.parentElement.tagName === "BUTTON"
            ) {
              return false;
            }
            selectedTrack(track.fileLocation, tracks);
          }}
          on:contextmenu={displayContextMenu}
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
        display: table-row;
        &.playing-track {
          background-color: #121212 !important;
          box-shadow: 0 5px 9px 1px rgba(0, 0, 0, 0.5);
          border: 1px solid #22222280;
          td {
            p {
              color: #ffffff;
            }

            .icon {
              display: flex !important;
            }
          }
        }
        /* &:nth-child(even) {
          background-color: #222222;
        } */
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
