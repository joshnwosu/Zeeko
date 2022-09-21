<script>
  import { toggleContextMenu } from "../../store/status";
  import { cleanUp } from "../../utilities";
</script>

<div
  class="contextMenu-overlay"
  class:visible={$toggleContextMenu != "close"}
  on:click={cleanUp}
  on:contextmenu={cleanUp}
/>
<ul
  class="contextMenu"
  data-theme="dark"
  class:visible={$toggleContextMenu != "close"}
>
  {#if $toggleContextMenu == "playlist"}
    <li class="contextMenu-item">
      <button class="contextMenu-button">Play</button>
    </li>
    <li class="contextMenu-item">
      <button class="contextMenu-button">Play next</button>
    </li>
    <li class="contextMenu-item">
      <button class="contextMenu-button">Rename</button>
    </li>
    <li class="contextMenu-item">
      <button class="contextMenu-button">Delete</button>
    </li>
    <li class="contextMenu-item" data-divider="top">
      <button class="contextMenu-button">Select</button>
    </li>
  {:else if $toggleContextMenu == "track"}
    <li class="contextMenu-item">
      <button class="contextMenu-button">Play</button>
    </li>
    <li class="contextMenu-item">
      <button class="contextMenu-button">Play next</button>
    </li>
    <li class="contextMenu-item">
      <button class="contextMenu-button">Add to</button>
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
  {/if}
</ul>

<style lang="scss">
  /* Check global.css for Context Menu Styling */
  .contextMenu-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: none;
    &.visible {
      display: flex;
    }
  }

  .contextMenu {
    display: none;
    &.visible {
      display: flex;
    }
  }
</style>
