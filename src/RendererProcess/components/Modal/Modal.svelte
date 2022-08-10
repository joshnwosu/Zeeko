<script>
  export let show;
</script>

<div class="modal" class:show>
  <div class="overlay" />
  <div class="content">
    <slot class="content" />
  </div>
</div>

<style lang="scss">
  .modal {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: 0.2s ease;
    &.show {
      visibility: visible;
      opacity: 1;
    }
    .overlay {
      width: 100%;
      height: 100%;
      background-color: #00000080;
      position: absolute;
      z-index: 0;
    }

    .content {
      position: relative;
      z-index: 1;
    }
  }
</style>
