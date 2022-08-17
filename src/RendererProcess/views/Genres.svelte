<script>
  import Genre from "../components/Layouts/Genre.svelte";
  import ScrollView from "../components/Widgets/ScrollView.svelte";
  import { genresStore } from "../store/player";
  $: genres = $genresStore;
</script>

<ScrollView>
  <Genre data={genres} />
</ScrollView>
