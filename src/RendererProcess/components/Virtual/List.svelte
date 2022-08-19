<script>
  import VirtualList from "./VirtualList.svelte";
  import ListItem from "./ListItem.svelte";

  export let items = [];
  export let start = 0;
  export let end = 0;
  export let scrollToIndex = undefined;
</script>

<p>{start} - {end}</p>
<div class="List">
  <VirtualList {items} bind:start bind:end bind:scrollToIndex let:item>
    <ListItem {item} />
  </VirtualList>
</div>

<style>
  .List {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    overflow: auto;
    border: 1px solid;
  }
</style>
