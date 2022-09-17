<script>
  export let theme;

  import Icon from "svelte-icons-pack/Icon.svelte";
  import closeWindowIcon from "svelte-icons-pack/vsc/VscChromeClose";
  import maximizeWindowIcon from "svelte-icons-pack/vsc/VscChromeRestore";
  import minimizeWindowIcon from "svelte-icons-pack/vsc/VscChromeMinimize";
  import restoreWindowIcon from "svelte-icons-pack/vsc/VscChromeMaximize";
</script>

{#if theme.name == "Windows"}
  <div class="window-action-button windows-style">
    <span>
      <Icon src={minimizeWindowIcon} size={16} />
    </span>
    <span>
      <Icon src={maximizeWindowIcon} size={16} />
    </span>
    <span class="close">
      <Icon src={closeWindowIcon} size={16} />
    </span>
  </div>
{:else if theme.name == "MacOS"}
  <div class="window-action-button ios-style">
    <span />
    <span />
    <span />
  </div>
{:else if theme.name == "Linux (Ubuntu)"}
  <div class="window-action-button linux-style">
    <span>
      <Icon src={minimizeWindowIcon} size={12} />
    </span>
    <span> <Icon src={restoreWindowIcon} size={12} /></span>
    <span>
      <Icon src={closeWindowIcon} size={12} />
    </span>
  </div>
{/if}

<style lang="scss">
  .window-action-button {
    display: flex;
  }

  .ios-style {
    width: 80px;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    padding: 0 5px;
    span {
      display: block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
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

  .linux-style {
    width: 100px;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    padding: 0 5px;
    span {
      background-color: #444444;
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      cursor: default;

      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        opacity: 0.5;
      }
    }
  }

  .windows-style {
    display: flex;
    :global(svg) {
      :global(path) {
        fill: #ffffff;
      }
    }
    span {
      background-color: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 30px;
      &:hover:not(.close) {
        background-color: #444444;
      }
      &.close:hover {
        background-color: rgb(172, 15, 15);
      }
    }
  }
</style>
