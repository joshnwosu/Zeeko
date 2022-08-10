<script>
  export let playlist;
  export let name;
  import { getFisrtAlbumArt } from "../../store/playerManager";
  import BlurImg from "../Widgets/BlurImg.svelte";
  import PlaylistCover from "../Widgets/PlaylistCover.svelte";
  import PlaylistCaption from "./PlaylistCaption.svelte";
</script>

<div class="header">
  <BlurImg img={getFisrtAlbumArt(playlist)} />
  <div class="header-content">
    <PlaylistCover img={getFisrtAlbumArt(playlist)} />
    <div class="details">
      <PlaylistCaption {name} length={playlist?.tracks?.length} fontSize={30} />
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
        /* h1 {
          font-weight: 100;
          font-size: 30px;
        }

        p {
          font-size: 12px;
          margin-top: 10px;
          opacity: 0.6;
        } */
      }
    }
  }
</style>
