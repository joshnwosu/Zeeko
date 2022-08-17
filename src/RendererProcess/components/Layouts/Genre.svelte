<script>
  import { push } from "svelte-spa-router";

  export let data;
  import { defaultCoverArt, sortAndGroupAlphabetically } from "../../utilities";
  import StickyHeader from "../Widgets/StickyHeader.svelte";
  $: genres = sortAndGroupAlphabetically(data) || [];
</script>

<div class="wrapper">
  {#each genres as genre}
    <StickyHeader>
      {genre.group}
    </StickyHeader>
    <div class="card-container">
      {#each genre.children as child}
        <div class="card">
          <img
            src={child?.tracks[0]?.albumArt || defaultCoverArt}
            alt="album"
          />
          <div class="content">
            <p class="name">{child.name}</p>
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
        width: 150px;
        border-radius: 5px;
        overflow: hidden;
        &:hover {
          background-color: #121212;
        }
        img {
          width: 150px;
          height: 130px;
          object-fit: cover;
          object-position: center;
        }

        .content {
          padding: 10px 10px;
          P {
            font-size: 12px;
            color: #ffffff;
          }
        }
      }
    }
  }
</style>
