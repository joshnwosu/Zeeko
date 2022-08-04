<script>
  import Icon from "svelte-icons-pack/Icon.svelte";
  import closeWindowIcon from "svelte-icons-pack/vsc/VscChromeClose";
  import maximizeWindowIcon from "svelte-icons-pack/vsc/VscChromeRestore";
  import minimizeWindowIcon from "svelte-icons-pack/vsc/VscChromeMinimize";
</script>

<div class="action-wrapper">
  <div class="window-action-button ios-style">
    <span on:click={() => window?.api?.titlebar("closeWindow")} />
    <span on:click={() => window?.api?.titlebar("minimize")} />
    <span on:click={() => window?.api?.titlebar("maximize")} />
  </div>

  <div class="window-action-button windows-style">
    <span on:click={() => window?.api?.titlebar("minimize")}>
      <Icon src={minimizeWindowIcon} />
    </span>
    <span on:click={() => window?.api?.titlebar("maximize")}>
      <Icon src={maximizeWindowIcon} />
    </span>
    <span class="close" on:click={() => window?.api?.titlebar("closeWindow")}>
      <Icon src={closeWindowIcon} />
    </span>
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

  .ios-style {
    display: none;
    span {
      display: block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-left: 5px;
      cursor: default;
      &:hover {
        opacity: 0.5;
      }
      &:nth-child(1) {
        background-color: #ff5a4e;
      }

      &:nth-child(2) {
        background-color: #ffbd38;
      }

      &:nth-child(3) {
        background-color: #65e14d;
      }
    }
  }

  .windows-style {
    span {
      background-color: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 30px;
      &:hover:not(.close) {
        background-color: #ffffff20;
      }
      &.close:hover {
        background-color: rgb(172, 15, 15);
      }
    }
  }
</style>
