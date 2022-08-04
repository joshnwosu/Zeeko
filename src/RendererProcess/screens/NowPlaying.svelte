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

<main class="now-playing">
  <div class="">
    <div id="waveform" />
  </div>
</main>

<style lang="scss">
  :global(.now-playing) {
    position: absolute !important;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: red;
    z-index: 999999999;
  }
</style>
