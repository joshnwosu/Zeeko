<script>
  import { createEventDispatcher } from "svelte";
  import { handleToggleModal } from "../../store/statusManager";
  const dispatch = createEventDispatcher();
</script>

<div
  class="modal-button-wrapper"
  on:click={() => {
    dispatch("close");
    handleToggleModal("close");
  }}
>
  <button>
    <slot />
  </button>
</div>

<style lang="scss">
  .modal-button-wrapper {
    display: flex;
    justify-content: flex-end;
    button {
      background-color: #333333;
      padding: 10px 50px;
      color: #fff;
      font-weight: 200;
      font-size: 12px;
    }
  }
</style>
