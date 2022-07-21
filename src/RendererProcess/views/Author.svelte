<script>
    export let params = {}
    import {fade, fly, slide, scale} from "svelte/transition"
    
</script>

<main class="page" transition:slide>
    <h1>{params.first} {params.last}</h1>
</main>