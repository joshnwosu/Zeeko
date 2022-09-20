<script>
  export let tracks;
  import TrackLists from "./TrackLists.svelte";
  import TrackListsNew from "./TrackListsNew.svelte";
  import TrackListTag from "./TrackListTag.svelte";

  const tag = false;
</script>

{#if tag}
  <TrackListTag {tracks} />
{:else}
  <!-- <TrackListsNew {tracks} /> -->
  <TrackLists {tracks} />
{/if}

<!-- <TrackLists tracks={$playerStore} /> -->
