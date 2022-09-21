<script>
  import { playbackManager, queuelistStore } from "../../store/player";
  import { handleRouting } from "../../store/statusManager";
  import { defaultCoverArt } from "../../utilities";
  import Track from "../Track/Track.svelte";
</script>

<div class="now-playing">
  <div class="control">
    <div class="control-cover">
      <img
        src={$playbackManager?.nowPlaying?.albumArt || defaultCoverArt}
        alt="cover-art"
      />
      <div class="cover-detail">
        <h1>
          {$playbackManager?.nowPlaying?.title ||
            $playbackManager?.nowPlaying?.defaultTitle}
        </h1>
        <div class="detail-sub">
          <p
            on:click={() =>
              handleRouting(
                `#/artist-details/${$playbackManager?.nowPlaying?.artist}`
              )}
          >
            {$playbackManager?.nowPlaying?.artist ||
              $playbackManager?.nowPlaying?.defaultArtist}
          </p>
          <p class="dot">&#x2022;</p>
          <p
            on:click={() =>
              handleRouting(
                `#/album-details/${$playbackManager?.nowPlaying?.album}`
              )}
          >
            {$playbackManager?.nowPlaying?.album}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="track-list">
    <Track tracks={$queuelistStore} />
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

  .control-cover {
    display: flex;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      object-position: center;
      margin-right: 20px;
    }

    .cover-detail {
      h1 {
        font-size: 30px;
        font-weight: 200;
      }
      .detail-sub {
        display: flex;
        align-items: center;
      }
      p {
        font-weight: 200;
        font-size: 15px;
        margin-right: 10px;
        &:hover:not(.dot) {
          opacity: 0.5;
          cursor: pointer;
        }
      }
    }
  }
</style>
