<script>
  import { onMount } from "svelte";

  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import WaveSurfer from "wavesurfer.js";
  import { selectedSong, audioContext } from "../store";

  // $: $selectedSong;

  // onMount(() => {
  //   let surfer = WaveSurfer.create({
  //     backend: "MediaElementWebAudio",
  //     container: "#waveform",
  //     height: 100,
  //     barMinHeight: 1,
  //     cursorWidth: 0,
  //     normalize: true,
  //     responsive: true,
  //     hideScrollbar: true,
  //   });

  //   if ($selectedSong) {
  //     surfer.load($audioContext?.src);
  //     surfer.on("ready", function () {
  //       surfer.drawBuffer();
  //       surfer.play();
  //     });
  //   }
  // });
</script>

<main class="page">
  <div class="now-playing">
    <div id="waveform" />
  </div>
</main>

<style>
  .now-playing {
    width: 100%;
    height: 100%;
  }
</style>
