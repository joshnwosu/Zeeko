<script>
  import { toggleModal } from "../../store/status";
  import { handleToggleModal } from "../../store/statusManager";
  import Button from "./Button.svelte";
</script>

<div class="add-music">
  <div>
    <h1>Create playlist from local music files</h1>
    <p>Folders you've added</p>
  </div>
</div>
<p>This is a modal..</p>
<Button>close</Button>

<style lang="scss">
  .add-music {
    border: 1px solid red;
  }
</style>
