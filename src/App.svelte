<script>
  import Router, {link, location, querystring} from "svelte-spa-router";
  import { routes } from "./RendererProcess/router";

  import CustomTitleBar from "./RendererProcess/components/Root/CustomTitleBar.svelte";
  import SideNav from "./RendererProcess/components/Root/SideNav.svelte";
  import ControlPanel from "./RendererProcess/components/Root/ControlPanel.svelte";

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

  <!-- <p>Query String: {$querystring}</p> -->

  <section class="main-view">
    <SideNav />
    <div class="router-container">
      <!-- <p>Location: {$location}</p> -->
      <Router {routes} on:routeLoaded={routeLoaded} />
    </div>
    <ControlPanel />
  </section>
 
</div>

<style lang="scss">
  :global(main.page) {
    position: absolute;
    width: 100%;
    height: 100%;
    /* border: 1px solid red; */
    padding: 20px;
    flex: 1;
    padding: 30px 20px 0px 20px;
    background: #000000 !important;
  }

  .main-view {
    /* background-color: transparent; */
    position: relative;
    /* width: 100vw; */
    /* height: 100vh; */
    /* border: 1px solid red; */
    /* background: #000000; */
    width: 100%;
    display: flex;
    /* border: 1px solid red; */
    height: 100%
  }

  .router-container {
    /* border: 1px solid blue; */
    position: relative;
    /* display: flex; */
    /* flex: 1; */
    width: 100%;
    /* height: 100%; */
    /* padding: 30px 20px 0px 20px; */
    
  }
  #app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    /* background: rgba(34, 34, 34, 1); */
    color: #FFFFFF;
    background-color: #000000;
  }
  @media (min-width: 640px) {
    #app {
      max-width: none;
    }
  }
</style>
