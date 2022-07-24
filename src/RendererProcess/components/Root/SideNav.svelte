<script>
    import Router, {link, location, querystring} from "svelte-spa-router";
import Favorite from "../Icons/Favorite.Icon.svelte";
    import MyMusic from "../Icons/MyMusic.Icon.svelte";
    import NowPlaying from "../Icons/NowPlaying.Icon.svelte";
    import Play from "../Icons/Play.Icon.svelte";
    import Playlists from "../Icons/Playlists.Icon.svelte";
    import RecentPlays from "../Icons/RecentPlays.Icon.svelte";

    import Icon from "svelte-icons-pack/Icon.svelte"
    import plusIcon from "svelte-icons-pack/vsc/VscAdd";


    const navigations = [
        {
            label: 'My music',
            route: '/my-music/',
            icon: MyMusic
        },
        {
            label: 'Recent plays',
            route: '/recent-plays',
            icon: RecentPlays
        },
        {
            label: 'Now playing',
            route: '/now-playing',
            icon: NowPlaying
        },
        {
            label: 'Favorite',
            route: '/favorite',
            icon: Favorite
        },
        {
            label: 'Playlists',
            route: '/playlists',
            icon: Playlists
        }
    ]
    
</script>
<div class="side-nav">
    <nav>
        {#each navigations as navigation }
        <div class="link">
            <a href={navigation.route} use:link class={$location.indexOf(navigation.route) > -1 ? "active" : ""}>
                <span class="icon">
                    <svelte:component this={navigation.icon} />
                </span>
                <span class="label">
                    {navigation.label}
                </span>
            </a>
            
            {#if navigation.label == 'Playlists' }
                <div class="title-action plus-icon" on:click={() => console.log('plus icon')}>
                    <Icon src={plusIcon} color="#FFFFFF" size={14} />
                </div>
            {/if}
            
        </div>
        {/each}
    </nav>
</div>

<style lang="scss">
    .side-nav {
        width: 300px;
        height: calc(100vh - 80px); // 150px is the height of the player-control
        background-color: #111111;
        padding-top: 50px;
        /* padding-left: 20px; */
    }
  nav {
    position: relative;
    display: flex;
    flex-direction: column;
    .link {
        display: flex;
        /* align-items: center; */
        /* flex: 1; */
        /* border: 1px solid blue; */
        height: 50px;
    }

    /* .plus-icon {
        height: 50px;
    } */

    .title-action {
        /* background-color: transparent; */
        position: relative;
        width: 50px;
        /* height: 100%; */
        display: flex;
        /* flex: 1; */
        justify-content: center;
        align-items: center;
        cursor: pointer;
        /* z-index: 999; */
    }

    .title-action:hover:not(.close-icon) {
        background-color: #333333;
    }

    a {
      font-size: 14px ;
      padding: 10px 20px;
      display: flex;
      align-items: center;
      color: #FFFFFF;
      border-left: 4px solid transparent;
      flex: 1;
      /* height: 50px; */
      
      &:hover {
        background-color: rgba(68, 68, 68, .5);
      }

      &.active {
        border-left: 4px solid rgb(68, 68, 68);
      }

      .icon {
        align-items: center;
        padding: 0;
        margin: 0;
        margin-top: 5px;
      }

      .label {
        margin-left: 20px;
      }
    }
  }
</style>