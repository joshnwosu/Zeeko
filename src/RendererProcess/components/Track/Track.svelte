<script>
  import { playerStore } from "../../store";
  import { toggleNowPlaying } from "../../store/clickFunc";

  import TrackLists from "./TrackLists.svelte";

  function sortByTitle() {
    return $playerStore.sort(
      (a, b) => a.title.localeCompare(b.title) || b.title - a.title
    );
  }
</script>

<div>
  <!-- {#if !$toggleNowPlaying} -->
  <TrackLists tracks={sortByTitle()} />
  <!-- {/if} -->
</div>
