<script>
  import { onMount } from "svelte";
  import { playerStore, playlistStore } from "../../store/player";

  onMount(async () => {
    window?.api?.media("getTracks");
    // window?.api?.media("initializePlayer");

    window?.api?.processedFiles((e, tracks) => {
      playerStore.set(tracks);
    });
    window?.api?.newTrack((e, newTrack) => {
      $playerStore = [newTrack, ...$playerStore];
    });
    window?.api?.userPlaylists((e, playlists) => {
      // console.log("The playlists is here: ", playlists);
      $playlistStore = playlists;
    });

    window?.api?.init?.newTrack();
  });
</script>
