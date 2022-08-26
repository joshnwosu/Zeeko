<script>
  export let params;
  import PlaylistHeader from "../components/Playlist/PlaylistHeader.svelte";
  import PlaylistView from "../components/Playlist/PlaylistView.svelte";
  import TrackLists from "../components/Track/TrackLists.svelte";
  import TrackListsNew from "../components/Track/TrackListsNew.svelte";
  import { playlistStore } from "../store/player";
  $: playlist =
    $playlistStore.filter((playlist) => playlist.name == params?.name)[0] || [];
</script>

<main class="page">
  {#if playlist?.name}
    <PlaylistHeader name={params.name} {playlist} />
    <!-- <PlaylistView> -->
    <!-- <TrackLists tracks={playlist?.tracks} /> -->
    <TrackListsNew tracks={playlist?.tracks} />
    <!-- </PlaylistView> -->
  {/if}
</main>
