<script>
  export let data;
  import { sortAndGroupAlphabetically } from "../../utilities";
  import AlbumCard from "../Widgets/AlbumCard.svelte";
  import StickyHeader from "../Widgets/StickyHeader.svelte";
  $: albums = sortAndGroupAlphabetically(data) || [];
</script>

<div class="wrapper">
  {#each albums as album}
    <StickyHeader>
      {album.group}
    </StickyHeader>
    <div class="card-container">
      <AlbumCard data={album.children} />
    </div>
  {/each}
</div>

<style lang="scss">
  .wrapper {
    position: relative;
    .card-container {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }
  }
</style>
