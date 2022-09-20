<script>
  import Track from "../components/Track/Track.svelte";
  import ScrollView from "../components/Widgets/ScrollView.svelte";
  import { playerStore } from "../store/player";
</script>

<ScrollView>
  <Track tracks={$playerStore} />
</ScrollView>
