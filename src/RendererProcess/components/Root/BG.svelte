<script>
  import { playbackManager, selectedSong } from "../../store/player";
  let src;
  let defaultsrc = "./assets/images/default-cover-art.jpg";
  $: if ($selectedSong) src = $playbackManager.nowPlaying?.albumArt;
</script>

<div class="bg">
  <img src={src || defaultsrc} alt="Album art" />
  <div class="overlay" />
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
    pointer-events: none;
    .overlay {
      position: fixed;
      width: 200%;
      height: 200%;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background-color: #00000080;
      backdrop-filter: blur(100px);
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      opacity: 1;
      position: fixed;
      backdrop-filter: blur(100px);
      /* display: none; */
    }
  }
</style>
