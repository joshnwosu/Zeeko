<script>
  import Router, {link, location, querystring, pop} from "svelte-spa-router";
  import { routes } from "./RendererProcess/router"

  const routeLoaded = (event) => {
    console.log('The Event:', event);
    console.log('The Location: ', location)
    console.log('The Query String: ', querystring)
  }
</script>

<div class="app">
  <nav>
    <p class="go-back" on:click={pop}>Go back</p>
    <a href="/" use:link>Home</a>
    <a href="/about" use:link>About</a>
    <a href="/contact" use:link>Contact</a>
    <a href="/author/Joshua/Nwosu" use:link>Author</a>
    <a href="/book?search=joshua" use:link>Book</a>
  </nav>
  <!-- <p>Location: {$location}</p> -->
  <!-- <p>Query String: {$querystring}</p> -->
  <Router {routes} on:routeLoaded={routeLoaded} />
</div>

<style>
  :global(*){
    padding: 0 !important;
    margin: 0 !important;
    box-sizing: border-box;
  }
  :global(main.page) {
    position: absolute;
    width: 100%;
    background-color: #FFFFFF;
  }
  .app {
    position: relative;
  }

  .go-back {
    cursor: pointer;
  }
  @media (min-width: 640px) {
    .app {
      max-width: none;
    }
  }
</style>
