<script>
  import { toggleTrackStyle } from "../../store/status";
  export let tracks;
  import TrackLists from "./TrackLists.svelte";
  import TrackListsNew from "./TrackListsNew.svelte";
  import TrackListTag from "./TrackListTag.svelte";
</script>

{#if $toggleTrackStyle}
  <TrackListTag {tracks} />
{:else}
  <!-- <TrackListsNew {tracks} /> -->
  <TrackLists {tracks} />
{/if}
