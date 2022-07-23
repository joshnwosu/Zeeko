<script>
      import Router, {link, location, querystring} from "svelte-spa-router";
</script>
<div class="side-nav">
    <nav>
      <a href="/" use:link>Home</a>
      <a href="/about" use:link>About</a>
      <a href="/contact" use:link>Contact</a>
      <a href="/author/Joshua/Nwosu" use:link>Author</a>
      <a href="/book?search=joshua" use:link>Book</a>
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