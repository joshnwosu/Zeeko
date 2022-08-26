<script>
  import LibraryStats from "../components/Widgets/LibraryStats.svelte";
  import GenreTags from "../components/Widgets/GenreTags.svelte";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
</script>

<main class="page">
  <ScreenHeader title="Discover" />
  <div class="screen-view">
    <LibraryStats />
    <GenreTags />
  </div>
</main>

<style lang="scss">
</style>
