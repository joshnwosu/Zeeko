<div class="action-wrapper">
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
</style>
