<template>
  <div class="main">
    <div class="title">
      <div class="title_left">
        <h1>欢迎来到食材中心</h1>
        <p>
          ChemLinked Compliance Team comprises technologists, toxicologists,
          nutritionists, chemists, and regulatory analysts with vast insight and
          practical experience dealing with regulatory obligations. With
          meticulous management and professional service efforts, we have
          successfully undertaken numerous compliance projects for companies
          exporting to China.
        </p>
        <button @click="backMain">返回首页，了解更多首页内容</button>
      </div>
      <img
        src="../imgs/buyfood.svg"
        width="500px
      "
      />
    </div>
    <div class="hd">
      <h2>食物种类分类布局</h2>
      <div class="hd_box">
        <div class="hd_item" v-for="(item, index) in list" :key="index">
          <img :src="item.src" width="80px" height="80px" />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="bd">
      <div class="bd_item">
        <div class="item_hd">时令与热门</div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          src: require("../assets/food/01.png"),
          name: "时令与热门",
        },
        {
          src: require("../assets/food/02.png"),
          name: "肉禽类",
        },
        {
          src: require("../assets/food/03.png"),
          name: "水产品类",
        },
        {
          src: require("../assets/food/04.png"),
          name: "蔬菜类",
        },
        {
          src: require("../assets/food/05.png"),
          name: "果品类",
        },
        {
          src: require("../assets/food/06.png"),
          name: "米面豆乳",
        },
        {
          src: require("../assets/food/07.png"),
          name: "调味品",
        },
        {
          src: require("../assets/food/08.png"),
          name: "药食",
        },
      ],
    };
  },
  methods: {
    backMain() {
      this.$router.push("../home");
    },
  },
};
</script>

<style src="../style/ingredients.css" scoped>
</style>