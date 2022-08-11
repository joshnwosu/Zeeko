<script>
  import { cleanUp } from "../../utilities";

  function remove() {
    cleanUp();
  }
</script>

<div class="contextMenu-overlay" on:click={remove} />
<ul class="contextMenu" data-theme="dark">
  <li class="contextMenu-item">
    <button class="contextMenu-button">Play</button>
  </li>
  <li class="contextMenu-item">
    <button class="contextMenu-button">Play next</button>
  </li>
  <li class="contextMenu-item">
    <button class="contextMenu-button">Show album</button>
  </li>
  <li class="contextMenu-item">
    <button class="contextMenu-button">Edit info</button>
  </li>
  <li class="contextMenu-item">
    <button class="contextMenu-button">Properties</button>
  </li>
  <li class="contextMenu-item">
    <button class="contextMenu-button">Delete</button>
  </li>
  <li class="contextMenu-item" data-divider="top">
    <button class="contextMenu-button">Select</button>
  </li>
</ul>

<style>
  /* Check global.css for Context Menu Styling */
  .contextMenu-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: none;
  }
</style>
