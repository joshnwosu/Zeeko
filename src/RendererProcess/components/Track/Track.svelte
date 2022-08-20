<script>
  import { playerStore } from "../../store/player";

  import TrackLists from "./TrackLists.svelte";
  import TrackListsNoDuration from "./TrackListsNoDuration.svelte";

  // function sortByTitle() {
  //   return $playerStore.sort(
  //     (a, b) => a.title.localeCompare(b.title) || b.title - a.title
  //   );
  // }

  $: splicedTracks = $playerStore.splice(0, 12);
</script>

<div>
  <!-- {#if !$toggleNowPlaying} -->
  <!-- <TrackLists
    tracks={$playerStore.sort(
      (a, b) => a.title.localeCompare(b.title) || b.title - a.title
    )}
  /> -->
  <!-- <svelte:component this={TrackLists} tracks={$playerStore} /> -->
  <!-- <svelte:component this={TrackListsNoDuration} tracks={$playerStore} /> -->
  <!-- <TrackLists tracks={splicedTracks} /> -->
  <!-- <TrackLists tracks={$playerStore} /> -->
  <TrackListsNoDuration tracks={splicedTracks} />
  <!-- {/if} -->
</div>
