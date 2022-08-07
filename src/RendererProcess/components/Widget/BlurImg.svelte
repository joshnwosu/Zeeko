<script>
  export let img;
</script>

<div class="blur">
  {#if img}
    <div class="overlay" />
    <img src={img} alt="blur-img" />
  {/if}
</div>

<style lang="scss">
  .blur {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: #000000;
    .overlay {
      width: 100%;
      height: 100%;
      background-color: #12121280;
      position: absolute;
      backdrop-filter: blur(20px);
      z-index: 2;
      background-image: linear-gradient(to top, #000000, #12121280);
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      position: absolute;
      z-index: 1;
    }
  }
</style>
