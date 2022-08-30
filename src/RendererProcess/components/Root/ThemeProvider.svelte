<script context="module">
  export const themeContextKey = {};
</script>

<script>
  import { setContext } from "svelte";
  import { themeStore } from "../../store/theme";
  export let theme = {};

  $: $themeStore = { ...$themeStore, ...theme };

  setContext(themeContextKey, { theme: themeStore });
</script>

<slot theme={$themeStore} />
