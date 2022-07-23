<script>
  import Router, {link, location, querystring} from "svelte-spa-router";
  import { routes } from "./RendererProcess/router";

  import CustomTitleBar from "./RendererProcess/components/Root/CustomTitleBar.svelte";

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
  <CustomTitleBar />

  <!-- <p>Location: {$location}</p> -->
  <!-- <p>Query String: {$querystring}</p> -->

  <div class="main-view">
     <!-- <Router {routes} on:routeLoaded={routeLoaded} /> -->
  </div>
 
</div>

<style lang="scss">
  :global(main.page) {
    position: absolute;
    width: 100%;
    /* background: #000000 !important; */
  }

  .main-view {
    background-color: transparent;
    position: relative;
    width: 100vw;
    height: 100vh;
    /* border: 1px solid red; */
    background: #000000
  }
  #app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    /* background: rgba(34, 34, 34, 1); */
    color: #FFFFFF;
  }
  @media (min-width: 640px) {
    #app {
      max-width: none;
    }
  }
</style>
