<script>
  import { playerStore } from "../../store";

  import TrackLists from "./TrackLists.svelte";
</script>

<div>
  <TrackLists tracks={$playerStore} />
</div>
