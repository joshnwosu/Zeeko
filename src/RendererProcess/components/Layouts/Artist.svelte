<script>
  import { push } from "svelte-spa-router";
  import { sortAndGroupAlphabetically } from "../../utilities";
  import { UserIcon } from "../Icons";
  import StickyHeader from "../Widgets/StickyHeader.svelte";

  export let data;
  $: artists = sortAndGroupAlphabetically(data) || [];
</script>

<div class="wrapper">
  {#each artists as artist}
    <StickyHeader>
      {artist.group}
    </StickyHeader>
    <div class="card-container">
      {#each artist?.children as child}
        <div
          class="card"
          on:click={() => {
            push(`#/artist-details/${child.name}`);
          }}
        >
          <div class="figure">
            <svelte:component this={UserIcon} />
          </div>
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
    .card-container {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;

      .card {
        width: 200px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        &:hover {
          .figure {
            background-color: #333333;
          }
        }

        .figure {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background-color: #121212;
          display: flex;
          justify-content: center;
          align-items: center;
          :global(svg) {
            width: 50px;
            height: 50px;
            opacity: 0.5;
          }
        }

        .content {
          padding: 10px 10px;
          P {
            font-size: 12px;
            line-height: 1.5;
            color: #ffffff;
            white-space: pre-wrap;
            text-align: center;
          }
        }
      }
    }
  }
</style>
