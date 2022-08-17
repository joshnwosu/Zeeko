<script>
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
  import GenreTags from "../components/Widgets/GenreTags.svelte";
  import LibraryStats from "../components/Widgets/LibraryStats.svelte";
  import Slidy from "../components/Widgets/Slidy.svelte";
</script>

<main class="page">
  <ScreenHeader title="Discover" />
  <div class="screen-view">
    <!-- <Slidy /> -->
    <LibraryStats />
    <GenreTags />
    <div class="height" />
  </div>
</main>

<style lang="scss">
  .screen-view {
    width: 1100px;
    max-width: 100%;
  }

  .height {
    width: 300px;
    height: 1000px;
    background-color: red;
  }
</style>
