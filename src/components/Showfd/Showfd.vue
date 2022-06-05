<template>
  <div class="tech-slideshow">
    <div class="mover-1"></div>
    <!-- <div class="mover-2"></div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style  scoped>
.tech-slideshow {
  height: 270px;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}

.tech-slideshow > div {
  width: 4600px;
  background: url(../../assets/liulangtu.png);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transform: translate3d(0, 0, 0);
}
.tech-slideshow .mover-1 {
  animation: moveSlideshow 60s linear infinite;
}

@keyframes moveSlideshow {
  100% {
    transform: translateX(-66.6666%);
  }
}
</style>