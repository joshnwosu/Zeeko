<script>
  import { sortAndGroupAlphabetically } from "../../utilities";
  import ArtistCard from "../Widgets/ArtistCard.svelte";
  import StickyHeader from "../Widgets/StickyHeader.svelte";

  export let data;
  $: artists = sortAndGroupAlphabetically(data) || [];
</script>

<div class="wrapper">
  {#each artists as artist}
    <StickyHeader>
      {artist.group}
    </StickyHeader>
    <ArtistCard data={artist?.children} />
  {/each}
</div>

<style lang="scss">
  .wrapper {
    position: relative;
  }
</style>
