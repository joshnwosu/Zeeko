<script>
  import { push } from "svelte-spa-router";
  import { getFirstAlbumArt } from "../../store/playerManager";
  import { displayContextMenu } from "../../utilities/contextMenu";
  export let lists;
  export let routeName;
  import PlaylistCover from "../Widgets/PlaylistCover.svelte";
  import PlaylistCaption from "./PlaylistCaption.svelte";
</script>

<div class="flex">
  {#each lists as list}
    <div
      class="playlist-card"
      on:click={() => push(`/${routeName}/${list.name}`)}
      on:contextmenu={(e) => displayContextMenu(e, "playlist")}
    >
      <figure>
        <PlaylistCover img={getFirstAlbumArt(list?.tracks)} />
        <figcaption>
          <PlaylistCaption
            name={list.name}
            length={list.tracks.length}
            fontSize={14}
          />
        </figcaption>
      </figure>
    </div>
  {/each}
</div>

<style lang="scss">
  .flex {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
  }

  .playlist-card {
    margin-bottom: 50px;
    margin-right: 20px;
    figcaption {
      padding-left: 5px;
      margin-top: 10px;
    }
  }
</style>
