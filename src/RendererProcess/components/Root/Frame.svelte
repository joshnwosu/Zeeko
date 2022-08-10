<script>
  import { ArrowLeftTwoIcon, MenuBoldIcon } from "../Icons";
  import {
    toggleCreatePlaylist,
    toggleNowPlaying,
    toggleSidebar,
  } from "../../store/status";

  import ActionButton from "./ActionButton.svelte";
  import { pop } from "svelte-spa-router";

  function handleNavigation() {
    // checks if Now playing or Create playlist modal is visible
    if ($toggleNowPlaying || $toggleCreatePlaylist) {
      $toggleNowPlaying = false;
      $toggleCreatePlaylist = false;
    } else {
      pop();
    }
  }
</script>

<div class="frame">
  <div class="left" />

  <div class="right">
    <ActionButton />
  </div>
</div>

<style lang="scss">
  .frame {
    width: calc(100% - 60px);
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0;
    right: 0;
    top: 0;
    -webkit-app-region: drag;
    position: fixed;
    z-index: 99999999;
    background-color: transparent;
    /* padding-right: 60px; */
    .left,
    .right {
      -webkit-app-region: no-drag;
    }
    .right {
      background-color: transparent;
    }
  }
</style>
