<script>
  import { selectedSong } from "../../store/player";
  import { nextSong } from "../../store/playerManager";
  import { WarningIcon } from "../Icons";
  import Button from "./Button.svelte";
</script>

<div class="file-error">
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
<Button on:close={nextSong}>Close</Button>

<style lang="scss">
  .file-error {
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
</style>
