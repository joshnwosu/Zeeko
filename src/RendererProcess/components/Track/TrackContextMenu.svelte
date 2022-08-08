<!-- <div class="contextOptions">
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
</div> -->

<ul class="contextMenu" data-theme="light">
  <li class="contextMenu-item">
    <button class="contextMenu-button">Play </button>
  </li>
  <li class="contextMenu-item">
    <button class="contextMenu-button">Play next</button>
  </li>
  <li class="contextMenu-item">
    <button class="contextMenu-button">Show album</button>
  </li>
  <li class="contextMenu-item">
    <button class="contextMenu-button">Edit info</button>
  </li>
  <li class="contextMenu-item">
    <button class="contextMenu-button">Properties</button>
  </li>
  <li class="contextMenu-item">
    <button class="contextMenu-button">Delete</button>
  </li>
  <li class="contextMenu-item" data-divider="top">
    <button class="contextMenu-button">Select</button>
  </li>
</ul>

<!-- <style lang="scss">
  .contextOptions {
    width: 120px;
    background-color: #22222280;
    z-index: 999999999999;
    position: fixed;
    height: 0;
    top: 50px;
    right: 50px;
    overflow: hidden;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.597) !important;
    transition: 0.2s ease;
    /* padding: 5px 0; */
    backdrop-filter: blur(100px);
    animation: menuAnimation 0.4s 0s both;
    transform-origin: left;
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

  @keyframes menuAnimation {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    100% {
      height: var(--height);
      opacity: 1;
      border-radius: 8px;
      transform: scale(1);
    }
  }

  @-webkit-keyframes menuAnimation {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    100% {
      height: var(--height);
      opacity: 1;
      border-radius: 8px;
      transform: scale(1);
    }
  }
</style> -->
