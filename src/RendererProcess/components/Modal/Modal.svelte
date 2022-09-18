<script>
  import { toggleModal } from "../../store/status";

  // export let show;

  import AddMusic from "../Widgets/AddMusic.svelte";
  import CreatePlaylist from "../Widgets/CreatePlaylist.svelte";
  import FileError from "../Widgets/FileError.svelte";

  // $: console.log(show);
  // let show = true;
  // let name = "file-error";
</script>

<div class="modal" class:show={$toggleModal != "close"}>
  <div class="overlay" />
  <div class="content">
    <!-- <slot class="content" /> -->
    {#if $toggleModal === "add-music"}
      <AddMusic />
    {:else if $toggleModal === "file-error"}
      <FileError />
    {:else if $toggleModal === "create-playlist"}
      <CreatePlaylist />
    {/if}
  </div>
</div>

<style lang="scss">
  .modal {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: 0.2s ease;

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
      background-color: #00000080;
      position: absolute;
      z-index: 0;
    }

    .content {
      position: relative;
      z-index: 1;
    }
  }
</style>
