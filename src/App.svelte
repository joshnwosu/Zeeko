<script>
  import "./RendererProcess/assets/css/global.css";

  import Router, { location, querystring, replace } from "svelte-spa-router";
  import { routes } from "./RendererProcess/router";

  import CustomTitleBar from "./RendererProcess/components/Root/CustomTitleBar.svelte";
  import SideNav from "./RendererProcess/components/Root/SideNav.svelte";
  import ControlPanel from "./RendererProcess/components/Root/ControlPanel.svelte";
  import ScreenHeader from "./RendererProcess/components/Root/ScreenHeader.svelte";
  import SideBar from "./RendererProcess/components/Root/SideBar.svelte";
  import Bg from "./RendererProcess/components/Root/BG.svelte";
  import RightBar from "./RendererProcess/components/Root/RightBar.svelte";
  import Frame from "./RendererProcess/components/Root/Frame.svelte";

  const routeLoaded = (event) => {
    console.log("The Event:", event);
    console.log("The Location: ", location);
    console.log("The Query String: ", querystring);
  };

  const cleanUp = () => {
    if (document.querySelector(".contextOptions")) {
      document.querySelector(".contextOptions").style.height = `0px`;
    }
  };

  // replace('/my-music/') // this is My music route (Default)
  // replace('/now-playing') // this is My music route (Default)
</script>

<div id="app" on:click={cleanUp} on:contextmenu={cleanUp}>
  <Bg />
  <!-- <CustomTitleBar /> -->
  <Frame />
  <section class="main-view">
    <!-- {#if $location != "/now-playing"} -->
    <!-- <SideNav /> -->
    <SideBar />
    <!-- {/if} -->
    <!-- <div class="router-container">
      <Router {routes} on:routeLoaded={routeLoaded} />
    </div> -->
    <div />
    <RightBar />
    <!-- {#if $location != "/now-playing"} -->
    <!-- <ControlPanel /> -->
    <!-- {/if} -->
  </section>
</div>

<style lang="scss">
  /* @import "./RendererProcess/assets/css/global.css"; */
  :global(main.page) {
    width: 100%;
    height: 100%;
    /* padding: 0px 0px 100px 0px; */
    /* background: #000000 !important; */
    position: absolute;
    overflow-y: auto;
  }

  :global(svg.svg-icon) {
    /* width: 18px; */
    /* height: 18px; */
    :global(path) {
      fill: none;
      stroke: #ffffff;
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
    align-items: flex-start;
    justify-content: flex-end;
  }
  .router-container {
    /* flex: 1; */
    overflow-y: auto;
    position: relative;
    width: calc(100% - 300px);
    height: 100%;
    /* border: 1px solid blue; */
  }
  #app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    color: #ffffff;
    /* background-color: #000000; */
    overflow: hidden;
    /* background: rgb(8, 8, 8); */
    background-color: #0e121a;
  }

  @media (max-width: 1000px) {
    .router-container {
      width: calc(100% - 50px);
    }
  }
</style>
