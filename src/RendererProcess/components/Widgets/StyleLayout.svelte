<div class="style">
  <div class="style-title">
    <slot name="style-title" />
  </div>
  <div class="style-wrapper">
    <div class="style-content">
      <slot name="style-content" />
    </div>
  </div>
</div>

<style lang="scss">
  .style {
    margin-bottom: 20px;
    .style-title {
      font-size: 16px;
      font-weight: 400;
      padding: 10px 0;
    }
    .style-wrapper {
      background-color: #222222;
      border-radius: 10px;
      padding: 1px;
    }
    .style-content {
      /* border: 1px solid #222222; */
      background-color: #121212;
      border-radius: 10px;
    }
  }
</style>
