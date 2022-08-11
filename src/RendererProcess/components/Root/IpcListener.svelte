<script>
  import { onMount } from "svelte";
  import {
    addTrack,
    deleteTrack,
    generateAlbumData,
    restorePlaylists,
    restoreRecentlyPlayed,
    restoreTracks,
    setPlayStats,
    updateTrack,
  } from "../../store/playerManager";

  onMount(async () => {
    window?.api?.media("getTracks");
    // window?.api?.media("initializePlayer");
    window?.api?.["processedFiles"]((e, tracks) => {
      restoreTracks(tracks);
    });
    window?.api?.["newTrack"]((e, newTrack) => {
      addTrack(newTrack);
    });
    window?.api?.["userPlaylists"]((e, playlists) => {
      restorePlaylists(playlists);
    });
    window?.api?.["updateTrack"]((e, track) => {
      updateTrack(track);
    });
    window?.api?.["deleteTrack"]((e, track) => {
      deleteTrack(track);
    });
    window?.api?.["recentlyPlayed"]((e, tracks) => {
      restoreRecentlyPlayed(tracks);
    });
    window?.api?.["playStats"]((e, tracks) => {
      setPlayStats(tracks);
    });
    // window?.api?.parsingDone(() => {
    //   generateAlbumData();
    // });

    // window?.api?.init?.newTrack();
  });
</script>
