<script>
  import { getContext } from "svelte";
  import { currentAccentColor } from "../../store/theme";
  import { TABS } from "./Tabs.svelte";

  const tab = {};
  const { registerTab, selectTab, selectedTab } = getContext(TABS);

  registerTab(tab);
</script>

<button
  style="--accent-color: {$currentAccentColor}"
  class:selected={$selectedTab === tab}
  on:click={() => selectTab(tab)}
>
  <slot />
</button>

<style>
  button {
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    border-radius: 0;
    margin: 0;
    margin-right: 20px;
    color: #ffffff65;
    font-size: 14px;
    font-weight: 200;
    padding: 8px 0px;
  }

  .selected {
    border-bottom: 3px solid var(--accent-color);
    color: #ffffff;
  }
</style>
