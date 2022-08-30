<script>
  import { toggleDim } from "../../store/status";
  import { getContext } from "svelte";
  import { themeContextKey } from "./ThemeProvider.svelte";

  const { theme } = getContext(themeContextKey);

  $: console.log("getContext: ", $theme);
</script>

<div class="dim" class:show={$toggleDim} />

<style lang="scss">
  .dim {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #00000090;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999999999999;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition: 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &.show {
      opacity: 1;
      visibility: visible;
    }
  }
</style>
