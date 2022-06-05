<template>
  <a-carousel autoplay style="width: 100%">
    <div>
      <img src="../../assets/Shuffling1.jpg" height="460px" width="100%" />
    </div>
    <div>
      <img src="../../assets/Shuffling1.jpg" height="460px" width="100%" />
    </div>
    <div>
      <img src="../../assets/Shuffling1.jpg" height="460px" width="100%" />
    </div>
    <div>
      <img src="../../assets/Shuffling1.jpg" height="460px" width="100%" />
    </div>
  </a-carousel>
</template>
<script>
export default {
  name: "Shuffling-figure",
};
</script>
<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  display: flex;
  height: 460px;
  /* background: #364d79; */
  overflow: hidden;
}
</style>