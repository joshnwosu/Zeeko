<script>
  import { push } from "svelte-spa-router";

  export let data;
  import { defaultCoverArt, sortAndGroupAlphabetically } from "../../utilities";
  import StickyHeader from "../Widgets/StickyHeader.svelte";
  $: albums = sortAndGroupAlphabetically(data) || [];
</script>

<div class="wrapper">
  {#each albums as album}
    <StickyHeader>
      {album.group}
    </StickyHeader>
    <div class="card-container">
      {#each album.children as child}
        <div
          class="card"
          on:click={() => push(`#/artist-details/${child.name}`)}
        >
          <img
            src={child?.tracks[0]?.albumArt || defaultCoverArt}
            alt="album"
          />
          <div class="content">
            <p class="name">{child.name}</p>
            <p class="artist">{child.artist}</p>
          </div>
        </div>
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  .wrapper {
    position: relative;
    .card-container {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;

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
    }
  }
</style>
