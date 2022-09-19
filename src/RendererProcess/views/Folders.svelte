<script>
  import PlaylistCard from "../components/Playlist/PlaylistCard.svelte";
  import ScrollView from "../components/Widgets/ScrollView.svelte";
  import { foldersStore } from "../store/player";
  // $: console.log($foldersStore);
</script>

<ScrollView>
  <PlaylistCard lists={$foldersStore} routeName="folder-details" />
</ScrollView>
