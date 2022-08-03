<script>
  import "./RendererProcess/assets/css/global.css";
  import Router, { location, querystring } from "svelte-spa-router";
  import { routes } from "./RendererProcess/router";

  import { toggleSidebar } from "./RendererProcess/store/clickFunc";

  import ControlPanel from "./RendererProcess/components/Root/ControlPanel.svelte";
  import SideBar from "./RendererProcess/components/Root/SideBar.svelte";
  import Bg from "./RendererProcess/components/Root/BG.svelte";
  import RightBar from "./RendererProcess/components/Root/RightBar.svelte";
  import Frame from "./RendererProcess/components/Root/Frame.svelte";
  import Header from "./RendererProcess/components/Root/Header.svelte";
  import IpcListener from "./RendererProcess/components/Root/IpcListener.svelte";
  import LeftBar from "./RendererProcess/components/Root/LeftBar.svelte";

  const routeLoaded = (event) => {
    // console.log("The Event:", event);
    // console.log("The Location: ", location);
    // console.log("The Query String: ", querystring);
  };

  const cleanUp = () => {
    if (document.querySelector(".contextOptions")) {
      document.querySelector(".contextOptions").style.height = `0px`;
    }
  };

  // replace("/my-music/"); // this is My music route (Default)
</script>

<div id="app" on:click={cleanUp} on:contextmenu={cleanUp}>
  <IpcListener />
  <Bg />
  <Frame />
  <section class="main-view">
    <SideBar />
    <div class="router-container" class:toggle-sidebar={$toggleSidebar}>
      <LeftBar />
      <div class="router-wrapper" class:toggle-wrapper={$toggleSidebar}>
        <!-- <Header /> -->
        <Router
          {routes}
          on:routeLoaded={routeLoaded}
          restoreScrollState={false}
        />
      </div>
    </div>
    <ControlPanel />
    <RightBar />
  </section>
</div>

<style lang="scss">
  #app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    color: #ffffff;
    overflow: hidden;
    /* background-color: #0e121a; */
    /* background-color: #000000; */
  }
  :global(main.page) {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow-y: auto;
    /* border: 1px solid red; */
    flex: 1;
    &::-webkit-scrollbar-track-piece:end {
      margin-bottom: 100px;
    }
    &::-webkit-scrollbar-track-piece:start {
      margin-top: 50px;
    }
  }
  :global(svg.svg-icon) {
    width: 18px;
    height: 18px;
    :global(path) {
      fill: rgba(255, 255, 255, 0.6);
    }
  }
  :global(.svg-icon-bold) {
    :global(path) {
      fill: rgba(255, 255, 255, 0.6);
    }
  }
  :global(.svg-icon-outline) {
    :global(path) {
      fill: none !important;
      stroke: rgba(255, 255, 255, 0.6);
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
    align-items: flex-end;
    justify-content: flex-end;
  }
  .router-container {
    overflow-y: auto;
    position: relative;
    width: calc(100% - 360px);
    height: 100%;
    bottom: 0;
    right: 60px;
    /* background-color: #0e121a; */
    /* background-color: #000000; */
    box-shadow: -2px 0px 10px 0px rgba(0, 0, 0, 0.1);
    transition: 300ms ease;
    display: flex;
    .router-wrapper {
      width: 100%;
      position: absolute;
      height: 100%;
      transform: translateX(0px);
      /* transition: 300ms ease; */
      /* border: 1px solid green; */
      right: 0;
      z-index: 999;
      /* background-color: #0e121a; */
      background-color: #000000;
      &.toggle-wrapper {
        width: calc(100% - 60px);
      }
    }
    &.toggle-sidebar {
      width: calc(100% - 60px);
      box-shadow: none;
    }
  }
  @media (max-width: 1000px) {
    .router-container {
      width: calc(100% - 50px);
    }
  }
</style>
