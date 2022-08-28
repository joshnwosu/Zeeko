<script>
  import "./RendererProcess/assets/css/global.css";
  import Router, { location } from "svelte-spa-router";
  import { routes } from "./RendererProcess/router";
  import {
    toggleContextMenu,
    toggleSidebar,
  } from "./RendererProcess/store/status";
  import ControlPanel from "./RendererProcess/components/Root/ControlPanel.svelte";
  import SideBar from "./RendererProcess/components/Root/SideBar.svelte";
  import Bg from "./RendererProcess/components/Root/BG.svelte";
  import RightBar from "./RendererProcess/components/Root/RightBar.svelte";
  import Frame from "./RendererProcess/components/Root/Frame.svelte";
  import IpcListener from "./RendererProcess/components/Root/IpcListener.svelte";
  import CreatePlaylist from "./RendererProcess/components/Widgets/CreatePlaylist.svelte";
  import NowPlaying from "./RendererProcess/components/Root/NowPlaying.svelte";
  import ContextMenu from "./RendererProcess/components/ContextMenu/ContextMenu.svelte";
  import DimMode from "./RendererProcess/components/Root/DimMode.svelte";
  import { cleanUp } from "./RendererProcess/utilities";
  import Equalizer from "./RendererProcess/components/Root/Equalizer/Equalizer.svelte";

  const routeLoaded = (event) => {
    // console.log("Eevnt: ", event);
    // document.querySelectorAll(".page").forEach((el) => (el.scrollTop = 0));
  };
</script>

<DimMode />
<div id="app" on:click={cleanUp} on:contextmenu={cleanUp} on:scroll={cleanUp}>
  <ContextMenu />
  <NowPlaying />
  <CreatePlaylist />
  <IpcListener />
  <Bg />
  <Frame />
  <section class="main-view">
    <SideBar />

    <div class="router-container" class:toggle-sidebar={$toggleSidebar}>
      <Router {routes} on:routeLoaded={routeLoaded} restoreScrollState={true} />
    </div>
    <ControlPanel />
    <RightBar />
    <Equalizer />
  </section>
</div>

<style lang="scss">
  /* :global(.virtual-list-wrapper) {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
  }
  :global(.virtual-list-wrapper::-webkit-scrollbar) {
    display: none !important;
  } */

  /* :global(.v-scrollbar) {
    z-index: 9999999999;
  } */

  #app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    color: #ffffff;
    overflow: hidden !important;
  }
  :global(main.page) {
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: auto;
    flex: 1;
    /* border: 10px solid red; */
    /* &::-webkit-scrollbar-track-piece:start {
      margin-top: 100px;
    } */

    &::-webkit-scrollbar-track-piece:end {
      margin-bottom: 100px;
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
  /* :global(.screen-view) {
    padding: 0px 20px 100px 20px;
  } */
  .main-view {
    position: relative;
    width: 100%;
    display: flex;
    height: 100%;
    align-items: flex-end;
    justify-content: flex-end;
  }
  .router-container {
    position: relative;
    width: calc(100% - 340px);
    height: 100%;
    bottom: 0;
    right: 60px;
    background-color: #000000;
    /* transition: 300ms ease; */
    display: flex;
    /* border: 5px solid green; */

    &.toggle-sidebar {
      width: calc(100% - 120px);
      box-shadow: none;
    }
  }
  @media (max-width: 1000px) {
    .router-container {
      width: calc(100% - 60px);
    }
  }
</style>
