<script>
  import { genresStore } from "../../store/player";
  import { shuffleArrayThree } from "../../utilities";

  $: tags = shuffleArrayThree($genresStore);
</script>

<div class="genre-tag">
  <div class="heading">
    <h1>Genre Tags</h1>
    <span>See all</span>
  </div>
  <div class="genres">
    {#each tags.splice(5, 20) as genre}
      <span class="tag">{genre.name}</span>
    {/each}
  </div>
</div>

<style lang="scss">
  .genre-tag {
    .heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding-right: 5px;
    }
    h1 {
      font-size: 20px;
      font-weight: 300;
      color: #ffffff;
    }

    span {
      font-size: 12px;
      color: #ffffff50;
      &:hover {
        color: #ffffff;
      }
    }

    .genres {
      display: flex;
      flex-wrap: wrap;
      .tag {
        background-color: #ffffff10;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 12px;
        color: #ffffff;
        margin-right: 10px;
        margin-bottom: 10px;
        &:hover {
          background-color: #ffffff20;
        }
      }
    }
  }
</style>
