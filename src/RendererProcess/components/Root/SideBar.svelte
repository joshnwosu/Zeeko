<script>
  import { pop } from "svelte-spa-router";
  import { ArrowLeftIcon, ArrowRightIcon } from "../Icons";
</script>

<div class="side-nav">
  <div class="action-wrapper">
    <div class="window-action-button">
      <span on:click={() => window?.api?.titlebar("closeWindow")} />
      <span on:click={() => window?.api?.titlebar("minimize")} />
      <span on:click={() => window?.api?.titlebar("maximize")} />
    </div>

    <div class="navigation-action-button">
      <span on:click={pop}>
        <svelte:component this={ArrowLeftIcon} />
      </span>
      <span>
        <svelte:component this={ArrowRightIcon} />
      </span>
    </div>
  </div>
</div>

<style lang="scss">
  .side-nav {
    background-color: rgba(14, 18, 26, 0.7);
    background-color: rgba(23, 28, 38, 0.7);
    width: 300px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 20px 0;
  }

  .action-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }

  .window-action-button {
    display: flex;
  }

  .window-action-button span {
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 5px;
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
    width: 30px;
    height: 30px;
    background-color: #0e121a;
    border-radius: 50%;
    margin-left: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .navigation-action-button span:nth-child(2) {
    opacity: 0.5;
    pointer-events: none;
  }
</style>
