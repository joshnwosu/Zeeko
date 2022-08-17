<script>
  import Album from "../components/Layouts/Album.svelte";
  import { albumsStore } from "../store/player";

  $: albums = $albumsStore;
</script>

<div>
  <Album data={albums} />
</div>
