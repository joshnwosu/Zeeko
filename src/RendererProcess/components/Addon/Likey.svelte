<script>
  import { playlistStore } from "../../store/player";

  let check;
  let heart;
  const handleClick = () => {
    check = !check;
  };

  const interval = setInterval(removeClass, 2000);

  function removeClass() {
    heart.classList.remove("is-active");
  }

  $: if ($playlistStore[0]) {
    handleClick();
  }
</script>

<div
  class="heart"
  bind:this={heart}
  class:is-active={check}
  on:click={handleClick}
/>

<style lang="scss">
  .heart {
    width: 100px;
    height: 100px;
    background: url("https://cssanimation.rocks/images/posts/steps/heart.png")
      no-repeat;
    background-position: 0 0;
    cursor: pointer;
    transition: background-position 1s steps(28);
    transition-duration: 0s;

    &.is-active {
      transition-duration: 1s;
      background-position: -2800px 0;
    }
  }
</style>
