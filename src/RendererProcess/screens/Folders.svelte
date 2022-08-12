<script>
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
</script>

<main class="page" transition:fade>
  <ScreenHeader title="Folders" />
  <div class="screen-view">
    <!-- <p>Folders</p> -->
  </div>
</main>
