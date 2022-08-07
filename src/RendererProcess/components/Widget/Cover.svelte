<script>
  export let playlist;
  import { MusicPlaylistIcon } from "../Icons";
  import StackCard from "./StackCard.svelte";

  function getFisrtAlbumArt(playlist) {
    let v;
    playlist.tracks.some((track) => (v = track.albumArt));
    return v;
  }
</script>

<div>
  {#if getFisrtAlbumArt(playlist)}
    <StackCard>
      <div class="cover">
        <img src={getFisrtAlbumArt(playlist)} alt={`album-art`} />
      </div>
    </StackCard>
  {:else}
    <StackCard>
      <div class="cover no-img">
        <svelte:component this={MusicPlaylistIcon} />
      </div>
    </StackCard>
  {/if}
</div>

<style lang="scss">
  .cover {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transition: all 0.3s;
    position: relative;
    background-color: #121212;
    overflow: hidden;
    /* &:hover {
          .hover {
            visibility: visible;
            opacity: 1;
          }
          img {
            transform: scale(1.2);
          }
        } */
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transform: scale(1);
      transition: 0.2s ease;
    }
    &.no-img {
      display: flex;
      justify-content: center;
      align-items: center;
      :global(svg) {
        width: 50px;
        height: 50px;
        opacity: 0.1;
      }
    }
  }
</style>
