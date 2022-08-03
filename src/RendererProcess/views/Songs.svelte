<script>
  import { playerStore, selectedSong } from "../store";
  import { selectedTrack } from "../store/playbackManager";

  import Icon from "svelte-icons-pack/Icon.svelte";

  let tracks = null;
  $: playerStore.subscribe((v) => (tracks = v));
</script>

<div>
  <!-- <button on:click={() => window?.api?.media("getTracks")}
    >Refresh Tracks</button
  > -->
  {#if tracks}
    {#each tracks as track, index}
      <div
        class="item"
        on:dblclick|preventDefault={() => {
          selectedTrack(track.fileLocation, tracks);
        }}
        class:active={$selectedSong == track.fileLocation}
      >
        <!-- <span style="width: 50px;">{index + 1}</span> -->
        <span
          class="check-box"
          class:checked={$selectedSong == track.fileLocation}
        />
        <span>{track.defaultTitle}</span>
        <span>|</span>
        <span>{track.genre}</span>
      </div>
    {/each}
  {:else}
    <h1>No tracks loaded</h1>
  {/if}
</div>

<style lang="scss">
  span {
    display: inline-flex;
    margin-right: 10px;
  }

  .item {
    /* background-color: #171c26; */
    position: relative;
    width: 100%;
    padding: 1em;
    line-height: 1;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    margin: 0 0 0.5em 0;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    /* text-transform: uppercase; */
    font-size: 12px;
    z-index: 0;
    color: #ffffff;

    display: flex;
    align-items: center;
  }
  .item.active {
    background-color: #121212;
    color: #ffffff;
  }

  .check-box {
    width: 20px;
    height: 20px;
    border: 1px solid #ffffff80;
    &:hover {
      border-color: #ffffff;
    }
    &.checked {
      background-color: #65e14d;
      border-color: #65e14d;
    }
  }
</style>
