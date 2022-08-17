<div class="scroll-view">
  <div class="screen-view">
    <slot />
  </div>
</div>

<style lang="scss">
  .scroll-view {
    flex: 1;
    height: 100%;
    border: 1px solid purple;
    overflow-y: auto;

    &::-webkit-scrollbar-track-piece:end {
      margin-bottom: 100px;
    }
  }
</style>
