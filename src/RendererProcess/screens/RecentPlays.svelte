<script>
    import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition"
    import ScreenHeader from "../components/Root/ScreenHeader.svelte";
</script>
<main class="page" transition:fade>
    <ScreenHeader name="Recent plays" />
    <div class="screen-view">
        <p>Recent plays</p>
    </div>
</main>