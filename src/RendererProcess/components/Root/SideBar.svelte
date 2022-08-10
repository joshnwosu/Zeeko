<script>
  let search = "";
  import {
    ArrowLeftIcon,
    ArrowRightIcon,
    SearchIcon,
    HomeIcon,
    HeartIcon,
    MusicFilterIcon,
    MusicIcon,
    MusicPlaylistIcon,
    ClockIcon,
    NoteIcon,
    HomeBoldIcon,
    MusicBoldIcon,
    MenuBoldIcon,
    AddIcon,
    ArrowLeftTwoIcon,
  } from "../Icons";
  import { link, location, pop, querystring } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
  import {
    toggleCreatePlaylist,
    toggleNowPlaying,
    toggleSidebar,
  } from "../../store/status";
  import { handleToggleSidebar } from "../../store/statusManager";

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

<div class="side-nav" class:toggle-sidenav={$toggleSidebar}>
  <div>
    <div class="logo">
      <div class="logo-inner">
        <p>Z</p>
      </div>
      <h3>eeko music</h3>
    </div>
  </div>

  <div class="scroll-nav">
    <nav>
      <ul>
        <div class="ul-head">Menu</div>
        <li class="menu-li">
          <span class="icon" on:click={handleNavigation}>
            <svelte:component this={ArrowLeftTwoIcon} />
          </span>
          <!-- <span class="label"> Menu </span> -->
        </li>
        <li class="menu-li">
          <span class="icon" on:click={handleToggleSidebar}>
            <svelte:component this={MenuBoldIcon} />
          </span>
          <!-- <span class="label"> Menu </span> -->
        </li>
        <div class="search-bar">
          <span class="icon">
            <svelte:component this={SearchIcon} />
          </span>
          <input bind:value={search} placeholder="Search" />
        </div>
        <li class:active-link-li={$location == "/"}>
          <a
            href={"/"}
            use:link
            use:active={{ className: "active-link", inactiveClassName: "" }}
          >
            <span class="icon">
              <svelte:component this={HomeIcon} />
            </span>
            <span class="label"> Discover </span>
          </a>
        </li>
        <li class:active-link-li={$location.includes("/my-music/")}>
          <a
            href={"/my-music/"}
            use:link
            use:active={{
              path: "/my-music/*",
              className: "active-link",
              inactiveClassName: "",
            }}
          >
            <span class="icon">
              <svelte:component this={MusicIcon} />
            </span>
            <span class="label"> My music </span>
          </a>
        </li>
        <li class:active-link-li={$location == "/recent-plays"}>
          <a
            href={"/recent-plays"}
            use:link
            use:active={{ className: "active-link", inactiveClassName: "" }}
          >
            <span class="icon">
              <svelte:component this={ClockIcon} />
            </span>
            <span class="label"> Recent plays </span>
          </a>
        </li>
        <!-- <li class:active-link-li={$location == "/now-playing"}>
          <a
            href={"/now-playing"}
            use:link
            use:active={{ className: "active-link", inactiveClassName: "" }}
          >
            <span class="icon">
              <svelte:component this={NoteIcon} />
            </span>
            <span class="label"> Now playing </span>
          </a>
        </li> -->
        <li on:click={() => ($toggleNowPlaying = !$toggleNowPlaying)}>
          <span class="icon">
            <svelte:component this={NoteIcon} />
          </span>
          <span class="label"> Now playing </span>
        </li>

        <div class="ul-head">Playlists</div>

        <li class:active-link-li={$location == "/playlists"}>
          <a
            href={"/playlists"}
            use:link
            use:active={{ className: "active-link", inactiveClassName: "" }}
          >
            <span class="icon">
              <svelte:component this={MusicPlaylistIcon} />
            </span>
            <span class="label"> Playlists </span>
          </a>
        </li>
        <li on:click={() => ($toggleCreatePlaylist = !$toggleCreatePlaylist)}>
          <span class="icon">
            <svelte:component this={AddIcon} />
          </span>
          <span class="label"> Add playlist </span>
          <!-- <span class="label">你好吗 我很好</span> -->
        </li>
      </ul>
    </nav>
  </div>
</div>

<style lang="scss">
  .side-nav {
    background-color: #12121280;
    width: 300px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    padding-top: 0px;
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    transition: all 300ms ease-in-out;
    &.toggle-sidenav {
      nav {
        ul {
          .ul-head {
            display: none;
          }
        }
      }
    }
  }

  .label {
    font-size: 12px;
    color: #ffffff;
    white-space: nowrap;
  }
  .icon {
    width: 60px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    :global(svg) {
      width: 20px;
      height: 20px;
    }
  }

  .logo {
    padding: 0px 20px 20px;
    display: flex;
    align-items: center;
    display: none;
    .logo-inner {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #65e14d;
      margin-right: 5px;
      p {
        font-family: "Harlow Solid";
        font-size: 30px;
        font-weight: 900;
        color: rgba(23, 28, 38, 0.9);
      }
    }
    h3 {
      font-family: "Operator mono";
      font-size: 20px;
      font-weight: 400;
    }
  }

  .search-bar {
    margin: 0px 0px;
    overflow: hidden;
    position: relative;
    input {
      background-color: rgba(0, 0, 0, 0.5);
      width: 100%;
      height: 50px;
      padding: 0px 50px 0px 60px;
      border: none;
      color: #ffffff;
      font-size: 16px;
    }
    .icon {
      position: absolute;
      left: 0;
      top: 0;
      width: 60px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }

  .scroll-nav {
    overflow-y: auto;
    flex: 1;
    &::-webkit-scrollbar-track-piece:end {
      background: transparent;
      margin-bottom: 0px;
    }
  }
  nav {
    ul {
      .ul-head {
        font-size: 12px;
        font-weight: 600;
        color: #ffffff;
        opacity: 0.5;
        padding-left: 20px;
        margin-bottom: 10px;
        text-transform: uppercase;
        display: none;
      }
      li {
        padding: 0px 0px;
        position: relative;
        display: flex;
        align-items: center;
        &.menu-li {
          .icon {
            cursor: default;
            &:hover {
              background-color: #ffffff10;
            }
          }
        }
        &:hover:not(.menu-li) {
          background-image: linear-gradient(90deg, #ffffff10, transparent);
          .icon {
            :global(.svg-icon-bold) {
              :global(path) {
                fill: #ffffff;
              }
            }
            :global(.svg-icon-outline) {
              :global(path) {
                stroke: #ffffff;
              }
            }
          }
        }
        &.active-link-li::after {
          content: "";
          position: absolute;
          width: 4px;
          height: 30px;
          background-color: #65e14d !important;
          top: 50%;
          right: 0;
          transform: translate(-50%, -50%);
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }
        a {
          font-size: 12px;
          font-weight: 400;
          display: flex;
          align-items: center;
          flex: 1;
          cursor: default;

          &.active-link {
            .label {
              color: #65e14d !important;
            }
            .icon {
              :global(.svg-icon-bold) {
                :global(path) {
                  fill: #65e14d !important;
                }
              }
              :global(.svg-icon-outline) {
                :global(path) {
                  stroke: #65e14d !important;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
