<script>
    import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition"
    import ScreenHeader from "../components/Root/ScreenHeader.svelte";
</script>
<main class="page" transition:fade>
    <ScreenHeader name="Favorite" />
    <div class="screen-view">
        <p>Favorite</p>
    </div>
</main>