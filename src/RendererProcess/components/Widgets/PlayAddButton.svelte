<script>
  import { AddIcon, PlayBoldIcon } from "../Icons";
</script>

<div class="hover">
  <span class="hover-btn" on:click|self={() => console.log("Hello")}>
    <svelte:component this={AddIcon} />
  </span>
  <span class="hover-btn" on:click|self={() => console.log("Hello")}>
    <svelte:component this={PlayBoldIcon} />
  </span>
</div>

<style lang="scss">
  .hover {
    position: absolute;
    width: 100%;
    height: 100%;
    /* top: 0; */
    /* left: 0; */
    background-color: #12121250;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    /* backdrop-filter: blur(5px); */
    /* visibility: hidden; */
    /* opacity: 0; */
    transition: 0.2s ease;
    .hover-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      background-color: #ffffff20;
      border-radius: 50%;
      margin: 0 10px;
      cursor: pointer;
      :global(svg) {
        width: 30px;
        height: 30px;
        opacity: 1 !important;
        /* :global(path) {
                fill: #ffffff !important;
                stroke: #ffffff !important;
              } */
      }
    }
  }
</style>
