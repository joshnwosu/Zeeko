<script>
  import { push } from "svelte-spa-router";
  import { toggleSidebar } from "../../store/clickFunc";

  import { HeartIcon, SettingIcon, SunnyIcon } from "../Icons";
</script>

<nav class="left-nav" class:show={$toggleSidebar}>
  <ul class="top">
    <li on:click={() => push("/favorite")}>
      <span class="icon">
        <svelte:component this={HeartIcon} />
      </span>
      <span class="tooltip">Favorite</span>
    </li>
  </ul>

  <ul class="bottom">
    <li>
      <span class="icon" on:click={() => ($toggleSidebar = !$toggleSidebar)}>
        <svelte:component this={SunnyIcon} />
      </span>
      <span class="tooltip">Theme</span>
    </li>
    <li on:click={() => push("/settings")}>
      <span class="icon">
        <svelte:component this={SettingIcon} />
      </span>
      <span class="tooltip">Manage</span>
    </li>
  </ul>
</nav>

<style lang="scss">
  .left-nav {
    background-color: rgba(14, 18, 26, 1);
    width: 60px;
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* align-items: center; */
    padding: 10px 0 0;
    padding-bottom: 100px;
    padding-top: 50px;
    z-index: 999;
    transition: transform 300ms ease-in-out;
    &.show {
      z-index: 9999;
    }
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
      cursor: pointer;
      position: relative;
      &:hover {
        .tooltip {
          visibility: visible;
          opacity: 1;
          left: 60px;
        }

        .icon {
          :global(svg) {
            :global(path) {
              stroke: #ffffff;
            }
          }
        }
      }

      .icon {
        :global(svg) {
          width: 25px;
          height: 25px;
        }
      }

      .tooltip {
        background-color: rgba(23, 28, 38, 0.95);
        position: absolute;
        left: 40px;
        padding: 8px 15px;
        border-radius: 3px;
        opacity: 0;
        visibility: hidden;
        font-size: 13px;
        letter-spacing: 0.5px;
        box-shadow: -2px 0px 10px 0px rgba(0, 0, 0, 0.1);
        transition: left 300ms ease-in-out;
        pointer-events: none;
      }
    }
  }
</style>
