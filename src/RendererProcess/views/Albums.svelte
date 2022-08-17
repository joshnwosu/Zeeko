<script>
  import Album from "../components/Layouts/Album.svelte";
  import ScrollView from "../components/Widgets/ScrollView.svelte";
  import { albumsStore } from "../store/player";

  $: albums = $albumsStore;
</script>

<ScrollView>
  <Album data={albums} />
</ScrollView>
