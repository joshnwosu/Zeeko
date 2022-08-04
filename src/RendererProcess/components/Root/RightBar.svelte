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
    /* background-color: rgba(14, 18, 26, 1); */
    /* background-color: rgba(23, 28, 38, 0.9); */
    background-color: #12121280;
    width: 60px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* align-items: center; */
    padding: 10px 0 0;
    padding-bottom: 100px;
    padding-top: 50px;
    z-index: 999;
    /* border-left: 1px solid rgba(23, 28, 38, 1); */
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
          right: 60px;
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
        background-color: rgba(23, 28, 38, 0.95);
        background-color: #121212;
        position: absolute;
        right: 40px;
        padding: 8px 15px;
        border-radius: 3px;
        opacity: 0;
        visibility: hidden;
        font-size: 13px;
        letter-spacing: 0.5px;
        box-shadow: -2px 0px 10px 0px rgba(0, 0, 0, 0.1);
        transition: right 300ms ease-in-out;
        pointer-events: none;
      }
    }
  }
</style>
