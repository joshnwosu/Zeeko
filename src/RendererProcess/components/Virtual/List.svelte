<script>
  import VirtualList from "./VirtualList.svelte";
  import ListItem from "./ListItem.svelte";
  import TrackListsNoDuration from "../Track/TrackListsNoDuration.svelte";
  import TrackListItem from "../Track/TrackListItem.svelte";

  export let items = [];
  export let start = 0;
  export let end = 0;
  export let scrollToIndex = undefined;
</script>

<p>{start} - {end}</p>
<!-- <div class="List"> -->
<!-- <table>
  <tbody> -->
<VirtualList {items} bind:start bind:end bind:scrollToIndex let:item let:index>
  <!-- <ListItem {item} /> -->

  <TrackListItem track={item} tracks={items} {index} />
</VirtualList>
<!-- </tbody>
</table> -->

<!-- </div> -->
<style lang="scss">
  /* .List {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    overflow: auto;
    border: 1px solid;
  } */
</style>
