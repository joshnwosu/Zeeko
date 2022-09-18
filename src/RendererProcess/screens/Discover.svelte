<script>
  import LibraryStats from "../components/Widgets/LibraryStats.svelte";
  import GenreTags from "../components/Widgets/GenreTags.svelte";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
  import ScreenView from "../components/Root/ScreenView.svelte";
</script>

<main class="page">
  <ScreenHeader title="Discover" />
  <ScreenView>
    <LibraryStats />
    <!-- <GenreTags /> -->
  </ScreenView>
</main>

<style lang="scss">
</style>
