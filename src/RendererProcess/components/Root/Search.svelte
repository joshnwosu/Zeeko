<script>
  import { onMount } from "svelte";
  import { searchManager } from "../../store/player";
  import { searchResult } from "../../store/playerManager";
  import Track from "../Track/Track.svelte";
  import AlbumCard from "../Widgets/AlbumCard.svelte";
  import ArtistCard from "../Widgets/ArtistCard.svelte";
  let searchInput;
  let searchTerm = "";

  // onMount(() => searchInput.focus());
  import { autofocus } from "../../utilities";
</script>

<div class="search">
  <div class="search-header">
    <!-- {#if searchTerm != ""}
      <h1>Search ``{searchTerm}``</h1>
    {/if} -->
    <!-- svelte-ignore a11y-autofocus -->
    <input
      placeholder="Search"
      bind:value={searchTerm}
      on:keyup={searchResult(searchTerm)}
      bind:this={searchInput}
      use:autofocus
    />
  </div>
  {#if searchTerm != ""}
    <div class="search-content">
      {#if $searchManager.tracks.length > 0}
        <div class="section track-section">
          <h1>Songs <span>&#x2022;</span> {$searchManager.tracks.length}</h1>
          <!-- <TrackListTag tracks={$searchManager.tracks} /> -->
          <Track tracks={$searchManager.tracks} />
        </div>
      {/if}

      {#if $searchManager.artists.length > 0}
        <div class="section artist-section">
          <h1>Artists <span>&#x2022;</span> {$searchManager.artists.length}</h1>
          <ArtistCard data={$searchManager.artists} />
        </div>
      {/if}

      {#if $searchManager.albums.length > 0}
        <div class="section album-section">
          <h1>Albums <span>&#x2022;</span> {$searchManager.albums.length}</h1>
          <AlbumCard data={$searchManager.albums} />
        </div>
      {/if}
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
    height: calc(100% - 100px);
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
    padding: 10px 20px;
    font-size: 40px;
    font-weight: 400;
    color: #ffffff;
    /* text-transform: uppercase; */
  }

  input::placeholder {
    color: #ffffff;
  }

  .section {
    h1 {
      font-size: 18px;
      font-weight: 200;
      padding: 20px 0;
    }
  }
</style>
