<script>
  export let title;
</script>

<div class="screen-header">
  <h1>{title}</h1>
  <slot />
</div>

<style lang="scss">
  .screen-header {
    position: sticky;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-color: #000000;
    padding: 0px 20px 20px;
    z-index: 2;
    h1 {
      font-size: 30px;
      font-weight: 300;
    }
  }
</style>
