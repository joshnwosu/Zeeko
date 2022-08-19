<script>
  // import LibraryStats from "../components/Widgets/LibraryStats.svelte";
  // import GenreTags from "../components/Widgets/GenreTags.svelte";
  // import Slidy from "../components/Widgets/Slidy.svelte";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
  import List from "../components/Virtual/List.svelte";
  import { loadItems, loadMore } from "../components/Virtual/data";
  import { playerStore } from "../store/player";

  let filter = "";
  let allItems = loadItems();
  $: itemss = allItems.filter((i) => i.name.includes(filter));
  // $: console.log("Items: ", allItems);

  $: items =
    $playerStore.length == 2
      ? $playerStore.filter((i) => i.fileLocation.includes(filter))
      : itemss;
</script>

<main class="page">
  <!-- <ScreenHeader title="Discover" />
  <div class="screen-view">
    <Slidy />
    <LibraryStats />
    <GenreTags />

    
  </div> -->

  <div class="row">
    <div class="col">
      <em>lazy loading</em>
      <List {items} />
    </div>
  </div>
  <!-- <div style="height: 100%; overflow-y: auto;">
        {#each items as item}
          <p>{item?.title || item?.name}</p>
        {/each}
      </div> -->
</main>

<style lang="scss">
  /* .screen-view {
    width: 1100px;
    max-width: 100%;
  } */

  /* :global(body) {
    height: 100vh;
    display: flex;
    flex-flow: column;
  } */
  .page {
    display: flex;
    flex-direction: column;
  }
  .row {
    flex: 1;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    /* border: 1px solid red; */
    height: 100%;
    padding-bottom: 100px;
    /* background-color: red; */
  }
  .col {
    flex: 1;
    min-height: 200px;
    display: flex;
    flex-flow: column nowrap;
    margin: 0 0.2rem;
  }
  .col :global(.List) {
    flex: 1;
  }
</style>
