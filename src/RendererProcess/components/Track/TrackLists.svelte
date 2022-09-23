<script>
  export let tracks;
  import { push } from "svelte-spa-router";
  import {
    playbackManager,
    playlistStore,
    selectedSong,
  } from "../../store/player";
  import {
    addSelectedTracksToPlaylist,
    deleteSelectedTrackFromPlaylist,
    encodeTrackFile,
    fetchDuration,
    formatDuration,
    formatIndex,
    getSong,
    pauseSong,
    playSong,
    selectedTrack,
  } from "../../store/playerManager";
  import { handleRouting } from "../../store/statusManager";
  import { currentAccentColor } from "../../store/theme";
  import { displayContextMenu } from "../../utilities/contextMenu";
  import Checker from "../Addon/Checker.svelte";
  import {
    AddIcon,
    HeartBoldIcon,
    HeartIcon,
    PauseIcon,
    PlayIcon,
  } from "../Icons";
  import PlayAnimation from "../Widgets/PlayAnimation.svelte";

  function toggleFavorite(track) {
    if (getSong($playlistStore[0].tracks, track.fileLocation)) {
      deleteSelectedTrackFromPlaylist(track.fileLocation);
    } else {
      addSelectedTracksToPlaylist(track);
    }
  }
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
          on:contextmenu={(e) => displayContextMenu(e, "track")}
        >
          <td class="check-box">
            <span class="checker">
              <button
                class="icon"
                on:click={() => console.log(track.fileLocation)}
              >
                <svelte:component this={Checker} />
              </button>
            </span>
          </td>
          <td class="index">
            {#if $selectedSong == track.fileLocation}
              <!-- <PlayAnimation /> -->
              <p>{formatIndex(index)}</p>
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
              <span
                on:click={() =>
                  handleRouting(`#/artist-details/${track.artist}`)}
                >{track.artist}</span
              >
            </p></td
          >
          <td class="album"
            ><p>
              <span
                on:click={() => handleRouting(`#/album-details/${track.album}`)}
                >{track.album}</span
              >
            </p></td
          >
          <td class="genre"><p>{track.genre}</p></td>
          <td class="year" align="right"><p>{track.year || ""}</p></td>
          <!-- <td class="duration" align="right">
            {#await fetchDuration(encodeTrackFile(track))}
              <p>--:--</p>
            {:then duration}
              <p>{formatDuration(duration)}</p>
            {:catch error}
              <p>--:--</p>
            {/await}
          </td> -->
          <td
            class="favorite"
            class:in-favorite={getSong(
              $playlistStore[0].tracks,
              track.fileLocation
            )}
            align="right"
          >
            <button class="icon" on:click={() => toggleFavorite(track)}>
              {#if getSong($playlistStore[0].tracks, track.fileLocation)}
                <svelte:component this={HeartBoldIcon} />
              {:else}
                <svelte:component this={HeartIcon} />
              {/if}
            </button>
          </td>
        </tr>
      {/each}
    {/if}
  </tbody>
</table>

<style lang="scss">
  .in-favorite {
    :global(svg) {
      :global(path) {
        fill: var(--accent-color) !important;
      }
    }
  }
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
        border-bottom: 1px solid #ffffff20;
        &:last-child {
          border-bottom: none;
        }
        &.playing-track {
          td {
            p {
              color: #ffffff;
              opacity: 0.5;
            }

            .icon {
              display: flex !important;
            }
          }
        }
        /* &:nth-child(even) {
          background-color: #121212;
        } */
        &:hover {
          background-color: #333333;
          border-bottom: none;
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
          font-size: 13px;
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
      background-color: #444444;
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
    width: 50px;
  }

  .favorite {
    width: 50px;
  }

  /* .duration {
    width: 70px;
  } */

  .check-box {
    width: 70px;

    .checker {
      visibility: hidden;
      opacity: 0;
    }
  }
</style>
