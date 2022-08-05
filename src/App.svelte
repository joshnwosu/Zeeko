<script>
  import "./RendererProcess/assets/css/global.css";
  import Router, { location } from "svelte-spa-router";
  import { routes } from "./RendererProcess/router";
  import { toggleSidebar } from "./RendererProcess/store/clickFunc";
  import ControlPanel from "./RendererProcess/components/Root/ControlPanel.svelte";
  import SideBar from "./RendererProcess/components/Root/SideBar.svelte";
  import Bg from "./RendererProcess/components/Root/BG.svelte";
  import RightBar from "./RendererProcess/components/Root/RightBar.svelte";
  import Frame from "./RendererProcess/components/Root/Frame.svelte";
  import IpcListener from "./RendererProcess/components/Root/IpcListener.svelte";

  const routeLoaded = (event) => {
    // console.log("The Event:", event);
  };

  const cleanUp = () => {
    if (document.querySelector(".contextOptions")) {
      document.querySelector(".contextOptions").style.height = `0px`;
    }
  };
</script>

<div class="dim" />
<div id="app" on:click={cleanUp} on:contextmenu={cleanUp}>
  {#if $location == "/now-playing"}
    <div class="now-playing" />
  {/if}
  <IpcListener />
  <Bg />
  <Frame />
  <section class="main-view">
    <SideBar />
    <div class="router-container" class:toggle-sidebar={$toggleSidebar}>
      <Router
        {routes}
        on:routeLoaded={routeLoaded}
        restoreScrollState={false}
      />
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
  }
  .dim {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #00000000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999999999999;
    pointer-events: none;
  }

  .now-playing {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #000000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
  }

  :global(main.page) {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow-y: auto;
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
      fill: rgba(255, 255, 255, 1);
    }
  }
  :global(.svg-icon-bold) {
    :global(path) {
      fill: rgba(255, 255, 255, 1);
    }
  }
  :global(.svg-icon-outline) {
    :global(path) {
      fill: none !important;
      stroke: rgba(255, 255, 255, 1);
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
    background-color: #000000;
    /* box-shadow: -2px 0px 10px 0px rgba(0, 0, 0, 0.1); */
    transition: 300ms ease;
    display: flex;

    &.toggle-sidebar {
      width: calc(100% - 120px);
      box-shadow: none;
    }
  }
  @media (max-width: 1000px) {
    .router-container {
      width: calc(100% - 50px);
    }
  }
</style>
