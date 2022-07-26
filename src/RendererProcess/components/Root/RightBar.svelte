<script>
  import {
    HeartIcon,
    MusicFilterIcon,
    MusicIcon,
    SettingIcon,
    SunnyIcon,
  } from "../Icons";
</script>

<div class="right-nav">
  <div class="top">
    <span>
      <svelte:component this={MusicFilterIcon} />
    </span>
    <span>
      <svelte:component this={HeartIcon} />
    </span>
  </div>
  <div class="bottom">
    <span>
      <svelte:component this={SunnyIcon} />
    </span>
    <span>
      <svelte:component this={SettingIcon} />
    </span>
  </div>
</div>

<style lang="scss">
  .right-nav {
    background-color: rgba(14, 18, 26, 0.7);
    background-color: rgba(23, 28, 38, 0.7);
    width: 60px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 50px 0;
  }

  .bottom,
  .top {
    display: flex;
    flex-direction: column;
    span {
      margin-top: 10px;
    }
  }
</style>
