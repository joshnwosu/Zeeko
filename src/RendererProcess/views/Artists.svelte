<script>
  import Artist from "../components/Layouts/Artist.svelte";
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import { artistsStore } from "../store/player";

  $: artists = $artistsStore;
</script>

<div transition:fade />
<Artist data={artists} />
