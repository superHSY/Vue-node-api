<template>
  <div class="bgwrap">
    <v-Title :data="data"></v-Title>
    <div class="de-tip">
      <img src="../assets/mark.png" height="180px" class="tip" />
      <div class="de-title">
        <a href="" @click.prevent="cus(item.id)" v-for="(item, index) in title" :key="index">
        <div class="t1" >
          <div class="t1-logo"></div>
          {{item.name}}
        </div>
        </a>
      </div>
      <div class="person">
        <div
          class="person-mian"
          v-for="(item, index) in personlist"
          :key="index"
        >
          <img src="../imgs/chef.svg" />
          <div @click="chef">
            <span>{{ item.name }}</span>
            <div>{{ item.position }}</div>
          </div>
        </div>
      </div>
      <div class="title-tips">欢迎来到菜品中心</div>
      <!-- 早饭 -->
      <a href="#firstAnchor"></a>
      <div class="title-tip" id="No1">
        <span>早饭（做菜）中心</span>
        <button @click="getMethod('早餐')">早餐分享</button>
      </div>
      <div class="Box">
        <div class="box">
          <div class="box-item" v-for="(item, index) in foodList" :key="index">
            <div class="item-tip">8:30 - 10:00 (GMT+8)</div>
            <a class="item-pro" @click="getAdvice">评分</a>
            <div class="item-content">
              <img :src=item.src width="148px" height="148px" />
              <div class="item-content-right">
                <h1>{{item.name}}</h1>
                <h2>2022-1-03</h2>
                <div>{{item.content}}</div>
              </div>
            </div>
            <div class="item-preson">
              <img src="../imgs/boy.svg" width="50px" height="50px" />
              <div style="margin-left: 20px">
                <span>{{item.people}}</span>
                <div style="font-size: 12px">
                  {{item.ad}}...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 午饭 -->
      <div class="title-tip" style="margin-top: 40px" id="No2">
        <span>午饭（做菜）中心</span>
        <button @click="getMethod('午饭')">午饭分享</button>
      </div>
      <div class="Box">
        <div class="box">
          <div class="box-item" v-for="(item, index) in foodlunch" :key="index">
            <!-- <img src="../assets/test/01.jpg" width="300px" height="300px" /> -->
            <div class="item-tip">11:30 - 12:00 (GMT+8)</div>
            <a class="item-pro" @click="getAdvice">评分</a>
            <div class="item-content">
              <img :src=item.src width="148px" height="148px" />
              <div class="item-content-right">
                <h1>{{item.name}}</h1>
                <h2>2022-1-03</h2>
                <div>{{item.content}}</div>
              </div>
            </div>
            <div class="item-preson">
              <img src="../imgs/boy.svg" width="50px" height="50px" />
              <div style="margin-left: 20px">
                <span>{{item.people}}</span>
                <div style="font-size: 12px">
                  {{item.ad}}...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 晚饭 -->
      <div class="title-tip" style="margin-top: 40px" id="No3">
        <span>晚饭（做菜）中心</span>
        <button @click="getMethod('晚饭')">晚饭分享</button>
      </div>
      <div class="Box">
        <div class="box">
         <div class="box-item" v-for="(item, index) in fooddinner" :key="index">
            <!-- <img src="../assets/test/01.jpg" width="300px" height="300px" /> -->
            <div class="item-tip">11:30 - 12:00 (GMT+8)</div>
            <a class="item-pro" @click="getAdvice">评分</a>
            <div class="item-content">
              <img :src=item.src width="148px" height="148px" />
              <div class="item-content-right">
                <h1>{{item.name}}</h1>
                <h2>2022-1-03</h2>
                <div>{{item.content}}</div>
              </div>
            </div>
            <div class="item-preson">
              <img src="../imgs/boy.svg" width="50px" height="50px" />
              <div style="margin-left: 20px">
                <span>{{item.people}}</span>
                <div style="font-size: 12px">
                  {{item.ad}}...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 提供方法弹出框 -->
      <a-modal
        v-model="visible"
        title="
          欢迎来到分享会
        "
        :footer="null"
      >
        <a-spin :spinning="spinning" size="large">
          <h2>提供食物标签</h2>
            
          <div style="margin-bottom: 50px">
            <a-tag color="pink"> 美食 </a-tag>
            <a-tag color="red"> 火锅 </a-tag>
            <a-tag color="orange"> 羊排 </a-tag>
            <a-tag color="green"> 牛油火锅 </a-tag>
            <a-tag color="cyan"> 羊蝎子 </a-tag>
            <a-tag color="blue"> 口感 </a-tag>
            <a-tag color="purple"> 好吃 </a-tag>
          </div>
          <div style="margin-bottom: 20px">用户菜品详细介绍</div>
          <a-upload
            action="http://localhost:8081/api/mealpic"
            list-type="picture-card"
            :file-list="fileList"
            @preview="handlePreview"
            @change="handleChange"
          >
            <div v-if="fileList.length < 8">
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
          >
            <a-form-model-item prop="name">
                <a-input v-model="form.name"
                  placeholder="输入菜品的名称"
                  style="margin-top: 20px; width: 200px"
                />
            </a-form-model-item>
            <a-form-model-item prop="ways">
              <a-textarea
                v-model="form.ways"
                placeholder="讨论标题"
                :rows="4"
              />
            </a-form-model-item>
            <a-form-model-item >
              <div class="getMethod">
                <a-button type="primary" @click="submit(e)">提交</a-button>
              </div>
            </a-form-model-item>
          </a-form-model>
          </a-spin>
      </a-modal>
      <!-- 建议弹框 -->
      <a-modal v-model="visible1" title="评分/评级" :footer="null">
        <div class="advice">
          <img src="../imgs/Many.svg" width="100px" />
          <div class="advice_rate">
            <h6>厨师听从客户意见</h6>
            <div><span>厨艺点评 :</span><a-rate v-model="value1"/></div>
            <div><span>上手容易 :</span><a-rate v-model="value2"/></div>
            <div><span>总体点评 :</span><a-rate v-model="value3"/></div>
            <a-button class="advice_button" type="primary" icon="edit" :loading="iconLoading" @click="enterIconLoading">提交</a-button>
          </div>
        </div>
      </a-modal>
      <!-- 大厨介绍框 -->
    </div>
  </div>
</template>

<script>
import Title from "../components/Title/Title.vue";
import { foodcenter, foodlunch, fooddinner, mealImage } from "../api/api";
// 修改格式
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  components: {
    "v-Title": Title,
  },
  data() {
    return {
      fileList: [],
      data: 1,
      personlist: [
        {
          name: "和岁月大厨",
          position: "米其林5星大厨",
        },
        {
          name: "张泽林大厨",
          position: "米其林5星大厨",
        },
        {
          name: "刘一含大厨",
          position: "米其林4星大厨",
        },
        {
          name: "李建华大厨",
          position: "米其林1星大厨",
        },
        {
          name: "冯超大厨",
          position: "米其林5星大厨",
        },
        {
          name: "高小飞大厨",
          position: "米其林4星大厨",
        },
      ],
      title: [
        {name: '早 餐 食 堂',id: 'No1' },
        {name: '午 餐 食 堂',id: 'No2' },
        {name: '晚 餐 食 堂',id: 'No3' },
      ],
      visible: false,
      chooseone: "",
      spinning: false,
      visible1: false,
      iconLoading: false,
      value1: null,
      value2: null,
      value3: null,
      form: {
        name: '',
        ways: ''
      },
       rules: {
          name: [
            { required: true, message: '请写出你的菜品做法', trigger: 'blur' },
            { min: 3, max: 10, message: '名字位3-10之间', trigger: 'blur' },
          ],
           ways: [
            { required: true, message: '请写出你的菜品做法', trigger: 'blur' },
            { min: 10, max: 200, message: '请注意字数', trigger: 'blur' },
          ],
       },
       foodList: [],
       foodlunch: [],
       fooddinner: [],
       meThods: '',
       Username: '',
       e:''
    };
  },
  mounted() {
    // 渲染页面接口
    this.init()
  },
  methods: {
    async init() {
      const res = await foodcenter({})
      const res1 = await foodlunch({})
      const res2 = await fooddinner({})
      this.foodList = res.data
      this.foodlunch = res1.data
      this.fooddinner = res2.data
      const obj = sessionStorage.getItem('user')
      this.Username = JSON.parse(obj).username
    },
    getMethod(e) {
      this.meThods = e
      console.log(this.meThods)
      this.visible = true;
    },
    submit() {
      this.$refs.ruleForm.validate( async valid => {
        if (valid) {
           const arr = this.fileList.map((item, index) => {
            return item.response.msg
          })
          const res = await mealImage({
          name: this.form.name,
          time: this.meThods,
          step: this.form.ways,
          image: arr,
          username: this.Username,
          adminspecial: false
          })
          console.log(res)
          this.spinning = !this.spinning;
          setTimeout(() => {
            this.$message.success("提交成功");
            this.spinning = false;
            this.visible = false;
            this.$refs.ruleForm.resetFields();
            
          }, 1000);
        } else {
          return false;
        }
      });
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      // console.log(this.previewImage)
      this.previewVisible = true;
    },
    getAdvice() {
      this.visible1 = true;
    },
    chef() {
     this.$message.success('这是下面6位大厨辅助进行')
    },
    enterIconLoading() {
      if (this.value1 === null && this.value3 === null && this.value2 === null) {
        this.$message.error('至少选择一项评分')
        return
      }
       this.iconLoading = { delay: 200, };
       setTimeout(() => {
         this.iconLoading = false
         this.visible1 = false
         this.value3 = null
         this.value1 = null
         this.value2 = null
         this.$message.success('提交成功')
       }, 1000)
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
      console.log(this.fileList)
    },
    cus(e) {
      let jump = document.getElementById(e);
      if(jump) {jump.scrollIntoView()}
    }
  },
};
</script>

<style src="../style/delicious.css" scoped>
</style>