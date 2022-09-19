<script>
  export let playlist;
  export let name;
  export let mini;
  import { getFirstAlbumArt } from "../../store/playerManager";
  import BlurImg from "../Widgets/BlurImg.svelte";
  import PlaylistCover from "../Widgets/PlaylistCover.svelte";
  import PlaylistActionButtons from "./PlaylistActionButtons.svelte";
  import PlaylistActionButtonsMini from "./PlaylistActionButtonsMini.svelte";
  import PlaylistCaption from "./PlaylistCaption.svelte";

  // $: console.log("params: ", name);
</script>

<div class="header">
  <BlurImg img={getFirstAlbumArt(playlist?.tracks)} />
  <div class="header-content">
    <PlaylistCover img={getFirstAlbumArt(playlist?.tracks)} />
    <div class="details">
      <PlaylistCaption {name} length={playlist?.tracks?.length} fontSize={30} />
      {#if mini}
        <PlaylistActionButtonsMini />
      {:else}
        <PlaylistActionButtons {name} />
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  .header {
    width: 100%;
    background-color: #121212;
    position: sticky;
    top: 0;
    z-index: 9;
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
