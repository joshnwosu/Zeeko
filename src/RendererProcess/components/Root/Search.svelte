<script>
  import { searchManager } from "../../store/player";
  import { searchResult } from "../../store/playerManager";
  import TrackListTag from "../Track/TrackListTag.svelte";

  let searchTerm = "";
</script>

<div class="search">
  <div class="search-header">
    <!-- {#if searchTerm != ""}
      <h1>Search ``{searchTerm}``</h1>
    {/if} -->
    <input
      placeholder="Search"
      bind:value={searchTerm}
      on:keyup={searchResult(searchTerm)}
    />
  </div>
  {#if searchTerm != ""}
    <div class="search-content">
      <div class="section track-section">
        <h1>Track</h1>
        <TrackListTag tracks={$searchManager.tracks} />
      </div>

      <div class="section artist-section">
        <h1>Artist</h1>
        <!-- <TrackListTag tracks={$searchManager.tracks} /> -->
      </div>

      <div class="section album-section">
        <h1>Albums</h1>
        <!-- <TrackListTag tracks={$searchManager.tracks} /> -->
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .search {
    width: 100%;
    height: 100%;
    padding: 50px;
    position: absolute;
    top: 0;
  }
  .search-content {
    height: 100%;
    overflow-y: auto;
    margin-top: 20px;
  }

  .search-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  input {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #ffffff20;
    width: 50%;
    padding: 20px;
    font-size: 20px;
    color: #ffffff;
  }

  input::placeholder {
    color: #ffffff;
  }

  .section {
    h1 {
      font-size: 18px;
      font-weight: 400;
      padding: 20px 0;
    }
  }
</style>
