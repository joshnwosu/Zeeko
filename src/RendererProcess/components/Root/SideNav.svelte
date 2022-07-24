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
    import Settings from "../Icons/Settings.Icon.svelte";

    import active from 'svelte-spa-router/active'

    
</script>
<div class="side-nav">
    <nav>
        <div>
            <!-- {#each navigations as navigation } -->
            <div class="link">
                <a href={'/my-music/'} use:link use:active={{path: '/my-music/*', className: 'active', inactiveClassName: ''}} 
                >
                    <span class="icon">
                        <svelte:component this={MyMusic} />
                    </span>
                    <span class="label">
                        My music
                    </span>
                </a>            
            </div>
            <div class="link">
                <a href={'/recent-plays'} use:link use:active={{className: 'active', inactiveClassName: ''}} 
                >
                    <span class="icon">
                        <svelte:component this={RecentPlays} />
                    </span>
                    <span class="label">
                        Recent plays
                    </span>
                </a>            
            </div>
            <div class="link">
                <a href={'/now-playing'} use:link use:active={{className: 'active', inactiveClassName: ''}} 
                >
                    <span class="icon">
                        <svelte:component this={NowPlaying} />
                    </span>
                    <span class="label">
                        Now playing
                    </span>
                </a>            
            </div>
            <div class="link">
                <a href={'/favorite'} use:link use:active={{className: 'active', inactiveClassName: ''}} 
                >
                    <span class="icon">
                        <svelte:component this={Favorite} />
                    </span>
                    <span class="label">
                        Favorite
                    </span>
                </a>            
            </div>
            <!-- {/each} -->
            <div class="line"><span /></div>
            <div class="link">
                <a href='/playlists' use:link use:active={{className: 'active', inactiveClassName: ''}}>
                    <span class="icon">
                        <svelte:component this={Playlists} />
                    </span>
                    <span class="label">
                        Playlists
                    </span>
                </a>
                
                <div class="title-action plus-icon" on:click={() => console.log('plus icon')}>
                    <Icon src={plusIcon} color="#FFFFFF" size={14} />
                </div>
                
            </div>
        </div>
        <div>
            <div class="line"><span /></div>
            <div class="link">
                <a href='/settings' use:link use:active={{className: 'active', inactiveClassName: ''}}>
                    <span class="icon">
                        <svelte:component this={Settings} />
                    </span>
                    <span class="label">
                        Settings
                    </span>
                </a>
            </div>
        </div>
    </nav>
</div>

<style lang="scss">
    .line {
        width: 100%;
        padding: 0 10px;
        span {
            display: block;
            width: 100%;
            height: 1px;
            background-color: #333;
        }
    }
    .side-nav {
        width: 300px;
        height: calc(100vh - 80px); // 150px is the height of the player-control
        background-color: #111111;
        background-color: rgba(17, 17, 17, 0.9);
        padding-top: 100px;
        padding-bottom: 10px;
        /* padding-left: 20px; */
    }
    nav {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        .link {
            display: flex;
            height: 50px;
        }
        .title-action {
            position: relative;
            width: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
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
        
        &:hover {
            background-color: rgba(68, 68, 68, .5);
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