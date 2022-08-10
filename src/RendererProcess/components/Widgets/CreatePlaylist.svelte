<script>
  import { toggleCreatePlaylist } from "../../store/status";
  import { createPlaylist } from "../../store/playerManager";
  import Modal from "../Modal/Modal.svelte";
  let input;
  let inputValue;

  $: if ($toggleCreatePlaylist) {
    input.autofocus = true;
    console.log(input);
  }

  function handleCreatePlaylist() {
    createPlaylist(inputValue);
    inputValue = "";
    $toggleCreatePlaylist = false;
  }
</script>

<Modal show={$toggleCreatePlaylist}>
  <div class="create-playlist-card">
    <h1>Create Playlist</h1>
    <div>
      <input
        type="text"
        placeholder="Enter name"
        bind:this={input}
        bind:value={inputValue}
      />
    </div>

    <div class="btn-wrapper">
      <span class="add-btn" on:click={handleCreatePlaylist}>Add playlist</span>

      <span
        class="close-btn"
        on:click={() => ($toggleCreatePlaylist = !$toggleCreatePlaylist)}
        >Cancel</span
      >
    </div>
  </div>
</Modal>

<style lang="scss">
  .create-playlist-card {
    width: 500px;
    background-color: #222222;
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1 {
      font-size: 30px;
      font-weight: 300;
      margin-bottom: 20px;
      text-align: center;
    }
    input {
      width: 100%;
      height: 60px;
      background-color: transparent;
      padding: 5px 20px;
      border: none;
      font-size: 20px;
      font-weight: 200;
      border-bottom: 1px solid #333333;
      color: #ffffff;
      &::placeholder {
        font-weight: 200;
      }
    }
    .btn-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 40px;
      span {
        display: inline-block;
        font-size: 14px;
        text-align: center;
        &.add-btn {
          background-color: #333;
          padding: 15px 40px;
        }
        &.close-btn {
          margin-top: 20px;
          opacity: 0.5;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
</style>
