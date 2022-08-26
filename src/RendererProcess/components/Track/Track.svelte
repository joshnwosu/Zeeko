<script>
  import { playerStore } from "../../store/player";
  import TrackListsNew from "./TrackListsNew.svelte";
</script>

<div class="track-wrapper">
  <TrackListsNew tracks={$playerStore} />
</div>

<style>
  .track-wrapper {
    width: 100%;
    flex: 1;
  }
</style>
