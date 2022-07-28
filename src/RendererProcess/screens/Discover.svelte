<script>
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
</script>

<main class="page" transition:fade>
  <ScreenHeader />
  <div class="screen-view">
    <!-- <p>Discover</p> -->
  </div>
</main>
