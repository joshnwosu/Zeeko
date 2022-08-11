<script>
  export let playlist;
  export let name;
  import { getFisrtAlbumArt } from "../../store/playerManager";
  import BlurImg from "../Widgets/BlurImg.svelte";
  import PlaylistCover from "../Widgets/PlaylistCover.svelte";
  import PlaylistActionButtons from "./PlaylistActionButtons.svelte";
  import PlaylistCaption from "./PlaylistCaption.svelte";
</script>

<div class="header">
  <BlurImg img={getFisrtAlbumArt(playlist)} />
  <div class="header-content">
    <PlaylistCover img={getFisrtAlbumArt(playlist)} />
    <div class="details">
      <PlaylistCaption {name} length={playlist?.tracks?.length} fontSize={30} />
      <PlaylistActionButtons />
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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 20px;
      }
    }
  }
</style>
