<script>
  import { onMount } from "svelte";
  import { playerStore } from "../../store";

  onMount(async () => {
    window?.api?.media("getTracks");
    // window?.api?.media("initializePlayer");

    window?.api?.processedFiles((e, tracks) => {
      playerStore.set(tracks);
    });
    window?.api?.newTrack((e, newTrack) => {
      $playerStore = [newTrack, ...$playerStore];
    });

    window?.api?.init?.newTrack();
  });
</script>
