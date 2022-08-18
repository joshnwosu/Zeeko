<script>
  import { onMount, tick } from "svelte";

  //   props
  export let items;
  export let height = "100%";
  export let itemHeight = undefined;
  // read-only, but visible to consumers via bind:start
  export let start = 0;
  export let end = 0;
  // load state
  let height_map = [];
  let rows;
  let viewport;
  let contents;
  let viewport_height = 0;
  let visible;
  let mounted;

  let top = 0;
  let bottom = 0;
  let average_height;

  $: visible = items.slice(start, end).map((data, i) => {
    return { index: 1 + start, data };
  });
</script>

<svelte-virtual-list-viewport>
  <svelte-virtual-list-contents>
    {#each visible as row (row.index)}
      <svelte-virtual-list-row>
        <slot item={row.data}>Missing template</slot>
      </svelte-virtual-list-row>
    {/each}
  </svelte-virtual-list-contents>
</svelte-virtual-list-viewport>

<style>
  svelte-virtual-list-viewport {
    position: relative;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    display: block;
    background-color: red;
  }
  svelte-virtual-list-contents,
  svelte-virtual-list-row {
    display: block;
  }
  svelte-virtual-list-row {
    overflow: hidden;
  }
</style>
