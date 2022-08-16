<script>
  import { push } from "svelte-spa-router";
  import { defaultCoverArt } from "../../utilities";

  export let data;
</script>

{#each data as child}
  <div class="card" on:click={() => push(`#/album-details/${child.name}`)}>
    <img src={child?.tracks[0]?.albumArt || defaultCoverArt} alt="album" />
    <div class="content">
      <p class="name">{child.name}</p>
      <p class="artist">{child.artist}</p>
    </div>
  </div>
{/each}

<style lang="scss">
  .card {
    width: 200px;
    border-radius: 5px;
    overflow: hidden;
    /* &:hover {
          background-color: #121212;
        } */
    img {
      width: 100%;
      height: 160px;
      object-fit: cover;
      object-position: center;
    }

    .content {
      padding: 10px 10px;
      P {
        font-size: 12px;
        color: #ffffff;
        &.artist {
          color: #ffffff65;
        }
      }
    }
  }
</style>
