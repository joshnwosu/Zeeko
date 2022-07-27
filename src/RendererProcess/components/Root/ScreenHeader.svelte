<script>
  export let name;
  // const formatRoute  = (str) => {
  //     return str.toLowerCase().replace(/[/]/g, '').replace(/[-]/, ' ').replace(/\b\w/i, c => c.toUpperCase())
  // }
</script>

<div class="screen-header">
  <h1>{name}</h1>
  <slot />
</div>

<style lang="scss">
  .screen-header {
    position: sticky;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-color: rgba(14, 18, 26, 0.8);
    backdrop-filter: blur(20px);
    padding: 0px 20px 20px;
    border-bottom: 1px solid #171c26;
    h1 {
      font-size: 30px;
      font-weight: 200;
    }
  }
</style>
