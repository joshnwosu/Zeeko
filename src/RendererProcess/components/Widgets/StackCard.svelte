<div class="stack stack-queue">
  <div class="shadow" />
  <div class="shadow" />
  <div class="shadow" />
  <slot />
</div>

<style lang="scss">
  .stack {
    width: 200px;
    height: 180px;
    padding: 0;
    position: relative;
    .shadow {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
      backface-visibility: hidden;
      transform-origin: 50% -50%;

      &:first-child {
        transform: scale(0.85);
        background-color: #222;
      }

      &:nth-child(2) {
        transform: scale(0.9);
        background-color: #333;
      }

      &:nth-child(3) {
        transform: scale(0.95);
        background-color: #444;
      }
    }
  }
</style>
