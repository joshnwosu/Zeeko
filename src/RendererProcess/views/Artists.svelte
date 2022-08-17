<script>
  import Artist from "../components/Layouts/Artist.svelte";
  import ScrollView from "../components/Widgets/ScrollView.svelte";
  import { artistsStore } from "../store/player";

  $: artists = $artistsStore;
</script>

<ScrollView>
  <Artist data={artists} />
</ScrollView>
