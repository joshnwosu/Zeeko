<script>
  import { onMount } from "svelte";

  export let items;
  export let height;
  export let itemCount;
  export let childHeight;

  let ref;
  let totalHeight;
  let offsetY;

  onMount(() => {
    let renderAhread = 20;

    totalHeight = itemCount * childHeight;

    let { scrollTop } = ref;

    let startNode = Math.floor(scrollTop / childHeight) - renderAhread;
    startNode = Math.max(0, startNode);

    let visibleNodeCount = Math.ceil(height / childHeight) + 2 * renderAhread;
    visibleNodeCount = Math.min(itemCount - startNode, visibleNodeCount);
    offsetY = startNode * childHeight;
  });
</script>

<div class="viewport" style="height: {height}px" bind:this={ref}>
  <div
    class="viewport"
    style="overflow: hidden; will-change: transform; height: {totalHeight}; position: relative;"
  >
    <div style="will-change: transform; transform: translateY({offsetY}px)">
      <!-- {visibleChildren} -->
      {#each items as item}
        <div class="row">
          <p>{item.title}</p>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .viewport {
    border: 1px solid red;
  }
  .row {
    height: 30px;
    line-height: 30px;
    display: fle;
    justify-content: space-between;
    padding: 0 10px;
  }
</style>
