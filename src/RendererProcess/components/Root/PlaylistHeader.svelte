<script>
  export let playlist;
  import { getFisrtAlbumArt } from "../../store/playbackManager";
  import BlurImg from "../Widget/BlurImg.svelte";
  import Cover from "../Widget/Cover.svelte";
</script>

<div class="header">
  <BlurImg img={getFisrtAlbumArt(playlist)} />
  <div class="header-content">
    <Cover img={getFisrtAlbumArt(playlist)} />
    <div class="details">
      <h1>{playlist?.name}</h1>
      <p>{playlist?.tracks?.length} Songs</p>
    </div>
  </div>
</div>

<style lang="scss">
  .header {
    width: 100%;
    background-color: #121212;
    position: relative;
    .header-content {
      width: 100%;
      display: flex;
      position: relative;
      padding: 50px 20px;
      z-index: 3;
      .details {
        padding: 20px;
        h1 {
          font-weight: 100;
          font-size: 30px;
        }

        p {
          font-size: 12px;
          margin-top: 10px;
          opacity: 0.6;
        }
      }
    }
  }
</style>
