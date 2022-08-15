<script>
  import Album from "../components/Layouts/Album.svelte";
  import { albumsStore } from "../store/player";

  $: albums = $albumsStore;
</script>

<Album data={albums} />
