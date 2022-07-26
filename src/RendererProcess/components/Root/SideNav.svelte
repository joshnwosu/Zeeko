<script>
    let search = "";
    import Router, {link, location, pop, querystring} from "svelte-spa-router";
    import Favorite from "../Icons/Favorite.Icon.svelte";
    import MyMusic from "../Icons/MyMusic.Icon.svelte";
    import NowPlaying from "../Icons/NowPlaying.Icon.svelte";
    // import Play from "../Icons/PlayIcon.svelte";
    import Playlists from "../Icons/Playlists.Icon.svelte";
    import RecentPlays from "../Icons/RecentPlays.Icon.svelte";

    import Icon from "svelte-icons-pack/Icon.svelte"
    import plusIcon from "svelte-icons-pack/vsc/VscAdd";
    import searchIcon from "svelte-icons-pack/vsc/VscSearch";
    import SettingsIcon from "../Icons/Settings.Icon.svelte";
    import MenuIcon from "../Icons/Menu.Icon.svelte";
    import SearchIcon from "../Icons/Search.Icon.svelte";
    import PlusIcon from "../Icons/Plus.Icon.svelte";
    // import MenuIcon from "svelte-icons-pack/vsc/VscMenu";

    import active from 'svelte-spa-router/active'
    import BurgerMenu from "../Widget/BurgerMenu.svelte";
    import Start from "../Icons/Discover.Icon.svelte";
    import Discover from "../Icons/Discover.Icon.svelte";
    import Arrowback from "../Icons/Arrowback.Icon.svelte";

    
</script>
<div class="side-nav">
    
    <nav>
        <div>
            <!-- {$location.includes("/my-music/") && $location == '/my-music/'} -->
            <!-- <p>{search}</p> -->
            <!-- <div class="menu">
                <span class="icon">
                    <svelte:component this={MenuIcon} />
                </span>
                <p>Menu</p>
            </div> -->

            <div class="back" on:click={pop}>
                <span class="menu">
                    <span class="icon icon-menu">
                        <svelte:component this={Arrowback} />
                    </span>
                    <span class="player-name">
                        Zeeko Music
                    </span>
                </span>           
            </div>

            <div class="burger">
                <span class="menu">
                    <span class="icon icon-menu">
                        <svelte:component this={MenuIcon} />
                    </span>
                </span>           
            </div>

            <div class="search-bar">
                <span class="menu">
                    <span class="icon icon-menu">
                        <svelte:component this={SearchIcon} />
                    </span>
                    <span class="label">
                        Search
                    </span>
                </span>           
            </div>

            <!-- <div class="line"><span /></div> -->
            
            <div class="search">
                <input bind:value={search} placeholder="Search"  />
                <span class="search-icon">
                    <Icon src={searchIcon} color="#FFFFFF" size={16} />
                </span>
            </div>
            
            <div class="link">
                <a href={'/'} use:link={{href: '/' }} use:active={{path: '/', className: 'active', inactiveClassName: ''}} 
                >
                    <span class="icon">
                        <svelte:component this={Discover} />
                    </span>
                    <span class="label">
                        Discover
                    </span>
                </a>            
            </div>
            <div class="link">
                <a href={'/my-music/'} use:link={{href: '/my-music/' }} use:active={{path: '/my-music/*', className: 'active', inactiveClassName: ''}} 
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
            <div class="line"><span /></div>
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
            <div class="add-playlist">
                <span class="menu">
                    <span class="icon icon-menu">
                        <svelte:component this={PlusIcon} />
                    </span>
                    <span class="label">
                        Add playlist
                    </span>
                </span>           
            </div>
        </div>
        <div>
            <div class="line"><span /></div>
            <div class="link">
                <a href='/settings' use:link use:active={{className: 'active', inactiveClassName: ''}}>
                    <span class="icon">
                        <svelte:component this={SettingsIcon} />
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
    .back {
        .icon {
            transform: rotate(180deg);
        }
    }
    .player-name {
        margin-left: 20px;
    }
    .icon {
        align-items: center;
        padding-top: 0;
        margin: 0;
        /* margin-top: 5px; */
        /* background-color: red; */
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        &.icon-menu {
            padding-right: 20;
        }
        &.icon-menu:hover {
            background-color: rgba(68, 68, 68, .5);
        }
      }
    .line {
        width: 100%;
        padding: 0 10px;
        /* margin: 5px 0; */
        span {
            display: block;
            width: 100%;
            height: 1px;
            background-color: #222222;
        }
    }
    .side-nav {
        width: 300px;
        height: 100vh;
        background-color: #111111;
        /* padding-top: 50px; */
        padding-bottom: 100px;
        position: absolute;
        z-index: 200;
        left: 0;
        top: 0
    }

    /* .menu {
        display: flex;
        align-items: center;
        padding: 20px;
        p {
            font-size: 14px;
            font-weight: 400;
            margin-left: 20px;
        }
    } */

    .search {
        margin: 10px 10px;
        overflow: hidden;
        position: relative;
        input {
            background-color: #000000;
            width: 100%;
            height: 40px;
            padding: 0px 50px 0px 20px ;
            border: none;
            color: #FFFFFF;
            /* &:focus {
                background-color: #FFFFFF;
                color: #000000;
            } */
        }

        .search-icon {
            position: absolute;
            right: 0;
            top: 0;
            width: 50px;
            height: 100%;
            /* border: 1px solid red; */
            display: flex;
            justify-content: center;
            align-items: center;
            /* background-color: #111111; */
            cursor: pointer;
            /* &:hover {
                background-color: #222222;
            } */
        }
      }

    nav {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        /* background-color: red; */
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
        a, .menu {
            font-size: 14px ;
            font-weight: 200;
            /* padding: 0px 20px; */
            display: flex;
            align-items: center;
            color: #FFFFFF;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            flex: 1;
            cursor: pointer;
            /* border: 1px solid red; */
        
            &:hover:not(.menu) {
                background-color: rgba(68, 68, 68, .5);
            }
            &:not(a) {
                border: none;
            }
            .label {
                /* margin-left: 20px; */
                margin-bottom: 4px;
            }

      
        }
  }


  @media (max-width: 1000px) {
    /* .burger {
        display: none !important;
    } */
    .line {
        display: none !important;
    }
    .label, .player-name{
        display: none !important;
    }
    .search {
        display: none;
    }
    .side-nav{
      position: relative;
      width: 50px !important;
      border-right: 1px solid #222222;
     .link{
        a, .menu{
          padding: 0 !important;
          width: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          /* .label{
            display: none !important;
          } */
        }
        .plus-icon{
          display: none !important;
        }
      }
    }
  }

  @media (min-width: 1000px) {
    .add-playlist, .search-bar {
        display: none !important;
    }
  }
</style>