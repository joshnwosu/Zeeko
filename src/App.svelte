<script>
  import Router, {link, location, querystring, pop} from "svelte-spa-router";
  import { routes } from "./RendererProcess/router"

  const routeLoaded = (event) => {
    console.log('The Event:', event);
    console.log('The Location: ', location)
    console.log('The Query String: ', querystring)
  }

  const cleanUp = () => {
    if( document.querySelector(".contextOptions")) {
      document.querySelector(".contextOptions").style.height = `0px`
    }
  }
</script>

<div id="app" on:click={cleanUp} on:contextmenu={cleanUp}>
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
  <div class="main-view">
     <Router {routes} on:routeLoaded={routeLoaded} />
  </div>
 
</div>

<style>
  :global(main.page) {
    position: absolute;
    width: 100%;
    background: #222222;
  }
  #app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #222222;
    color: #FFFFFF;
  }
  .go-back {
    cursor: pointer;
  }
  @media (min-width: 640px) {
    #app {
      max-width: none;
    }
  }
</style>
