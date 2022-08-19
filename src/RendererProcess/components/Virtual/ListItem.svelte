<script>
  export let item;
</script>

<div class="ListItem">
  <p>{item?.title || item?.name}</p>
</div>

<style>
  .ListItem {
    position: relative;
    margin: 0.2em 0;
    padding: 0.2em;
    border: 1px solid #eee;
    height: 2rem; /* without this is unstable */
    overflow: auto;
  }
  p {
    margin: 0;
    font-size: 14px;
  }
</style>
