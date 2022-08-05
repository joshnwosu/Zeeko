<script>
  import { playerStore, playbackManager, selectedSong } from "../../store";
  import {
    formatIndex,
    pauseSong,
    playSong,
    selectedTrack,
  } from "../../store/playbackManager";
  import { AddIcon, HeartIcon, MoreIcon, PauseIcon, PlayIcon } from "../Icons";
  import PlayAnimation from "../Widget/PlayAnimation.svelte";

  function showContextMenu(e) {
    e.preventDefault();
    // document.querySelector("#tabsArea").classList.remove("multiSelectMode");
    const cordinates = {
      x: e.clientX + 5,
      y: e.clientY,
    };
    if (cordinates.y > 500) cordinates.y = 500;
    const contextOptions = document.querySelector(".contextOptions");
    contextOptions.style.height = `0px`;
    contextOptions.style.top = `${cordinates.y}px`;
    contextOptions.style.left = `${cordinates.x}px`;
    setTimeout(() => {
      contextOptions.style.height = `auto`;
    }, 100);
  }
</script>

<table>
  <!-- <thead>
    <tr>
      <th />
      <th />
      <th>Title</th>
      <th>Artist</th>
      <th>Album</th>
      <th>Genre</th>
      <th />
      <th />
    </tr>
  </thead> -->
  <tbody>
    {#if $playerStore.length}
      {#each $playerStore as track, index}
        <tr
          class="track"
          class:playing-track={$selectedSong == track.fileLocation}
          on:dblclick|preventDefault={() => {
            selectedTrack(track.fileLocation, $playerStore);
          }}
          on:contextmenu|preventDefault={showContextMenu}
        >
          <td class="check-box">
            <span class="icon">
              <span class="checker" />
            </span>
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
                    <span class="icon" on:click={pauseSong}
                      ><svelte:component this={PauseIcon} /></span
                    >
                  {:else}
                    <span class="icon" on:click={playSong}
                      ><svelte:component this={PlayIcon} /></span
                    >
                  {/if}
                {:else}
                  <span
                    class="icon"
                    on:click={() =>
                      selectedTrack(track.fileLocation, $playerStore)}
                    ><svelte:component this={PlayIcon} /></span
                  >
                {/if}
                <span class="icon"><svelte:component this={AddIcon} /></span>
              </div>
            </div>
          </td>
          <td class="artist"><p>{track.artist}</p></td>
          <td class="album"><p>{track.album}</p></td>
          <td class="genre"><p>{track.genre}</p></td>
          <td class="year" align="right"><p>{track.year || ""}</p></td>
          <td class="favorite" align="right">
            <span class="icon"><svelte:component this={HeartIcon} /></span>
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
          color: #ffffff;
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
    p {
      color: #ffffff60;
    }
  }

  .year {
    p {
      color: #ffffff60;
    }
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
