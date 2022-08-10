<script>
  export let img;
  import { MusicPlaylistIcon } from "../Icons";
  import StackCard from "./StackCard.svelte";
</script>

<div>
  {#if img}
    <StackCard>
      <div class="cover">
        <img src={img} alt={`album-art`} />
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
    background-color: #222222;
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
