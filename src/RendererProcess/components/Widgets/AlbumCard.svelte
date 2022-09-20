<script>
  import { getFirstAlbumArt } from "../../store/playerManager";
  import { handleRouting } from "../../store/statusManager";
  import { defaultCoverArt } from "../../utilities";

  export let data;
  //   let img = getFirstAlbumArt(child?.tracks) || child?.tracks[0]?.albumArt
</script>

<div class="card-container">
  {#each data as child}
    <div
      class="card"
      on:click={() => {
        handleRouting(`#/album-details/${child.name}`);
      }}
    >
      <img
        src={getFirstAlbumArt(child?.tracks) || defaultCoverArt}
        alt="album"
      />
      <div class="content">
        <p class="name">{child.name}</p>
        <p class="artist">{child.artist}</p>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .card-container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  .card {
    width: 150px;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
      height: 120px;
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
