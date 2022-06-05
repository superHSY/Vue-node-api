<template>
  <div class="bgwrap">
    <v-Title :data="data"></v-Title>
    <div class="com-body">
      <div class="com-content">
        <img src="../imgs/cook.svg" width="420px" />
        <div class="com-title">
          <h1>合作社区，体会做菜不一样的乐趣（热门话题）</h1>
          <div class="com-item">
            <a-card hoverable style="width: 300px; margin-right: 30px; height: 324px">
              <img
                slot="cover"
                alt="example"
                src="../assets/dishes/f-2.jpg"
                height="180px"
              />
              <template slot="actions" class="ant-card-actions">
                <a-rate :value='value1' :allow-clear="false" />
              </template>
              <a-card-meta
                title="四川火锅串串香"
                description="这是一条热门菜谱"
              >
              </a-card-meta>
            </a-card>
            <a-card hoverable style="width: 300px; height: 324px">
              <img
                slot="cover"
                alt="example"
                src="../assets/dishes/f-8.jpg"
                height="180px"
              />
              <template slot="actions" class="ant-card-actions">
                <a-rate :value='value2' :allow-clear="false" />
              </template>
              <a-card-meta
                title="蔬菜联盟套餐"
                description="这也是一个热门菜谱"
              >
              </a-card-meta>
            </a-card>
          </div>
        </div>
      </div>
      <h2>早餐问题问大家</h2>
      <div class="item-content">
        <a-card
          hoverable
          style="width: 305px; margin-right: 30px; margin-top: 20px"
          v-for="i in ztitle"
          :key="i.id"
        >
          <img
            slot="cover"
            alt="example"
            :src="i.image[0]"
            height="180px"
          />
          <template slot="actions" class="ant-card-actions">
            <a-icon key="setting" type="idcard" @click="showMain(i)"/>
            <a-icon key="edit" type="like" @click="good"/>
            <a-icon key="ellipsis" type="message" @click="jumPage(i)"/>
          </template>
          <a-card-meta :title="i.name" :description="i.step" style="height: 60px">
          </a-card-meta>
        </a-card>
      </div>
      <h1 style="margin-top: 40px">午饭问题问大家</h1>
      <div class="item-content">
        <a-card
          hoverable
          style="width: 305px; margin-right: 30px; margin-top: 20px;"
          v-for="i in wtitle"
          :key="i.id"
        >
          <img
            slot="cover"
            alt="example"
            :src="i.image[0]"
            height="180px"
          />
          <template slot="actions" class="ant-card-actions">
            <a-icon key="setting" type="idcard" @click="showMain(i)"/>
            <a-icon key="edit" type="like" @click="good"/>
            <a-icon key="ellipsis" type="message" @click="jumPage(i)"/>
          </template>
          <a-card-meta :title="i.name" :description="i.step" style="height: 60px">
          </a-card-meta>
        </a-card>
      </div>
      <h1 style="margin-top: 40px">晚饭问题问大家</h1>
      <div class="item-content">
        <a-card
          hoverable
          style="width: 305px; margin-right: 30px; margin-top: 20px"
          v-for="i in ltitle"
          :key="i.id"
        >
          <img
            slot="cover"
            alt="example"
            :src="i.image[0]"
            height="180px"
          />
          <template slot="actions" class="ant-card-actions">
            <a-icon key="setting" type="idcard" @click="showMain(i)"/>
            <a-icon key="edit" type="like" @click="good"/>
            <a-icon key="ellipsis" type="message" @click="jumPage(i)"/>
          </template>
          <a-card-meta :title="i.name" :description="i.step" style="height: 60px;overflow: hidden">
          </a-card-meta>
        </a-card>
      </div>
    </div>
    <!-- 弹出框 -->
    <a-modal :visible="visible" :title="showTitle" @cancel="handleCancel" :footer='null'>
      <p>
        {{content}}
      </p>
    </a-modal>
    <!-- 评论区弹出框 -->
    <a-modal :visible="visible_commit" :title="current.name+'的评论区'" @cancel="handleCancel_commit" :footer='null'>
      <div>
        <div class="commit_commit" >
          <div v-for="i in arr" :key="i.id" class="commit_box" v-show="i.name === current.name">
            <span>{{ i.username }}: <span>{{ i.commit }}</span></span>
          </div>
        </div>
        <a-input-search
          v-model="value"
          placeholder="输入你的评论"
          size="large"
          @search="onSearch"
        >
          <template #enterButton>
            <a-button a-button >发送</a-button>
          </template>
        </a-input-search>
      </div>
    </a-modal>
  </div>
</template>

<script>
import Title from "../components/Title/Title.vue";
import { meals, area, queryarea } from "../api/api";
export default {
  components: {
    "v-Title": Title,
  },
  data() {
    return {
      data: 4,
      ztitle: [],
      wtitle: [],
      ltitle: [],
      visible: false,
      showTitle: '',
      content: '',
      value2: 4.5,
      value1: 5,
      visible_commit: false,
      foodTitle: '',
      value: '',
      current: '',
      arr:[],
      name: ''
    };
  },
  mounted() {
    this.init()
  },
  watch: {
    arr: 'changeData'
  },
  methods: {
    async init() {
      const objItem = sessionStorage.getItem('user')
      const obj = JSON.parse(objItem)
      this.name = obj.username
      const res = await meals({})
      this.ztitle = res.data.filter(item => {return item.time === '早餐' && item.adminspecial === 'true'})
      // console.log(this.ztitle,'1110011')
      this.wtitle = res.data.filter(item => {return item.time === '午饭' && item.adminspecial === 'true'})
      this.ltitle = res.data.filter(item => {return item.time === '晚饭' && item.adminspecial === 'true'})
    },
    showMain(e) {
      this.visible = true
      this.showTitle = e.name
      this.content = e.step
    },
    handleCancel() {
      this.visible = false
    },
    good() {
      this.$message.success('谢谢你的点赞')
    },
    async jumPage(e) {
      this.visible_commit = true
      this.current = e
      const res = await queryarea({})
      // console.log(res)
      this.arr = res.data
      // const res = await area({
      // })
    },
    async onSearch() {
      if(this.value === '') {
        this.$message.error('请输入内容')
        return
      }
      const res = await area({
        commit: this.value,
        name: this.current.name,
        username: this.name,
      })
      // this.arr = res.data.map(i => {return i.commit})
      console.log(res)
      this.value = ''
      this.$message.success('提交成功')
    },
    handleCancel_commit() {
      this.visible_commit = false
    },
    async changeData() {
      const res = await queryarea({})
      // console.log(res)
      this.arr = res.data
    }
  }
};
</script>


<style src="../style/community.css" scoped>
</style>