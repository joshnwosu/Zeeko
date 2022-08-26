<div class="scroll-view">
  <!-- <div class="screen-view"> -->
  <slot />
  <!-- </div> -->
</div>

<style lang="scss">
  .scroll-view {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    display: flex;

    &::-webkit-scrollbar-track-piece:end {
      margin-bottom: 100px;
    }
  }

  /* .screen-view {
    display: flex;
  } */
</style>
