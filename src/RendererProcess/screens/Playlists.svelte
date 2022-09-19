<script>
  import PlaylistCard from "../components/Playlist/PlaylistCard.svelte";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
  import ScreenView from "../components/Root/ScreenView.svelte";
  import ScrollView from "../components/Widgets/ScrollView.svelte";
  import { playlistStore } from "../store/player";
</script>

<main class="page">
  <ScreenHeader title="Playlists" />
  <ScreenView>
    <PlaylistCard lists={$playlistStore} routeName="playlist-details" />
  </ScreenView>
</main>
