<script>
  import { playerStore } from "../../store/player";
  import TrackLists from "./TrackLists.svelte";
  import TrackListsNew from "./TrackListsNew.svelte";

  $: spliced = $playerStore.slice(0, 50);
</script>

<TrackListsNew tracks={$playerStore} />
<!-- <TrackLists tracks={spliced} /> -->
