<script>
  import { push } from "svelte-spa-router";
  import PlaylistCaption from "../components/Playlist/PlaylistCaption.svelte";
  import PlaylistCard from "../components/Playlist/PlaylistCard.svelte";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
  import PlaylistCover from "../components/Widgets/PlaylistCover.svelte";
  import ScrollView from "../components/Widgets/ScrollView.svelte";
  import { playlistStore } from "../store/player";
  import { getFirstAlbumArt } from "../store/playerManager";
  import { displayContextMenu } from "../utilities/contextMenu";
</script>

<ScrollView>
  <ScreenHeader title="Playlists" />
  <PlaylistCard lists={$playlistStore} routeName="playlist-details" />
</ScrollView>
