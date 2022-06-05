<template>
  <div class="bgwrap">
    <v-Title :data="data"></v-Title>
    <div class="pro-body">
      <div class="pro-tip">
        <div>做菜吧---专题</div>
        <div class="pro-tro">
          <a-icon type="caret-left" theme="filled" />
        </div>
      </div>
      <!-- 专题 -->
      <div class="pro-main">
        <div class="pro-w100">
          <div class="pro-title">成都美食专题</div>
          <span
            >四川小吃历史悠久、品种繁多，富有浓厚的地方特色。它同川菜一样，在我国烹饪技术遗产的宝库中，占有相当重要的地位。
            在四川名小吃中较为著名的有赖汤元、龙抄手、钟水饺、担担面、三大炮等...</span
          >
        </div>
        <div class="pro-mark">
            <!-- <a href="#" class="head-example" /> -->
          <a-icon type="smile" id="smile" @click="GetSmile" v-if="this.show_color === false"/>
          <a-icon type="heart" id="heart" style="color: red" v-if="this.show_color === true"/>
        </div>
      </div>
      <div class="pro-items">
        <div class="item" @click="FindItem(item)" v-for="item in cdarr" :key="item._id">
          <img :src="item.image[0]" height="150px"/>
          <div style="font-size: 20px; font-weight: 600; margin-top: 10px">{{item.name}}</div>
          <div style="font-size: 18px">作者：{{item.username}}</div>
        </div>
      </div>

      <a-divider />

      <div class="pro-main">
        <div class="pro-w100">
          <div class="pro-title">杭州美食专题</div>
          <span
            >杭州美食包括:虾爆鳝面、知味小笼、西施舌、干炸响铃、片儿川、宋嫂鱼羹、蜜汁火方、猫耳朵、虾肉小笼、天目笋干、葱包桧、杭州酱鸭、八宝鱼头、鱼头浓汤、吴山酥油饼、黑麻酥糖、桂花栗子羹、茶园豆腐干、芝脚糖、东坞山豆腐皮、雀巢鸟窝、小鸡酥、百果糕、建德烧饼、象生雪梨、严州酥饼、叫化童子鸡、青顶茶香熏野兔、孙权面筋、干烧子陵鱼、
            一品南乳肉、分水棍子鱼、栗子炒子鸡、塘栖板鸭、严州干茶鸭、油沸馃、天下第一包、天欣银鱼、严州咸汤圆。</span
          >
        </div>
        <div class="pro-mark">
          <a-icon type="smile" id="smile" @click="GetSmile" v-if="this.show_color === false"/>
          <a-icon type="heart" id="heart" style="color: red" v-if="this.show_color === true"/>
        </div>
      </div>
       <div class="pro-items">
        <div class="item" @click="FindItem(item)" v-for="item in hzarr" :key="item._id">
          <img :src="item.image[0]" height="150px"/>
          <div style="font-size: 20px; font-weight: 600; margin-top: 10px">{{item.name}}</div>
          <div style="font-size: 18px">作者：{{item.username}}</div>
        </div>
      </div>
      <a-divider />

     <div class="pro-main">
        <div class="pro-w100">
          <div class="pro-title">哈尔滨美食专题</div>
          <span
            >哈尔滨是一座冰城，这里不仅仅有美丽的雪景，还有很多俄罗斯口味的美食。
            哈尔滨有哪些好吃的小吃呢？哈尔滨7种特色小吃，如大列巴，哈尔滨红肠，锅包肉，哈尔滨熏鸡，酱骨头，看看你吃过几种？</span
          >
        </div>
        <div class="pro-mark">
          <a-icon type="smile" id="smile" @click="GetSmile" v-if="this.show_color === false"/>
          <a-icon type="heart" id="heart" style="color: red" v-if="this.show_color === true"/>
        </div>
      </div>
       <div class="pro-items">
        <div class="item" @click="FindItem(item)" v-for="item in hebarr" :key="item._id">
          <img :src="item.image[0]" height="150px"/>
          <div style="font-size: 20px; font-weight: 600; margin-top: 10px">{{item.name}}</div>
          <div style="font-size: 18px">作者：{{item.username}}</div>
        </div>
      </div>
      <a-divider />

       <div class="pro-main">
        <div class="pro-w100">
          <div class="pro-title">北京美食专题</div>
          <span
            >北京美食豆腐脑：加口蘑汤、羊肉沫、配口外的黄花、木耳炒肝：要用嫩肝尖儿、花椒水、
            生熟蒜末各半、香菇汁芝麻烧饼：饼芯分层，夹酱牛肉片、香油辣拌的咸菜丝豆面丸子汤：不撒香菜要放韭菜丁。</span
          >
        </div>
        <div class="pro-mark">
          <a-icon type="smile" id="smile" @click="GetSmile" v-if="this.show_color === false"/>
          <a-icon type="heart" id="heart" style="color: red" v-if="this.show_color === true"/>
        </div>
      </div>
       <div class="pro-items">
        <div class="item" @click="FindItem(item)" v-for="item in bjarr" :key="item._id">
          <img :src="item.image[0]" height="150px"/>
          <div style="font-size: 20px; font-weight: 600; margin-top: 10px">{{item.name}}</div>
          <div style="font-size: 18px">作者：{{item.username}}</div>
        </div>
      </div>
      <a-divider />

      <!-- 弹出对话框 -->
       <a-modal
        :title="cdItem.name"
        :visible="visible"
        @cancel="handleCancel"
        :footer="null"
      >
        <div class="item_ava">
          <a-avatar icon="user" size="large"/>
          <p>厨师名称:{{cdItem.username}}</p>
        </div>
        <!-- 做法 -->
        <div>{{cdItem.step}}</div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import Title from "../components/Title/Title.vue";
import { query } from "../api/api";
export default {
  components: {
    "v-Title": Title,
  },
  data() {
    return {
      data: 3,
      visible: false,
      show_color: false,
      cdarr: [],
      cdItem: {},
      hzarr: [],
      hebarr:[],
      bjarr: []
    };
  },
  mounted() {
    this.init()
  },
  methods: {
  async init() {
    const res = await query({})
    this.cdarr = res.data.filter(item => {
      return item.city === "成都" && item.adminspecial === "true"
    })
    this.hzarr = res.data.filter(item => {
      return item.city === "杭州" && item.adminspecial === "true"
    })
    this.hebarr = res.data.filter(item => {
      return item.city === "哈尔滨" && item.adminspecial === "true"
    })
    this.bjarr = res.data.filter(item => {
      return item.city === "北京" && item.adminspecial === "true"
    })
    console.log(this.cdarr)
  },  
  GetSmile() {
    this.$message
      .loading('正在提交,请稍等  😄', 2.5)
      .then(() => this.$message.success('谢谢你的认可', 2.5))
    setTimeout(() => {
      this.show_color = true
      }, 2500)

  },
  FindItem(e) {
    console.log(e)
    this.cdItem = e
    // console.log('ok')
    this.visible = true
  },
  handleCancel() {
    this.visible = false
  }
}
};
</script>

<style src="../style/project.css" scoped>
</style>