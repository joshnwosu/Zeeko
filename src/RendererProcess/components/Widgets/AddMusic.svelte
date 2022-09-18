<script>
  import isElectron from "../../../../isElectron";
  import { toggleModal } from "../../store/status";
  import { handleToggleModal } from "../../store/statusManager";
  import { AddIcon, TrashIcon } from "../Icons";
  import Button from "./Button.svelte";

  const pickFolder = () => {
    if (isElectron()) {
      window?.api?.media("addScanFolder");
    } else {
      console.log("Opening Browser Dialog...");
      // browserFile.click();
      getDir();
    }
  };

  async function getDir() {
    const dirHandle = await window?.showDirectoryPicker();
    // run code for dirHandle
    console.log("Browser Dir HERE: ", dirHandle);
  }

  const lists = [
    { name: "Music", path: `C:\Users\DELL\Music` },
    { name: "audio", path: `C:\Users\DELL\Music\audio` },
  ];
</script>

<div class="add-music">
  <div class="add-music-header">
    <h1>Add Music</h1>
    <p>Create playlist from local music files</p>
  </div>

  <div class="add-music-section">
    <button class="add-music-btn" on:click={pickFolder}>
      <span class="icon">
        <svelte:component this={AddIcon} />
      </span>
    </button>
    <div class="add-music-list">
      <p>Folders you've added</p>
      <div class="lists">
        {#each lists as list, index}
          <div class="list">
            <div class="list-header">
              <h2>{list.name}</h2>
              <p>{list.path}</p>
            </div>
            <span class="list-remove">
              <TrashIcon />
            </span>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <Button>close</Button>
</div>

<style lang="scss">
  .add-music-header {
    h1 {
      font-size: 24px;
    }
    p {
      font-size: 14px;
      margin-top: 5px;
      opacity: 0.5;
    }
  }
  .add-music-section {
    margin: 20px 0;
  }

  .add-music-btn {
    width: 100%;
    background-color: #333333;
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 10px;
    &:hover {
      background-color: #444444;
    }
    :global(svg) {
      width: 30px;
      height: 30px;
    }
  }

  .add-music-list {
    margin-top: 20px;
    p {
      font-size: 14px;
      opacity: 0.5;
    }

    .list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #333333;
      padding: 10px 20px;
      border-radius: 5px;
      margin-top: 5px;
      border: 1px solid #333333;
      &:hover {
        background-color: #121212;
      }
      h2 {
        font-size: 16px;
      }
      p {
        font-size: 12px;
        margin-top: 3px;
      }
    }
  }
</style>
