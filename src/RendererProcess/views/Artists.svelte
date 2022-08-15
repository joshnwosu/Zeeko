<script>
  import Artist from "../components/Layouts/Artist.svelte";
  import { artistsStore } from "../store/player";

  $: artists = $artistsStore;
</script>

<Artist data={artists} />
