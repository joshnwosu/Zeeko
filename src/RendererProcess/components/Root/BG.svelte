<script>
  const src = "./assets/images/431311.jpg";
  // const src = "./assets/images/andy-holmes-xA26xebY3dw-unsplash.jpg";
</script>

<div class="bg">
  <img {src} alt={src} />
</div>

<style>
  .bg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    filter: blur(100px);
    pointer-events: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0.5;
    position: fixed;
    /* display: none; */
  }
</style>
