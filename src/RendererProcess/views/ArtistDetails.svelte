<script>
  import { onMount } from "svelte";

  export let params;
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import PlaylistHeader from "../components/Playlist/PlaylistHeader.svelte";
  import PlaylistView from "../components/Playlist/PlaylistView.svelte";
  import TrackLists from "../components/Track/TrackLists.svelte";
  import { playlistStore } from "../store";
  let playlist;

  // $: (function getPlaylist(payload) {
  //   if (params?.name) {
  //     playlist = $playlistStore.filter(
  //       (playlist) => playlist.name == payload
  //     )[0];
  //   }
  // })(params?.name);
</script>

<main class="page" transition:fade>
  {#if params?.name}
    <PlaylistHeader name={params.name} {playlist} />
    <!-- <PlaylistView>
      <TrackLists tracks={playlist?.tracks} />
    </PlaylistView> -->
  {/if}
</main>
