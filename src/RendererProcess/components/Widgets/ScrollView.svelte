<div class="scroll-view">
  <slot />
  <!-- <div style="width: 100%;height: 100px;background-color: red;"/> -->
</div>

<style lang="scss">
  .scroll-view {
    flex-direction: column;
    flex: 1;
    height: 100%;
    overflow-y: auto;
    display: flex;
    /* border: 1px solid blue; */
    padding: 0px 20px 100px 20px;

    &::-webkit-scrollbar-track-piece:end {
      margin-bottom: 100px;
    }
  }
</style>
