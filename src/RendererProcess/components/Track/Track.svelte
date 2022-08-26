<script>
  import { playerStore } from "../../store/player";
  import TrackLists from "./TrackLists.svelte";
  import TrackListsNew from "./TrackListsNew.svelte";
</script>

<TrackListsNew tracks={$playerStore} />
<!-- <TrackLists tracks={$playerStore} /> -->
