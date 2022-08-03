<script>
  import { push } from "svelte-spa-router";
  import { toggleSidebar } from "../../store/clickFunc";

  // import { HeartIcon, SettingIcon, SunnyIcon } from "../Icons";

  import {
    SearchIcon,
    HomeIcon,
    HeartIcon,
    MusicFilterIcon,
    MusicIcon,
    MusicPlaylistIcon,
    ClockIcon,
    NoteIcon,
  } from "../Icons";
</script>

<nav class="left-nav" class:show={$toggleSidebar}>
  <ul class="top">
    <li on:click={() => push("/favorite")}>
      <span class="icon">
        <svelte:component this={SearchIcon} />
      </span>
      <span class="tooltip">Search</span>
    </li>
    <li on:click={() => push("/favorite")}>
      <span class="icon">
        <svelte:component this={HomeIcon} />
      </span>
      <span class="tooltip">Discover</span>
    </li>
    <li>
      <span class="icon" on:click={() => ($toggleSidebar = !$toggleSidebar)}>
        <svelte:component this={MusicIcon} />
      </span>
      <span class="tooltip">My music</span>
    </li>
    <li on:click={() => push("/settings")}>
      <span class="icon">
        <svelte:component this={ClockIcon} />
      </span>
      <span class="tooltip">Recent plays</span>
    </li>
    <li on:click={() => push("/favorite")}>
      <span class="icon">
        <svelte:component this={NoteIcon} />
      </span>
      <span class="tooltip">Now playing</span>
    </li>
    <li>
      <span class="icon" on:click={() => ($toggleSidebar = !$toggleSidebar)}>
        <svelte:component this={MusicPlaylistIcon} />
      </span>
      <span class="tooltip">Playlists</span>
    </li>
  </ul>
</nav>

<style lang="scss">
  .left-nav {
    background-color: rgba(14, 18, 26, 1);
    background-color: #000000;
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
    padding-top: 100px;
    z-index: 999;
    transition: transform 300ms ease-in-out;
    border-right: 1px solid #171c26;
    border-right: 1px solid #121212;
    &.show {
      z-index: 9999 !important;
    }
  }

  .top {
    display: flex;
    flex-direction: column;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      cursor: pointer;
      position: relative;
      /* background-color: red; */
      &:hover {
        background-color: #171c26;
        background-color: #121212;
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
          width: 20px;
          height: 20px;
        }
      }

      .tooltip {
        background-color: rgba(23, 28, 38, 0.95);
        background-color: #12121280;
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
        white-space: nowrap;
      }
    }
  }
</style>
