<script>
  export let params;
  import PlaylistHeader from "../components/Playlist/PlaylistHeader.svelte";
  import ScreenView from "../components/Root/ScreenView.svelte";
  import TrackListTag from "../components/Track/TrackListTag.svelte";
  import ScrollView from "../components/Widgets/ScrollView.svelte";
  import { foldersStore } from "../store/player";
  $: playlist =
    $foldersStore.filter((folder) => folder.name == params?.name)[0] || [];
</script>

<div class="playlist-details">
  {#if playlist?.name}
    <PlaylistHeader name={params.name} {playlist} mini />
    <ScreenView>
      <TrackListTag tracks={playlist?.tracks} />
    </ScreenView>
  {/if}
</div>

<style lang="scss">
  .playlist-details {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;

    &::-webkit-scrollbar-track-piece:end {
      margin-bottom: 100px;
    }
  }
</style>
