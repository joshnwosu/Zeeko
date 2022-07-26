<script>
  import Icon from "svelte-icons-pack/Icon.svelte";
  import leftArrowIcon from "svelte-icons-pack/vsc/VscArrowLeft";
  import closeIcon from "svelte-icons-pack/vsc/VscChromeClose";
  import minimizeIcon from "svelte-icons-pack/vsc/VscChromeMinimize";
  import maximizeIcon from "svelte-icons-pack/vsc/VscChromeMaximize";
  import { pop, push } from "svelte-spa-router";

  const pingRequest = (msg) => {
    window?.api?.titlebar(msg);
  };
</script>

<div>
  <div class="custom-title-bar">
    <div class="title-bar">
      <!-- <div class="go-back title-action" on:click={pop}>
                <Icon src={leftArrowIcon} color="#FFFFFF" size={14} />
            </div>
            <p>Zeeko Music</p> -->
    </div>

    <div class="title-bar-controls">
      <div class="title-action" on:click={() => pingRequest("minimize")}>
        <Icon src={minimizeIcon} color="#FFFFFF" size={14} />
      </div>
      <div class="title-action" on:click={() => pingRequest("maximize")}>
        <Icon src={maximizeIcon} color="#FFFFFF" size={14} />
      </div>
      <div
        class="title-action close-icon"
        on:click={() => pingRequest("closeWindow")}
      >
        <Icon src={closeIcon} color="#FFFFFF" size={14} />
      </div>
    </div>
  </div>
</div>

<style>
  .custom-title-bar {
    width: calc(100% - 50px);
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    right: 0;
    top: 0;
    -webkit-app-region: drag;
    position: fixed;
    z-index: 999;
    background-color: transparent;
  }

  .title-bar,
  .title-bar-controls {
    height: 100%;
    display: flex;
    align-items: center;
  }

  /* .title-bar-controls {
        background-color: #111111;
    } */

  .title-bar p {
    font-size: 12px;
    font-family: inherit;
    margin-left: 10px;
  }
  /* .go-back {
        margin-right: 10px;
    } */

  .go-back:hover {
    background-color: white;
  }

  .title-action {
    background-color: transparent;
    width: 45px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;
    z-index: 999;
    -webkit-app-region: no-drag;
  }

  .title-action:hover:not(.close-icon) {
    background-color: #333333;
  }

  .close-icon:hover {
    background-color: red;
  }
</style>
