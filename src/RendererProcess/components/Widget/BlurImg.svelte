<script>
  export let img;
</script>

<div class="blur">
  <div class="overlay" />
  <img src={img} alt="blur-img" />
</div>

<style lang="scss">
  .blur {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    .overlay {
      width: 100%;
      height: 100%;
      background-color: #12121280;
      position: absolute;
      backdrop-filter: blur(100px);
      z-index: 2;
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
