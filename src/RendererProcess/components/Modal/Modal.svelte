<script>
  import AlbumModal from "./AlbumModal.svelte";
  import ArtistModal from "./ArtistModal.svelte";
</script>

<div class="modal">
  <ArtistModal />
  <AlbumModal />
</div>

<style lang="scss">
  .modal {
    width: 100%;
    height: 100%;
    background-color: red;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3;
  }
</style>
