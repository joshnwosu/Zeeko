<script>
  import { fade, fly, scale, slide, crossfade, draw } from "svelte/transition";
  import ScreenHeader from "../components/Root/ScreenHeader.svelte";
  import Slidy from "../components/Widgets/Slidy.svelte";
</script>

<main class="page" transition:fade>
  <ScreenHeader title="Discover" />
  <div class="screen-view">
    <!-- <Slidy /> -->
  </div>
</main>
