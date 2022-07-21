<script>
    export let msg = "";
    export let trackName;
    export let trackIndex;
    import { fade, fly, slide, scale } from "svelte/transition";

    const tracks = ["Omah Lay", "Johnny Drille", "Ruger", "BNXN", "Justin Beiber"];

    const showContext = (e, track, index) => {
        e.preventDefault();
        const cordinates = {
            x: e.clientX,
            y: e.clientY,
            width: e.target.offsetWidth,
            height: e.target.offsetHeight,
        }
        const contextOptions = document.querySelector(".contextOptions")

        console.log('Cordinates: ', cordinates)
        console.log('Parent Element: ', e)
        if(cordinates.y > 500) cordinates.y = 500;
        if(cordinates.x > 500) cordinates.x = cordinates.x - contextOptions.offsetWidth;
        
        contextOptions.style.height = `0px`;
        contextOptions.style.top = `${cordinates.y}px`;
        contextOptions.style.left = `${cordinates.x}px`;
        setTimeout(() => {
            contextOptions.style.height = `200px`
        }, 100)

        // set track details
        trackName = track;
        trackIndex = index;
    }

    const playTrack = (e, track, index) => {
        console.log('Playing Track...', {track, index})
        
    }
</script>
<main class="page" transition:slide>
    <h1>Home page</h1>
    {#each tracks as track, index}
        <div on:contextmenu={(e) => showContext(e, track, index)} on:click={(e) => playTrack(e, track, index)} class="track">{track}-{index}</div>
    {/each}
    <input bind:value={msg}/>

    <div class="contextOptions">
        <div class="options">
            <div>Track Name: {trackName}</div>
            <div>Track Index: {trackIndex}</div>
        </div>
        
    </div>
</main>

<style>
    .contextOptions {
        width: 200px;
        height: 0px;
        background-color: #444444;
        position: fixed;
        z-index: 90;
        top: 0;
        left: 10px;
        overflow: hidden;
        box-shadow: 0px 0px 15px rgba(0,0,0,0.597) !important;
        transition: 0.2s ease;
    } 
    .options {
        padding: 20px;
}
    .track{
        border: 1px solid blue;
        padding: 10px;
    }
</style>