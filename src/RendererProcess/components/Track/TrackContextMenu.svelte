<div class="contextOptions">
  <ul class="options">
    <li><span>Play</span></li>
    <li><span>Play next</span></li>
    <li><span>Add to</span></li>
    <li><span>Show album</span></li>
    <li><span>Edit info</span></li>
    <li><span>Properties</span></li>
    <li><span>Delete</span></li>
    <div class="line-wrap">
      <span class="line" />
    </div>
    <li><span>Select</span></li>
  </ul>
</div>

<style lang="scss">
  .contextOptions {
    width: 120px;
    background-color: #22222280;
    z-index: 999999999999;
    position: fixed;
    height: 0px;
    top: 50px;
    right: 50px;
    overflow: hidden;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.597) !important;
    transition: 0.2s ease;
    padding: 5px 0;
    backdrop-filter: blur(100px);
    .options {
      .line-wrap {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 2px;
        .line {
          width: 90%;
          display: flex;
          height: 1px;
          background-color: #444444;
        }
      }
      li {
        padding: 5px 20px;
        &:hover {
          background-color: #222222;
        }
        span {
          font-size: 12px;
        }
      }
    }
  }
</style>
