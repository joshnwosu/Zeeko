<script>
  import Genre from "../components/Layouts/Genre.svelte";
  import { genresStore } from "../store/player";
  $: genres = $genresStore;
</script>

<div>
  <Genre data={genres} />
</div>
