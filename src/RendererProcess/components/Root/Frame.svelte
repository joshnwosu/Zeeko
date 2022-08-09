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
  <div class="left">
    <div class="navigation-action-button">
      <span on:click={handleNavigation}>
        <svelte:component this={ArrowLeftTwoIcon} />
      </span>
    </div>
    <span class="icon" on:click={() => ($toggleSidebar = !$toggleSidebar)}>
      <svelte:component this={MenuBoldIcon} />
    </span>
  </div>

  <div class="right">
    <ActionButton />
  </div>
</div>

<style lang="scss">
  .frame {
    width: 100%;
    height: 40px;
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
    .left {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .icon {
        width: 60px;
        height: 100%;
        display: flex;
        display: none;
        justify-content: center;
        align-items: center;
        cursor: default;
        &:hover {
          background-color: #ffffff20;
          :global(svg) {
            :global(path) {
              fill: #ffffff;
            }
          }
        }
      }
    }
  }

  .navigation-action-button {
    display: flex;
  }

  .navigation-action-button span {
    width: block;
    width: 60px;
    height: 40px;
    cursor: default;
    display: flex;
    justify-content: center;
    align-items: center;
    :global(svg) {
      width: 20px !important;
      height: 20px !important;
    }
  }

  .navigation-action-button span:hover {
    background-color: #ffffff20;
    :global(svg) {
      :global(path) {
        stroke: #ffffff !important;
      }
    }
  }

  .navigation-action-button span:nth-child(2) {
    opacity: 0.3;
    pointer-events: none;
  }
</style>
