<script>
  import Album from "../components/Layouts/Album.svelte";
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import { albumsStore } from "../store/player";

  $: albums = $albumsStore;
</script>

<div transition:fade>
  <Album data={albums} />
</div>
