<script>
  export let name;
  export let length;
  export let fontSize;
</script>

<div class="content">
  <p class="name" style="font-size:{fontSize}px">{name}</p>
  <p class="length">{length} Songs</p>
</div>

<style lang="scss">
  .content {
    p {
      margin-bottom: 2px;
      font-weight: 200;
      &.name {
        opacity: 1;
        font-weight: 400;
      }
      &.length {
        opacity: 0.6;
        font-size: 12px;
        word-spacing: 2px;
      }
    }
  }
</style>
