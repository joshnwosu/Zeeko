<script>
  import Router, {location, querystring, replace} from "svelte-spa-router";
  import { routes } from "./RendererProcess/router";

  import CustomTitleBar from "./RendererProcess/components/Root/CustomTitleBar.svelte";
  import SideNav from "./RendererProcess/components/Root/SideNav.svelte";
  import ControlPanel from "./RendererProcess/components/Root/ControlPanel.svelte";
import ScreenHeader from "./RendererProcess/components/Root/ScreenHeader.svelte";

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

  replace('/my-music/') // this is My music route (Default)
  // replace('/now-playing') // this is My music route (Default)
</script>

<div id="app" on:click={cleanUp} on:contextmenu={cleanUp}>
  <CustomTitleBar />
  <section class="main-view">
    {#if $location != "/now-playing"}
      <SideNav />
    {/if}
    <div class="router-container">
      <Router {routes} on:routeLoaded={routeLoaded} />
    </div>
    {#if $location != "/now-playing"}
      <ControlPanel />
    {/if}
  </section>
 
</div>

<style lang="scss">
  :global(main.page) {
    width: 100%;
    height: 100%;
    /* padding: 0px 0px 100px 0px; */
    background: #000000 !important;
    position: absolute;
    overflow-y: auto;
  }

  :global(svg) {
    padding: 0 !important;
    margin: 0 !important;
    width: 18px;
    height: 18px;
    :global(path) {
      fill: #AAAAAA;
    }
  }

  :global(.screen-view) {
    padding: 0px 20px 100px 20px;
  }

  .main-view {
    position: relative;
    width: 100%;
    display: flex;
    height: 100%;
  }
  .router-container {
    flex: 1;
    overflow-y: auto;
    position: relative;
    width: 100%;
    height: 100%;
  }
  #app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    color: #FFFFFF;
    background-color: #000000;
    overflow: hidden;
  }

  @media (min-width: 640px) {
    #app {
      max-width: none;
    }
  }
</style>
