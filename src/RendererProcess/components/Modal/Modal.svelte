<script>
  import { toggleModal, toggleTransparency } from "../../store/status";
  import AddMusic from "../Widgets/AddMusic.svelte";
  import CreatePlaylist from "../Widgets/CreatePlaylist.svelte";
  import FileError from "../Widgets/FileError.svelte";
</script>

<div class="modal" class:show={$toggleModal != "close"}>
  <div class="overlay" />
  <div
    class="content"
    style="background-color: {$toggleTransparency ? '#12121250' : '#121212'}"
  >
    <div class="padding">
      {#if $toggleModal === "add-music"}
        <AddMusic />
      {:else if $toggleModal === "file-error"}
        <FileError />
      {:else if $toggleModal === "create-playlist"}
        <CreatePlaylist />
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  .modal {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    &.show {
      visibility: visible;
      opacity: 1;
    }
    .overlay {
      width: 100%;
      height: 100%;
      background-color: #00000050;
      position: absolute;
      z-index: 0;
    }

    .content {
      position: relative;
      z-index: 1;
      min-width: 400px;
      max-width: 400px;
      border: 1px solid #333333;
      backdrop-filter: blur(50px);
      .padding {
        position: relative;
        padding: 30px;
      }
    }
  }
</style>
