<script>
  import { playbackManager, selectedSong } from "../../store";
  let src;
  let defaultsrc = "./assets/images/281951.jpg";
  $: if ($selectedSong) src = $playbackManager.nowPlaying?.albumArt;
</script>

<div class="bg">
  <img src={src || defaultsrc} alt="Album art" />
</div>

<style lang="scss">
  .bg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    filter: blur(100px);
    pointer-events: none;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      opacity: 0.3;
      position: fixed;
      /* display: none; */
    }
  }
</style>
