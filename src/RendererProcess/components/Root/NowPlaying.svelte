<script>
  import { queuelistStore } from "../../store/player";
  import TrackLists from "../Track/TrackLists.svelte";
  import TrackListsNew from "../Track/TrackListsNew.svelte";
  import TrackListTag from "../Track/TrackListTag.svelte";
  let tag = true;
</script>

<div class="now-playing">
  <div class="track-list">
    {#if tag}
      <TrackListTag tracks={$queuelistStore} />
    {:else}
      <TrackListsNew tracks={$queuelistStore} />
    {/if}
  </div>
</div>

<style lang="scss">
  .now-playing {
    width: 100%;
    height: 100%;
    padding: 50px;
    position: absolute;
    top: 0;

    .track-list {
      height: calc(100% - 100px);
      overflow-y: auto;
      margin-top: 20px;
    }
  }
</style>
