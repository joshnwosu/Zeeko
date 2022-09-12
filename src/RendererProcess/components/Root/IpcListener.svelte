<script>
  import { onMount } from "svelte";
  import {
    addTrack,
    deleteTrack,
    generateAlbumsData,
    generateArtistsData,
    generateFoldersData,
    generateGenreData,
    nextSong,
    prevSong,
    restorePlaylists,
    restoreRecentlyPlayed,
    restoreTracks,
    setPlayStats,
    stepBackward,
    stepForward,
    togglePlaying,
    updateTrack,
  } from "../../store/playerManager";

  onMount(async () => {
    window?.api?.media("getTracks");
    // window?.api?.media("initializePlayer");
    window?.api?.["processedFiles"]((e, tracks) => {
      restoreTracks(tracks);
      generateGenreData();
      generateArtistsData();
      generateAlbumsData();
      generateFoldersData();
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
    window?.api?.["parsingDone"](() => {
      generateGenreData();
      generateArtistsData();
      generateAlbumsData();
      generateFoldersData();
    });
    window?.api?.["mediaControl"]((e, action) => {
      if (action == "play" || action == "pause") {
        togglePlaying();
      }
      if (action == "next") {
        nextSong();
      }
      if (action == "prev") {
        prevSong();
      }
      if (action == "backward") {
        stepBackward();
      }
      if (action == "forward") {
        stepForward();
      }
    });

    // window?.api?.init?.newTrack();
  });
</script>

<div>
  <svg
    style="visibility: hidden; position: absolute"
    width="0"
    height="0"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
  >
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
          result="goo"
        />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
</div>
