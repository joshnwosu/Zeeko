<script>
      import Router, {link, location, querystring} from "svelte-spa-router";
</script>
<div>
    <nav>
      <a href="/" use:link>Home</a>
      <a href="/about" use:link>About</a>
      <a href="/contact" use:link>Contact</a>
      <a href="/author/Joshua/Nwosu" use:link>Author</a>
      <a href="/book?search=joshua" use:link>Book</a>
    </nav>
</div>

<style lang="scss">
  nav {
    position: relative;
    a {
      font-size: 20px ;
    }
  }
</style>