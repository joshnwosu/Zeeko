<script>
  import { push } from "svelte-spa-router";
  import { toggleSidebar } from "../../store/clickFunc";

  import { HeartIcon, SettingIcon, SunnyIcon } from "../Icons";
</script>

<nav class="right-nav">
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
  .right-nav {
    background-color: #12121280;
    width: 60px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 0 0;
    padding-bottom: 100px;
    padding-top: 50px;
    z-index: 999;
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
        background-color: #ffffff10;
        .tooltip {
          visibility: visible;
          opacity: 1;
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
      }
    }
  }
</style>
