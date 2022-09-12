<script>
  import { playerStore } from "../../store/player";
  import TrackLists from "./TrackLists.svelte";
  import TrackListsNew from "./TrackListsNew.svelte";
  import TrackListTag from "./TrackListTag.svelte";

  $: spliced = $playerStore.slice(0, 50);
  const tag = true;
</script>

{#if tag}
  <TrackListTag tracks={$playerStore} />
{:else}
  <TrackListsNew tracks={$playerStore} />
{/if}

<!-- <TrackLists tracks={$playerStore} /> -->
