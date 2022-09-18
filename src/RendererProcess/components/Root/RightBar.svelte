<script>
  import { push } from "svelte-spa-router";
  import { playlistStore } from "../../store/player";
  import {
    toggleControlStyle,
    toggleDim,
    toggleTransparency,
  } from "../../store/status";
  import { handleToggleDimMode } from "../../store/statusManager";
  import Likey from "../Addon/Likey.svelte";
  import {
    CubeIcon,
    HeartIcon,
    HeartBoldIcon,
    MoonIcon,
    SettingIcon,
    SunnyIcon,
    CoffeeIcon,
  } from "../Icons";
</script>

<nav
  class="right-nav"
  style="background-color: {$toggleTransparency
    ? '#12121280'
    : '#121212'} ; padding-bottom: {$toggleControlStyle ? '0px' : '100px'}"
>
  <ul class="top">
    <li>
      <span class="icon">
        <svelte:component this={CoffeeIcon} />
      </span>
      <span class="tooltip">Buy Me A Coffee 🥤😊</span>
    </li>
    <li on:click={() => push("/playlist-details/Favorites")}>
      <span class="icon">
        <svelte:component this={HeartIcon} />
      </span>
      <span class="tooltip">Favorites</span>
    </li>
    <!-- <li>
      <span class="icon">
        <svelte:component this={CubeIcon} />
      </span>
      <span class="tooltip">Zen mode</span>
    </li> -->
    <Likey />
  </ul>

  <ul class="bottom">
    <li class="icon" on:click={() => handleToggleDimMode(!$toggleDim)}>
      <span>
        <svelte:component this={$toggleDim ? MoonIcon : SunnyIcon} />
      </span>
      <span class="tooltip">
        {$toggleDim ? "Dim mode: On" : "Dim mode: Off"}
      </span>
    </li>
    <li on:click={() => push("/settings")}>
      <span class="icon">
        <svelte:component this={SettingIcon} />
      </span>
      <span class="tooltip">Settings</span>
    </li>
  </ul>
</nav>

<style lang="scss">
  .right-nav {
    background-color: #12121280;
    width: 60px;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* padding: 20px 0; */
    padding-top: 20px;
    /* padding-bottom: 100px; */
    z-index: 99;
    transition: padding 300ms ease-in-out;
  }

  .bottom,
  .top {
    display: flex;
    flex-direction: column;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      cursor: default;
      position: relative;
      &:hover {
        background-color: #ffffff10;
        .tooltip {
          visibility: visible;
          opacity: 1;
        }
      }

      .icon {
        :global(svg) {
          width: 20px;
          height: 20px;
        }
      }

      .tooltip {
        background-color: #121212;
        position: absolute;
        right: 60px;
        padding: 8px 15px;
        border-radius: 3px;
        opacity: 1;
        visibility: hidden;
        font-size: 13px;
        letter-spacing: 0.5px;
        box-shadow: -2px 0px 10px 0px rgba(0, 0, 0, 0.1);
        pointer-events: none;
        white-space: nowrap;
      }
    }
  }
</style>
