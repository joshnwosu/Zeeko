<script>
  import Icon from "svelte-icons-pack/Icon.svelte";
  import closeWindowIcon from "svelte-icons-pack/vsc/VscChromeClose";
  import maximizeWindowIcon from "svelte-icons-pack/vsc/VscChromeRestore";
  import minimizeWindowIcon from "svelte-icons-pack/vsc/VscChromeMinimize";
  import { currentWindowStyle } from "../../store/theme";

  $: console.log($currentWindowStyle);
</script>

<div class="action-wrapper">
  {#if $currentWindowStyle.name == "Windows"}
    <div class="window-action-button windows-style">
      <span on:click={() => window?.api?.titlebar("minimize")}>
        <Icon src={minimizeWindowIcon} size={16} />
      </span>
      <span on:click={() => window?.api?.titlebar("maximize")}>
        <Icon src={maximizeWindowIcon} size={16} />
      </span>
      <span class="close" on:click={() => window?.api?.titlebar("closeWindow")}>
        <Icon src={closeWindowIcon} size={16} />
      </span>
    </div>
  {:else if $currentWindowStyle.name == "MacOS"}
    <div class="window-action-button ios-style">
      <span on:click={() => window?.api?.titlebar("closeWindow")} />
      <span on:click={() => window?.api?.titlebar("minimize")} />
      <span on:click={() => window?.api?.titlebar("maximize")} />
    </div>
  {/if}
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
    /* display: none; */
    width: 80px;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    padding: 0 5px;
    span {
      display: block;
      width: 15px;
      height: 15px;
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
