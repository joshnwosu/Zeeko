<script>
    export let params = {}
    import {slide, scale} from "svelte/transition"
</script>
<main class="page" transition:slide>
    <h1>{params && 'Page Not Found'}</h1>
</main>