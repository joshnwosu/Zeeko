<script>
  import { AddIcon, EditIcon, PlayIcon, TrashIcon } from "../Icons";
</script>

<div class="content">
  <button>
    <svelte:component this={PlayIcon} />
    <p>Play all</p>
  </button>
  <button>
    <svelte:component this={AddIcon} />
    <p>Add to</p>
  </button>
  <button>
    <svelte:component this={EditIcon} />
    <p>Rename</p>
  </button>
  <button>
    <svelte:component this={TrashIcon} />
    <p>Delete</p>
  </button>
  <!--  -->
</div>

<style lang="scss">
  .content {
    display: flex;
    align-items: center;
    margin-left: -20px;
    button {
      display: flex;
      align-items: center;
      padding: 10px 20px;
      border-radius: 20px;
      &:hover {
        background-color: #ffffff20;
      }
      p {
        margin-left: 10px;
        color: #ffffff;
        font-size: 12px;
        font-weight: 300;
      }
      /* :global(svg) {
        width: 25px;
        height: 25px;
      } */
    }
  }
</style>
