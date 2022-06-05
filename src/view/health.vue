<template>
  <div class="bgwrap">
    <v-Title :data="data"> </v-Title>
    <div class="health-title">
      <div class="left100">
        <span>季节健康推荐饮食</span>
        <img src="../assets/font/right01.png" width="40px" style="margin: 0 10px" />
        <img src="../imgs/healthbc.svg" width="25%" />
        <img src="../assets/font/right01.png" width="40px" style="margin: 0 10px"/>
        <div class="health-tip">
          <div class="tip-left">
            <div
              class="tip-item"
              v-for="(item, index) in list1"
              :key="index"
              @mouseover="showfish(item.num)"
              @mouseleave="showLeave"
            >
              {{ item.name }}
              <span><a-icon type="right" /></span>
            </div>
          </div>
          <div v-if="num === '1'" class="tip-none">
            <div v-for="(item, index) in step" :key="index" class="tip-size">
              {{ item }}
            </div>
          </div>
          <div class="tip-none" v-if="num === '2'">
            <div v-for="(item, index) in fish" :key="index" class="tip-size">
              <span>{{ item.name1 }}</span>
              <div>{{ item.name2 }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <span class="title">降压食物推荐名单</span>
    <div class="box">
      <div class="health-content">
        <div class="content-item" v-for="(item, index) in conlist" :key="index">
          <span>{{ item.name }}</span>
          <div>
            {{ item.content }}
          </div>
        </div>
        <button @click="findMore">查看更多+</button>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div class="content-box">
        <div class="w100">
          <img src="../assets/shicai/01.jpg" width="160px"/>
          <div class="w200">
            <h2>学会4招，告别宫寒！</h2>
            <span>2020-1-10</span>
            <div>
              宫寒女性平时最好多吃些性温且具有散寒功效的食物，如核桃、红枣、花生、羊肉、鸡肉等。每天午餐过后或者晚餐之后，喝杯温热的姜茶也有助于化解寒气，调理宫寒
            </div>
          </div>
        </div>
        <div class="w100">
          <img src="../assets/shicai/04.jpg" width="160px"/>
          <div class="w200">
            <h2>告别痛风，积极起来！</h2>
            <span>2020-1-10</span>
            <div>
              宫寒女性平时最好多吃些性温且具有散寒功效的食物，如核桃、红枣、花生、羊肉、鸡肉等。每天午餐过后或者晚餐之后，喝杯温热的姜茶也有助于化解寒气，调理宫寒
            </div>
          </div>
        </div>
        <div class="w100">
          <img src="../assets/shicai/03.jpg" width="160px"/>
          <div class="w200">
            <h2>怎么吃健康，告别不会吃菜！</h2>
            <span>2020-1-10</span>
            <div>
              宫寒女性平时最好多吃些性温且具有散寒功效的食物，如核桃、红枣、花生、羊肉、鸡肉等。每天午餐过后或者晚餐之后，喝杯温热的姜茶也有助于化解寒气，调理宫寒
            </div>
          </div>
        </div>
        <div class="w100">
          <img src="../assets/shicai/02.jpg" width="160px"/>
          <div class="w200">
            <h2>学会9招，告别身体不适！</h2>
            <span>2020-1-10</span>
            <div>
              宫寒女性平时最好多吃些性温且具有散寒功效的食物，如核桃、红枣、花生、羊肉、鸡肉等。每天午餐过后或者晚餐之后，喝杯温热的姜茶也有助于化解寒气，调理宫寒
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹出框 -->
     <a-modal
      title="食物名单推荐表"
      :visible="visible"
      @cancel="handleCancel"
      :footer="null"
      width=800px
    > 
      <a-table :columns="columns" :data-source="dataTable" class="heabox">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="customTitle"><a-icon type="smile-o" /> 菜品姓名</span>
        <span slot="tags" slot-scope="tags">
          <a-tag
            v-for="tag in tags"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag }}
          </a-tag>
        </span>
        <span slot="action" slot-scope="text" class="content_show">
          {{text}}
        </span>
      </a-table>
    </a-modal>
  </div>
</template>

<script>
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '季节',
    dataIndex: 'season',
    key: 'season',
  },
  {
    title: '厨师姓名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' },
  },
  {
    title: '材料介绍',
    dataIndex: 'action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

const dataTable = [
  {
    key: '1',
    name: '鸡肉',
    season: '冬季',
    username: '王大锤',
    tags: ['清淡', '美食', '炖'],
    action: '顾名思义，鸡肉就是鸡身上的肉，鸡的肉质细嫩，滋味鲜美，适合多种烹调方法，并富有营养，有滋补养身的作用。'
  },
  {
    key: '2',
    name: '羊肉',
    season: '冬季',
    username: '王小锤',
    tags: ['清淡', '美食', '炖'],
    action: '顾名思义，鸡肉就是杨身上的肉，鸡的肉质细嫩，滋味鲜美，适合多种烹调方法，并富有营养，有滋补养身的作用。'
  },
  {
    key: '3',
    name: '猪肉',
    season: '冬季',
    username: '王大锤',
    tags: ['清淡', '美食', '炖'],
    action: '顾名思义，鸡肉就是鸡身上的肉，鸡的肉质细嫩，滋味鲜美，适合多种烹调方法，并富有营养，有滋补养身的作用。'
  },
  {
    key: '4',
    name: '鱼肉',
    season: '冬季',
    username: '王大锤',
    tags: ['清淡', '美食', '炖'],
    action: '顾名思义，鸡肉就是鸡身上的肉，鸡的肉质细嫩，滋味鲜美，适合多种烹调方法，并富有营养，有滋补养身的作用。'
  },
];

import Title from "../components/Title/Title.vue";
export default {
  components: {
    "v-Title": Title,
  },
  data() {
    return {
      data: 2,
      list1: [
        {
          name: "健康做法",
          num: "1",
        },
        {
          name: "做鱼食材",
          num: "2",
        },
       
      ],
      step: [
        "1.多宝鱼前面都画上几刀，用盐和生抽，胡椒涂抹均匀，腌上十分钟以上",
        "2.腌鱼的时候，准备葱、姜、蒜",
        "3.把腌好的鱼放入蒸锅里，把葱·姜·蒜平铺在鱼上，大火蒸12-15分钟左右",
        "4.蒸鱼时，把红椒·葱头，切丝，葱身，和香菜切碎备用",
        "5.鱼蒸好后，把身上的葱·姜·蒜拿出", 
      ],
      fish: [
        { name1: "主料", name2: "多宝鱼（一条）" },
        {
          name1: "辅料",
          name2: "葱，姜，蒜，红椒（适量）",
        },
        {
          name1: "配料",
          name2: "生抽，胡椒，香油，盐（看自己）",
        },
        {
          name1: "其他",
          name2: "清淡，烧，十分钟，简单",
        },
      ],
      conlist: [
        {
          name: "1.茄子",
          content:
            "研究表明，茄子的紫色皮中含有丰富的维生素E和P，是其他蔬菜无法比的。其中维生素P，可以增强毛细血管弹性，并且可以改善微循环，对高血压、动脉硬化及坏血病者，有一定的疗效。而茄子纤维中的皂草甙，具有降低胆固醇的功效。所以，茄子对于高血压、动脉硬化的患者来说是食疗佳品。",
        },
        {
          name: "2.红萝卜",
          content:
            "红萝卜里包含槲皮素、山萘酚等其他物质，此类物质与生物类黄酮(维他命P)的功效有关，具有增进维他命C吸收与改善微血管的作用，同时还能够增多冠状动脉血流量，降低血脂，增进肾上腺素合成，所以有降低血压、强心等效果。",
        },
        {
          name: "3.秋葵",
          content:
            "秋葵含有高量的粘液，粘液中含有丰富的可溶性膳食纤维，如果胶、阿拉伯胶、羧甲基纤维素等，可阻止肠道碳水化合物的消化，进而降低葡萄糖的吸收，推测可降低饭后血糖。秋葵籽含有约大量人体所需的必需胺基酸和不饱和脂肪酸，研究证实黄秋葵籽及荚皮均有抑制α-glucosidasec和α-amylase的能力，可延缓碳水化合物的消化，帮助饭后血糖的控制，其中荚皮的抑制能力又比籽更好。",
        },
        {
          name: "1.茄子",
          content:
            "研究表明，茄子的紫色皮中含有丰富的维生素E和P，是其他蔬菜无法比的。其中维生素P，可以增强毛细血管弹性，并且可以改善微循环，对高血压、动脉硬化及坏血病者，有一定的疗效。而茄子纤维中的皂草甙，具有降低胆固醇的功效。所以，茄子对于高血压、动脉硬化的患者来说是食疗佳品。",
        },
      ],
      num: "",
      visible: false,
      dataTable,
      columns
    };
  },
  methods: {
    showfish(e) {
      this.num = e;
    },
    showLeave() {
      this.num = "";
    },
    findMore() {
      this.visible = true
    },
    handleCancel() {
      this.visible = false
    },
  },
};
</script>

<style src="../style/health.css" scoped>

</style>