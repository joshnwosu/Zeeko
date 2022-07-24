<script>
      import Router, {link, location, querystring} from "svelte-spa-router";
</script>
<div class="side-nav">
    <nav>
      <a href="/" use:link>My music</a>
      <a href="/recent-plays" use:link>Recent plays</a>
      <a href="/now-playing" use:link>Now playing</a>
      <a href="/playlists" use:link>Playlists</a>
    </nav>
</div>

<style lang="scss">
    .side-nav {
        width: 300px;
        height: calc(100vh - 80px); // 150px is the height of the player-control
        background-color: #111111;
        padding-top: 30px;
        /* padding-left: 20px; */
    }
  nav {
    position: relative;
    display: flex;
    flex-direction: column;
    a {
      font-size: 14px ;
      padding: 10px 20px;
      /* text-decoration: none; */
      &:hover {
        background-color: #333333;
      }
    }
  }
</style>