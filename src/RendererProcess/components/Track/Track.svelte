<script>
  import { playerStore } from "../../store/player";
  import { toggleNowPlaying } from "../../store/status";

  import TrackLists from "./TrackLists.svelte";

  function sortByTitle() {
    return $playerStore.sort(
      (a, b) => a.title.localeCompare(b.title) || b.title - a.title
    );
  }
</script>

<div>
  <!-- {#if !$toggleNowPlaying} -->
  <!-- <TrackLists
    tracks={$playerStore.sort(
      (a, b) => a.title.localeCompare(b.title) || b.title - a.title
    )}
  /> -->
  <svelte:component
    this={TrackLists}
    tracks={$playerStore.sort(
      (a, b) => a.title.localeCompare(b.title) || b.title - a.title
    )}
  />
  <!-- {/if} -->
</div>
