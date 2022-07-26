<script>
    export let params = {};
    console.log(params) // just for removing the annoying warning

    import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
    import Router, {link, location, querystring} from "svelte-spa-router";
    import active from 'svelte-spa-router/active'
    import Home from "../views/Home.svelte";
    import ScreenHeader from "../components/Root/ScreenHeader.svelte";

    import ArtistIcon from "../components/Icons/Artist.Icon.svelte";
    import AlbumIcon from "../components/Icons/Album.Icon.svelte";
    import FolderIcon from "../components/Icons/Folder.Icon.svelte";
    import SongIcon from "../components/Icons/Song.Icon.svelte";
    
</script>
<main class="page" transition:fade>
    <ScreenHeader name="My music">
        <div class="song-tab">
            <nav>
                <a href="/my-music/" use:link use:active={{className: "active-tab", inactiveClassName: ""}}>
                    <svelte:component this={SongIcon} />
                    <span>Songs</span>
                </a>
                <a href="/my-music/artists" use:link use:active={{className: "active-tab", inactiveClassName: ""}}>
                    <svelte:component this={ArtistIcon} />
                    <span>Artists</span>
                </a>
                <a href="/my-music/albums" use:link use:active={{className: "active-tab", inactiveClassName: ""}}>
                    <svelte:component this={AlbumIcon} />
                    <span>Albums</span>
                </a>
                <a href="/my-music/folders" use:link use:active={{className: "active-tab", inactiveClassName: ""}}>
                    <svelte:component this={FolderIcon} />
                    <span>Folders</span>
                </a>
            </nav>
        </div>
    </ScreenHeader>
    <div class="screen-view">
        {#if $location == "/my-music/" }
            <h1>Songs</h1>
        {:else if $location == '/my-music/artists'}
            <h1>Artists</h1>
        {:else if $location == '/my-music/albums'}
            <h1>Albums</h1>
        {:else if $location == '/my-music/folders'}
            <h1>Folders</h1>
        {/if}
    
        <!-- <h1>Location: {$location}</h1> -->
        <!-- <h1>Query: {$querystring}</h1> -->
        <!-- <h1>Hello world</h1> -->
    </div>
    
</main>

<style>
    .song-tab {
        /* border-bottom: 1px solid red; */
        margin-top: 20px;
        /* background-color: blue; */
    }
    .song-tab nav {
        display: flex;
        overflow-x: auto;
    }
    .song-tab nav::-webkit-scrollbar {
        display: none;
    }
    .song-tab a {
        font-size: 10px;
        font-weight: 400;
        color: #FFFFFF;
        margin-right: 10px;
        padding: 7px 20px;
        border-radius: 20px;
        background-color: #111;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        /* border-bottom: 2px solid transparent; */
    }
    .song-tab a span {
        margin-left: 10px;
    }


</style>