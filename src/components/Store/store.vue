<template>
  <div>
    <div class="store_hd">
      <h3>店面展示柜</h3>
      <p>此店面为最新一期更新页面(每个星期换店面) 需要联系:13880636103</p>
    </div>
    <div class="store_bd">
      <img
        src="../../assets/store/foot1.png"
        style="width: 400px; height: 91px; position: absolute; left: 200px"
      />
      <div class="bd_item" style="left: 60px; top: 120px">
        <img src="../../assets/store/blog-01.jpg" />
        <div>它是我们的，它是我们的，它是我们的，吃饭的环境优美</div>
        <span>2021.1.22</span>
      </div>
      <img
        src="../../assets/store/foot4.png"
        style="
          width: 170px;
          height: 16px;
          position: absolute;
          left: 480px;
          top: 200px;
        "
      />
      <div class="bd_item" style="right: 100px; top: 0px">
        <span>2021.1.22</span>
        <div>它是我们的，它是我们的，它是我们的，吃饭的环境优美</div>
        <img src="../../assets/store/blog-02.jpg" />
      </div>
      <img
        src="../../assets/store/foot2.png"
        style="
          width: 18px;
          height: 80px;
          position: absolute;
          right: 260px;
          top: 400px;
        "
      />
      <div class="bd_item" style="right: 100px; top: 500px">
        <span>2021.1.22</span>
        <img src="../../assets/store/blog-03.jpg" />

        <div>它是我们的，它是我们的，它是我们的，吃饭的环境优美</div>
      </div>
      <img
        src="../../assets/store/foot3.png"
        style="
          width: 170px;
          height: 16px;
          position: absolute;
          right: 530px;
          top: 700px;
        "
      />
      <div class="bd_item" style="left: 60px; top: 500px">
        <span>2021.1.22</span>
        <img src="../../assets/store/blog-04.jpg" />
        <div>它是我们的，它是我们的，它是我们的，吃饭的环境优美</div>
      </div>
      <img
        src="../../assets/store/foot2.png"
        style="
          width: 18px;
          height: 80px;
          position: absolute;
          left: 220px;
          top: 880px;
        "
      />
      <div class="bd_item" style="left: 60px; top: 1000px">
        <img src="../../assets/store/blog-05.jpg" />
        <div>它是我们的，它是我们的，它是我们的，吃饭的环境优美</div>
        <span>2021.1.22</span>
      </div>
      <img
        src="../../assets/store/foot4.png"
        style="
          width: 170px;
          height: 16px;
          position: absolute;
          left: 500px;
          top: 1100px;
        "
      />
      <div class="bd_item" style="right: 140px; top: 1080px">
        <h1>哈尔滨远东理工总店</h1>
      </div>
    </div>
    <a-divider></a-divider>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
h3 {
  margin-top: 20px;
  font-size: 30px;
  font-weight: bold;
  color: #c0a16b;
  cursor: pointer;
  transition: color 1.5s;
}
.store_hd {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.store_hd p {
  font-size: 20px;
  color: #212121;
  line-height: 34px;
}
h3:hover {
  color: #222;
  transition: color 1.5s;
}
.store_bd {
  position: relative;
  width: 1200px;
  height: 1320px;
}
.bd_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
}
.bd_item img {
  border-radius: 6px;
  cursor: pointer;
  width: 300px;
  height: 210px;
  transition: all 1s;
}
.bd_item img:hover {
  width: 350px;
  transition: all 1s;
}
.bd_item div {
  margin: 10px 0;
  font-weight: 600;
  font-size: 14px;
  color: #212121;
}
.bd_item span {
  font-size: 60px;
  font-weight: bold;
  color: #c0a16b;
}
</style>