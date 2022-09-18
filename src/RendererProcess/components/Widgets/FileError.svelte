<script>
  import { selectedSong } from "../../store/player";
  import { nextSong } from "../../store/playerManager";
  import { WarningIcon } from "../Icons";
  import Button from "./Button.svelte";
</script>

<div class="modal-content">
  <div class="modal-content-header">
    <svelte:component this={WarningIcon} />
    <h2>File error</h2>
  </div>

  <p>
    Can't play. An error occured trying to play the file. Close to skip to next
    track.
  </p>

  <p class="file-location">
    File Location:
    <span>{$selectedSong}</span>
  </p>
  <!-- <div class="modal-button-wrapper">
      <button on:click={onClose}>Close</button>
    </div> -->
  <Button on:close={nextSong}>Close</Button>
</div>

<style lang="scss">
  .modal-content {
    width: 400px;
    background-color: #121212;
    padding: 20px;
    color: #ffffff;
    position: relative;
    z-index: 2;
    .modal-content-header {
      display: flex;
      align-items: center;
      h2 {
        font-weight: 400;
        font-size: 18px;
        margin-left: 10px;
      }
      :global(svg) {
        :global(path) {
          fill: orangered;
        }
      }
    }
    p {
      font-size: 14px;
      line-height: 1.5;
      margin: 20px 0;
      &.file-location {
        font-size: 12px;
        span {
          opacity: 0.5;
          display: block;
        }
      }
    }
    /* .modal-button-wrapper {
      display: flex;
      justify-content: flex-end;
      button {
        background-color: #333333;
        padding: 10px 50px;
        color: #fff;
        font-weight: 200;
        font-size: 12px;
      }
    } */
  }
</style>
