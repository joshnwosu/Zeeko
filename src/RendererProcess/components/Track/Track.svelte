<script>
  import { playerStore } from "../../store/player";
  import TrackLists from "./TrackLists.svelte";
  import TrackListsNew from "./TrackListsNew.svelte";
  import TrackListTag from "./TrackListTag.svelte";

  $: spliced = $playerStore.slice(0, 50);
</script>

<!-- <TrackListsNew tracks={$playerStore} /> -->
<TrackListTag tracks={$playerStore} />
<!-- <TrackLists tracks={spliced} /> -->
