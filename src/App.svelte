<script>
  export let name;
  import Router, {link, location, querystring, pop} from "svelte-spa-router";
  import About from "./About.svelte";
  import Author from "./Author.svelte";
  import Home from "./Home.svelte";
  import NotFound from "./NotFound.svelte";

  import { fade } from "svelte/transition"
import Book from "./Book.svelte";

  const routes = {
    // Exact path
    '/': Home,
    '/about': About,
    // Using named parameters, with last being optional
    '/author/:first/:last?': Author,
    '/book': Book,
    // Catch-all
    // This is optional, but if present it must be the last
    '*': NotFound,
  }

  const routeLoaded = (event) => {
    console.log('The Event:', event);
    console.log('The Location: ', location)
  }
</script>

  <main>
    
    <nav>
      <p class="go-back" on:click={pop}>Go back</p>
      <a href="/" use:link>Home</a>
      <a href="/about" use:link>About us</a>
      <a href="/contact" use:link>Contact us</a>
      <a href="/author/Joshua/Nwosu" use:link>Author One</a>
      <a href="/author/Jerry/Nwosu" use:link>Author Two</a>
      <a href="/book?search=joshua" use:link>Book</a>
    </nav>

    <p>Location: {$location}</p>
    <p>Query String: {$querystring}</p>

    <Router {routes} on:routeLoaded={routeLoaded} />

    <h1>Hello {name}!</h1>
		<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	
  </main>
<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  .go-back {
    cursor: pointer;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
