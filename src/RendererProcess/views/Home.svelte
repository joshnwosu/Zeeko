<script>
    export let msg = "";
    import { fade, fly, slide, scale } from "svelte/transition"
</script>
<main class="page" transition:scale>
    <h1>Home page</h1>
    <input bind:value={msg}/>
</main>