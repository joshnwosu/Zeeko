<script>
  import { onMount } from "svelte";

  export let params;
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import PlaylistHeader from "../components/Playlist/PlaylistHeader.svelte";
  import PlaylistView from "../components/Playlist/PlaylistView.svelte";
  import TrackLists from "../components/Track/TrackLists.svelte";
  import { artistsStore } from "../store/player";
  let artistData;

  $: (function getPlaylist(payload) {
    if (params?.name) {
      artistData =
        $artistsStore.filter((artist) => artist.name == payload)[0] || [];
      console.log("Artist Data: ", artistData);
    }
  })(params?.name);
</script>

<main class="page" transition:fade>
  {#if params?.name}
    <h1>{params.name}</h1>

    {#each artistData.tracks as item}
      <div>{item.title}</div>
    {/each}

    {#each artistData.albums as item}
      <div>{item.name}</div>
    {/each}
  {/if}
</main>
