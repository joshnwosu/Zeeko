<script>
  import { playerStore } from "../../store";
  import { toggleNowPlaying } from "../../store/clickFunc";

  import TrackLists from "./TrackLists.svelte";
</script>

<div>
  {#if !$toggleNowPlaying}
    <TrackLists tracks={$playerStore} />
  {/if}
</div>
