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

    <AlbumCard data={album.children} />
  {/each}
</div>

<style lang="scss">
  .wrapper {
    position: relative;
  }
</style>
