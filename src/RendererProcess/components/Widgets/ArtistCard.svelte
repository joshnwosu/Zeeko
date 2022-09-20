<script>
  export let data;
  import { handleRouting } from "../../store/statusManager";
  import { UserIcon } from "../Icons";
</script>

<div class="card-container">
  {#each data as child}
    <div
      class="card"
      on:click={() => {
        handleRouting(`#/artist-details/${child.name}`);
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

<style lang="scss">
  .card-container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  .card {
    width: 150px;
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
      width: 150px;
      height: 150px;
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
</style>
