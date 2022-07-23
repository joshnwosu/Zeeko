<script>
    export let params = {}
    import {fade, fly, scale, slide, crossfade, draw} from "svelte/transition"
</script>
<main class="page" transition:fade>
    <h1>{params && 'Page Not Found'}</h1>
</main>