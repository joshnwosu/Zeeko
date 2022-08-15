<script>
  import { push } from "svelte-spa-router";

  export let data;
  import { defaultCoverArt } from "../../utilities";
</script>

<div class="card-container">
  {#each data as album}
    <div class="card" on:click={() => push(`#/artist-details/${album.artist}`)}>
      <img src={album?.tracks[0]?.albumArt || defaultCoverArt} alt="album" />
      <div class="content">
        <p class="name">{album.name}</p>
        <p class="artist">{album.artist}</p>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .card-container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;

    .card {
      width: 200px;
      background-color: #121212;
      border-radius: 5px;
      overflow: hidden;
      &:hover {
        background-color: #333333;
      }
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
  }
</style>
