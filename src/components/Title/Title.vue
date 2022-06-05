<template>
  <div>
    <div class="header">
      <img src="../../assets/logo-2.png" />
      <div
        v-for="(item, index) in titlist"
        :key="index"
        class="header-title"
        :class="[item.Jump == data ? 'cheader' : '']"
        @click="jumpP(index)"
      >
        {{ item.name }}
      </div>
      <div class="header-input">
        <a-input-search enter-button size="large" v-model="searchfood"  @search="onSearch"/>
      </div>
      <!-- 头像 -->
      <div class="header-portrait" @click="JumpPerson">
        <img src="../../imgs/boy.svg" width="50px" />
        <div >
          <a v-if="!item" style="color: black">游客/登录</a>
          <a v-if="item" class="header-per">{{item.username}}</a>
        </div>
      </div>
    </div>
    <!-- 弹出框 -->
    <a-modal :visible="visible" :title="title" @cancel="cancel" :footer="null">
      <div>
        <p>{{ content }}</p>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { queryfood } from "../../api/api";
export default {
  name: "Title",
  props: {
    data: Number,
  },
  data() {
    return {
      titlist: [
        { name: "首页", Jump: 0 },
        { name: "菜谱", Jump: 1 },
        { name: "健康", Jump: 2 },
        { name: "专题", Jump: 3 },
        { name: "社区", Jump: 4 },
      ],
      item: '',
      searchfood: '',
      visible: false,
      title: '',
      content: ''
    };
  },
  mounted() {
    this.titleGet()
    console.log(this.data);
  },
  methods: {
    jumpP(e) {
      if (this.item === null) {
        this.$message.warning('请登录后查看')
        this.$router.push("/")
      }
      if (e === 0 ) {
        this.$router.push("/home");
      }
      if (e === 1 && this.item !== null) {
        this.$router.push("/delicious");
      }
      if (e === 2 && this.item !== null) {
        this.$router.push("/health");
      }
      if (e === 3 && this.item !== null) {
        this.$router.push("/project");
      }
      if (e === 4 && this.item !== null) {
        this.$router.push("/community");
      }
    },
    titleGet() {
      const objItem = sessionStorage.getItem('user')
      this.item = JSON.parse(objItem)
      console.log(this.item)
    },
    JumpPerson () {
      if(!this.item) {
        this.$router.push("/")
      }
      if (this.item) {
        this.$router.push("/information")
      }
        
    },
    async onSearch() {
      const res = await queryfood({
        name: this.searchfood
      })
      if (res.data === '') {
        this.$message.error('暂无数据！')
        return
      }
      this.visible = true
      console.log(res)
      this.title = res.data.name
      this.content = res.data.step
    },
    cancel() {
      this.visible = false
    }
  },
};
</script>
<style  scoped>
.header {
  display: flex;
  justify-content: space-between;
  width: 1180px;
  height: 100px;
  cursor: pointer;
  padding: 10px 0;
  border-radius: 20px;
  padding-right: 30px;
}
.header-title {
  padding: 30px 0;
  font-size: 20px;
}
.header-title:hover {
  color: #ff6767;
}
.cheader {
  color: #ff6767;
}
.header-input {
  padding: 25px 0;
}
.header-portrait {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
}
.header-portrait div a{
  text-align:center;
  margin-top: 4px;
  font-size: 14px;
}
.header-per {
  color: black;
  width: 100px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis ;
}
</style>