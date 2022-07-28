<script>
  import { pop } from "svelte-spa-router";
  import { ArrowLeftIcon, ArrowRightIcon } from "../Icons";
</script>

<div class="action-wrapper">
  <div class="navigation-action-button">
    <span on:click={pop}>
      <svelte:component this={ArrowLeftIcon} />
    </span>
    <span>
      <svelte:component this={ArrowRightIcon} />
    </span>
  </div>

  <div class="window-action-button">
    <span on:click={() => window?.api?.titlebar("closeWindow")} />
    <span on:click={() => window?.api?.titlebar("minimize")} />
    <span on:click={() => window?.api?.titlebar("maximize")} />
  </div>
</div>

<style lang="scss">
  .action-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 200px;
    max-width: 100%;
  }

  .window-action-button {
    display: flex;
  }

  .window-action-button span {
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-left: 5px;
    cursor: default;
  }

  .window-action-button span:hover {
    opacity: 0.5;
  }

  .window-action-button span:nth-child(1) {
    background-color: #ff5a4e;
  }

  .window-action-button span:nth-child(2) {
    background-color: #ffbd38;
  }

  .window-action-button span:nth-child(3) {
    background-color: #65e14d;
  }

  .navigation-action-button {
    display: flex;
  }

  .navigation-action-button span {
    width: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.05);
  }

  .navigation-action-button span:hover {
    background-color: rgba(255, 255, 255, 0.1);
    :global(svg) {
      :global(path) {
        stroke: #ffffff !important;
      }
    }
  }

  .navigation-action-button span:nth-child(2) {
    opacity: 0.3;
    pointer-events: none;
  }
</style>
