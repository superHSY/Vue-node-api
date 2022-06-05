<template>
  <div class="bgwrap">
    <!-- 表头 -->
    <v-Title :data="data"></v-Title>
    <div class="body">
      <!-- 轮播图 -->
      <div class="content">
        <v-Shuffling></v-Shuffling>
      </div>
      <!-- 菜品介绍 -->
      <div class="introduce">
        <img src="../assets/food.png" width="560px" height="140px" />
        <div class="introduce-box">
          <div class="box-item" v-for="(item, index) in list" :key="index">
            <div class="box-item-pt">
              {{ item.title }}
              <div>
                <b>-----------</b>
              </div>
              <div style="font-size: 30px; color: #000; font-family: siyuan">
                {{ item.content }}
              </div>
            </div>
            <img :src="item.src" width="100px" height="100px" />
          </div>
        </div>
      </div>
      <!-- 视屏介绍图 -->
      <div class="video">
        <img
          src="../assets/video.jpg"
          width="460px"
          height="300px"
          @click="showImg"
        />
        <div class="video-body">
          <div class="video-title">
            <span class="tip1">炭烤日式料理</span>
            <span class="tip2">ABOUT US</span>
          </div>
          <div class="video-content">
            炭烤日式料理创立于2010年，拥有三十年直营店运营经验，始终贯彻营
            养健康的环保理念。为顾客准备的特色菜品有一百二十余款，分为生鱼刺
            身、餐前小菜、寿司（手工握寿司、卷物花寿司/手卷物、炙寿司）......
          </div>
          <div class="video-btn">
            <button @click="Morefood">了解更多+</button>
          </div>
        </div>
      </div>
      <a-modal
        title="日式料理"
        :visible="visible_video"
        @cancel="handleCancel_video"
        centered
      >
        <video src="../assets/video/1.mp4" id="video" controls width=100%></video>
      </a-modal>
      
      <!-- 更多菜品弹出框 -->
      <a-modal v-model="visible" title="炭烤日式料理" class="pop-up">
        <div>
          铁板烧通常选用高级、新鲜的食材，主要分为海鲜如龙虾、大虾、带子、鲍鱼等，肉类如日本本土出产的和牛、鸡肉，蔬菜如菌类、甚至豆腐等,日本料理即小酒菜，象盐渍墨鱼。口味以甜、酸、咸为主，最小，口味多样;
          铁板烧通常选用高级、新鲜的食材，主要分为海鲜如龙虾、大虾、带子、鲍鱼等，肉类如日本本土出产的和牛、鸡肉，蔬菜如菌类、甚至豆腐等,日本料理即小酒菜，象盐渍墨鱼。口味以甜、酸、咸为主，最小，口味多样;
          铁板烧通常选用高级、新鲜的食材，主要分为海鲜如龙虾、大虾、带子、鲍鱼等，肉类如日本本土出产的和牛、鸡肉，蔬菜如菌类、甚至豆腐等,日本料理即小酒菜，象盐渍墨鱼。口味以甜、酸、咸为主，最小，口味多样;
        </div>
      </a-modal>
      <!-- 菜品展示 -->
      <div class="showfd">
        <div class="title title2">
          <p class="p2">热门菜品展示</p>
          <p class="p1">メニュー展示</p>
        </div>
        <v-Showfd></v-Showfd>
        <div class="showfd-btn">
          <button @click="Moregreens">查看更多菜品+</button>
        </div>
        <p class="geng">热门菜品每周一更新(敬请期待更多美食)</p>
      </div>

      <!-- 菜品做法 -->
      <div class="methods">
        <div class="w1200">
          <p class="p1">累计</p>
          <p class="p2">
            百余家店面
            <span>案例展示</span>
          </p>
        </div>

        <div class="b1200">
          <div class="methods-btn1" @click="Jumpway">
            <img src="../assets/font/i1.png" />
            <div class="p1">
              火爆做法案例
              <div style="font-size: 12px">The case shows</div>
            </div>
          </div>
          <div class="methods-btn2" @click="Jumpstore">
            <img src="../assets/font/i1.png" />
            <div class="p1">
              店面展示案例
              <div style="font-size: 12px">Popular approach</div>
            </div>
          </div>
        </div>
        <v-Store v-show="!rolling"></v-Store>
        <!-- 菜品滚动图 -->
        <div class="store_hd" v-show="rolling">
          <h3>火爆做法案例箱</h3>
          <p>此店面为最新一期更新页面(每个星期换店面) 需要联系:13880636103</p>
        </div>
        <div class="f1200" v-show="rolling">
          <div
            :class="[item1.size ? 'f2' : 'f1']"
            v-for="(item1, index) in Fdlist"
            :key="index"
            @click="showFood(item1)"
          >
            <img :src="item1.pic" />
            <div class="eva">{{ item1.name }}</div>
          </div>
        </div>

        <a-divider v-show="rolling">暂无更多</a-divider>
      </div>

      <!-- 火爆做法弹出框 -->
      <a-modal
        :title="show_Food.name"
        :visible="visible_show"
        @cancel="handleCancel_show"
        centered
        class="show_food"
      >
        <div>
          <p class="show_Food_p">
            <img src="../imgs/people_cook.svg" width="100px">
          </p>
          <p class="show_Food_content">{{show_Food.content}}</p>
          <div class="evaluate">
            <span>用户评价 :  </span>
            <a-rate v-model="value_show" disabled/>
            <img src="../imgs/people_food.svg" width="80px">
          </div>
        </div>
      </a-modal>

      <!-- 提供做菜信息 -->
      <div class="pro">
        <img src="../assets/hezuo.png" width="300px" height="300px" />
        <div class="pro-content">
          <h2>欢迎提供美食</h2>
          <h3>请您分享你的做菜方法以及食材提供</h3>
          <button @click="provide">立马提供</button>
          <v-CountDown :endHours="24"></v-CountDown>
        </div>
      </div>
      <!-- 提供做菜信息弹出框 -->
      <a-modal
        title="欢迎来到美食分享会"
        :visible="visible_make"
        @cancel="handleCancel_make"
      >
        <a-spin :spinning="spinning" size="large">
          <a-form-model ref="ruleForm" :model="form" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }" :rules="rules">
            <a-form-model-item label="请输入你的美食名称:" prop="name">
              <a-input v-model="form.name" />
            </a-form-model-item>
            <a-form-model-item label="城市" prop="city" required>
              <a-select placeholder="请选择你的城市" v-model="form.city" >
                <a-select-option value="成都"> 成都 </a-select-option>
                <a-select-option value="杭州"> 杭州 </a-select-option>
                <a-select-option value="哈尔滨"> 哈尔滨 </a-select-option>
                <a-select-option value="北京"> 北京 </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="请选择时间">
              <a-date-picker
                show-time
                type="date"
                placeholder="请选择时间"
                style="width: 100%"
                v-model="form.time"
              />
            </a-form-model-item>
            <a-form-model-item label="做菜步骤" prop="content">
              <a-input type="textarea" v-model="form.content"/>
            </a-form-model-item>
            <a-form-model-item label="上传美食照片" style="margin-bottom: 0">
              <div class="clearfix">
                <a-upload
                  action="http://localhost:8081/api/pic"
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
                <a-modal
                  :visible="previewVisible"
                  :footer="null"
                  @cancel="handleCancel"
                >
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </div>
            </a-form-model-item>

            <a-form-model-item :wrapper-col="{ span: 10, offset: 13 }">
              <a-button type="primary" @click="onSubmit()"> 提交 </a-button>
              <a-button style="margin-left: 35px" @click="Cancel">
                取消</a-button
              >
            </a-form-model-item>
          </a-form-model>
        </a-spin>
      </a-modal>
      <!-- 食材 -->
      <div class="ingredients">
        <div>
          <a-icon type="shop" style="font-size: 30px" />时令食材<span
            class="in-tit"
            >健康你我</span
          >
        </div>
        <div class="in-content">
          <div class="in-pic" v-for="(item4, index) in clist" :key="index">
            <img :src="item4.pic" width="150px" height="150px" />
            <p>{{ item4.name }}</p>
            <span>{{ item4.tro }}</span>
          </div>
          <button @click="JumpAdd">更多食物+</button>
        </div>
      </div>
      <!-- 健康系数排名 -->
      <div class="health">
        <div class="health-title">
          <div>健康社区<span>安全饮食，健康一生</span></div>
          <button @click="joinCenter">进入健康中心，了解更多饮食知识</button>
        </div>
        <a-divider />
        <div class="health-content">
          <div class="co-box" v-for="(item, index) in healthyGroup" :key="index">
            <p>{{item.name}}</p>
            <h3>
              {{item.content}}
            </h3>
            <div class="co-ft">
              <div>
                <span>推荐等级</span>
                <a-rate
                  character="A"
                  allow-half
                  v-model="item.number"
                  disabled
                />
              </div>
              <img src="../imgs/health.svg" width="120px" />
            </div>
          </div>
        </div>
      </div>
      <!-- 社区 -->
      <div class="community">
        <div class="com-title">
          <h1>社区热门话题</h1>
          <h2>讨论不一样的美食做法</h2>
        </div>
        <div class="com-content">
          <img
            src="../imgs/community.svg"
            width="300px"
            style="margin-right: 100px"
          />
          <div class="com-box">
            <div class="com-con-body">
              <div class="com-h100">
                <img src="../imgs/boy.svg" width="40px" />
                <div>
                  <nav>米拉Miira</nav>
                  <div>18小时前</div>
                  <div class="com-body">
                    #十一月碎碎念#
                    豆腐地软蒸饺，美美素食我的爱。祝大家好日子蒸蒸日上！
                  </div>
                </div>
              </div>
              <div class="com-h100">
                <img src="../imgs/boy.svg" width="40px" />
                <div>
                  <nav>米拉Miira</nav>
                  <div>18小时前</div>
                  <div class="com-body">
                    #十一月碎碎念#
                    朋友送我的腊青鱼最后一顿了，要煎的干干的。
                  </div>
                </div>
              </div>
              <div class="com-h100">
                <img src="../imgs/boy.svg" width="40px" />
                <div>
                  <nav>dawang</nav>
                  <div>18小时前</div>
                  <div class="com-body">
                    #十一月碎碎念#
                    我的毕业设计终于要写完啦，真的超级开心啦！
                  </div>
                </div>
              </div>
              <div class="com-h100">
                <img src="../imgs/boy.svg" width="40px" />
                <div>
                  <nav>米拉Miira</nav>
                  <div>18小时前</div>
                  <div class="com-body">
                    #十一月碎碎念#
                    豆腐地软蒸饺，美美素食我的爱。祝大家好日子蒸蒸日上！
                  </div>
                </div>
              </div>
              <div class="com-h100">
                <img src="../imgs/boy.svg" width="40px" />
                <div>
                  <nav>米拉Miira</nav>
                  <div>18小时前</div>
                  <div class="com-body">
                    #十一月碎碎念#
                    豆腐地软蒸饺，美美素食我的爱。祝大家好日子蒸蒸日上！
                  </div>
                </div>
              </div>
              <div class="com-h100">
                <img src="../imgs/boy.svg" width="40px" />
                <div>
                  <nav>米拉Miira</nav>
                  <div>18小时前</div>
                  <div class="com-body">
                    #十一月碎碎念#
                    豆腐地软蒸饺，美美素食我的爱。祝大家好日子蒸蒸日上！
                  </div>
                </div>
              </div>
            </div>
            <button @click="look">想看更多评论，进入社区+</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 最底栏 -->
    <div class="foot" id="foot">
      <div>
        <div class="foot-title" @click="joinUs"  v-if="item.admin !== 'true'">
          <span>欢迎积极加入我们</span>
          <img src="../assets/font/right.png" />
        </div>
        <div class="foot-title" v-if="item.admin === 'true'">
          <span>欢迎{{item.username}}用户回家!!!</span>
        </div>
        <div class="foot-content">
          <p>联系地址：哈尔滨远理工学院</p>
          <p v-if="item.admin !== 'true'">
            联系电话：13880636103
          </p>
          <p>联系电话：{{item.phone}}</p>
          <p>联系邮箱：414772903@qq.com</p>
        </div>
        <div class="foot-ft">
          <img src="../assets/font/wx.png" />
          <img src="../assets/font/QQ-circle-fill.png" />
          <img src="../assets/font/xlwb.png" />
          <img src="../assets/font/zh.png" />
        </div>
      </div>
      <img src="../imgs/teach.svg" width="600px" height="400px" />
    </div>
    <!-- 加入我们对话框 -->
    <a-modal v-model="visible2" class="join">
      <a-spin :spinning="spinning1" size="large">
        <div class="join_box">
          <img src="../imgs/brother.svg" width="300px" />
          <div>
            <h6>请输入你的名片</h6>
            <a-input
              placeholder="请输入你的中文名"
              style="margin-bottom: 10px"
              v-model="business_card"
              disabled
            />
            <a-radio-group style="margin-bottom: 10px" v-model="sex_value">
              <a-radio :value="1"> 男 </a-radio>
              <a-radio :value="2"> 女 </a-radio>
            </a-radio-group>
            <div>
              <a-date-picker
                placeholder="你的生日日期"
                style="margin-bottom: 10px"
                v-model="bir_time"
              />
            </div>
            <div>
              <div
                style="margin-bottom: 10px; font-size: 16px; font-weight: 400"
              >
                你的喜好:
              </div>
              <a-checkbox-group style="width: 200px; margin-bottom: 10px">
                <a-row>
                  <a-col :span="8">
                    <a-checkbox value="A"> 篮球 </a-checkbox>
                  </a-col>
                  <a-col :span="8">
                    <a-checkbox value="B"> 电竞 </a-checkbox>
                  </a-col>
                  <a-col :span="8">
                    <a-checkbox value="C"> 美食 </a-checkbox>
                  </a-col>
                  <a-col :span="8">
                    <a-checkbox value="D"> 足球 </a-checkbox>
                  </a-col>
                  <a-col :span="8">
                    <a-checkbox value="E"> 动漫 </a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
            </div>
            <a-button @click="join_us">加入我们</a-button>
          </div>
        </div>
      </a-spin>
    </a-modal>
    <a-back-top />
  </div>
</template>

<script>
import Shuffling from "../components/Shufflingfigure/Shuffling-figure.vue";
import Showfd from "../components/Showfd/Showfd.vue";
import CountDown from "../components/Countdown/Countdown.vue";
import Title from "../components/Title/Title.vue";
import Stroe from "../components/Store/store.vue";
import { healthy, perpic, joinu} from "../api/api";
// import "../style/home.css";
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
  // props: {
  //   num: 1,
  // },
  components: {
    "v-Shuffling": Shuffling,
    "v-Showfd": Showfd,
    "v-CountDown": CountDown,
    "v-Title": Title,
    "v-Store": Stroe,
  },
  data() {
    return {
      sex_value: '',
      bir_time: '',
      list: [
        {
          title: "做菜吧餐饮创立于",
          content: "2021",
          src: require("../assets/01.png"),
        },
        {
          title: "集团旗下品牌项目",
          content: "7个",
          src: require("../assets/02.png"),
        },
        {
          title: "菜品的个数含量数",
          content: "100+",
          src: require("../assets/04.png"),
        },
        {
          title: "合作品牌个数含量",
          content: "8+",
          src: require("../assets/03.png"),
        },
      ],
      Fdlist: [
        {
          name: "火焰鸡翅",
          pic: require("../assets/dishes/f-1.jpg"),
          content: '将鸡翅洗净，鸡翅的两面划几刀，将水拧干待用,将拧干水的鸡翅分别放入调味料：盐 小许，耗油小许，酱油小许，日式照烧酱，花生油来腌制。时间最好半个小时以上,鸡翅的一面煎好后，再慢慢的翻转过来，再煎另一面',
          evaluate: 1
        },
        {
          name: "麻辣全家桶",
          pic: require("../assets/dishes/f-2.jpg"),
          size: "1",
          content: '将鸡翅洗净，鸡翅的两面划几刀，将水拧干待用,将拧干水的鸡翅分别放入调味料：盐 小许，耗油小许，酱油小许，日式照烧酱，花生油来腌制。时间最好半个小时以上,鸡翅的一面煎好后，再慢慢的翻转过来，再煎另一面',
          evaluate: 3
        },
        {
          name: "疙瘩汤",
          pic: require("../assets/dishes/f-3.jpg"),
          content: '制作面疙瘩采用的是高筋面粉，也就是小麦芯的四分之一精华部位的面粉，同时加入了鸡蛋、花生油等，这样制作而成的面疙瘩，颗粒分明、口感劲道，而且色泽金黄。',
          evaluate: 5
        },
        {
          name: "特色炒酸奶",
          pic: require("../assets/dishes/f-6.jpg"),
          size: "1",
          content: '冷冻好的炒酸奶取出，根据喜好切成块。建议吃多少切多少，剩下的部分放回冰箱继续冷冻，炒酸奶不是特别甜，不像冰淇淋和雪糕那样越吃越口渴，冰力十足透心凉，比雪糕好吃还解馋。',
          evaluate: 4.5
        },
        {
          name: "烤面包",
          pic: require("../assets/dishes/f-4.jpg"),
          content: '接着准备刷子和蛋黄，准备烤面包的工具（不锈钢盘或铝盘），在其接触面团的表面涂上一层玉米油，烤箱开150度预热5分钟，将发酵好的面包团放烤箱里加热，设置温度170度，时长25分钟。',
          evaluate: 3.5
        },
        {
          name: "锡纸脑花",
          pic: require("../assets/dishes/f-5.jpg"),
          content: '烤盘上放上锡纸，锡纸要烤盘的2倍，然后锡纸上铺上黑木耳，土豆片，再把猪脑铺上去，撒上胡椒粉，花椒粉，孜然粉，花椒油，喜欢吃辣的可以放点辣椒酱，最后放把葱。',
          evaluate: 1
        },
        {
          name: "椰香红豆",
          pic: require("../assets/dishes/f-7.jpg"),
          content: '将鸡翅洗净，鸡翅的两面划几刀，将水拧干待用,将拧干水的鸡翅分别放入调味料：盐 小许，耗油小许，酱油小许，日式照烧酱，花生油来腌制。时间最好半个小时以上,鸡翅的一面煎好后，再慢慢的翻转过来，再煎另一面',
          evaluate: 2
        },
        {
          name: "凉拌套餐",
          pic: require("../assets/dishes/f-8.jpg"),
          size: "1",
          content: '食材都用清水烫过，制作拌饭酱（吃不惯韩式酱，有的可以加韩式辣酱，根据个人喜好）锅里加油适量+放入蒜头炒出香味+清水+蚝油+酱油+白糖（根据个人口味适量，喜欢咸点酱油多一点，喜欢甜点白糖多点）。',
          evaluate: 4
        },
        {
          name: "烤鸡手",
          pic: require("../assets/dishes/f-9.jpg"),
          content: '将鸡翅洗净，鸡翅的两面划几刀，将水拧干待用,将拧干水的鸡翅分别放入调味料：盐 小许，耗油小许，酱油小许，日式照烧酱，花生油来腌制。时间最好半个小时以上,鸡翅的一面煎好后，再慢慢的翻转过来，再煎另一面',
          evaluate: 1.5
        },
      ],
      clist: [
        {
          pic: require("../assets/shicai/01.jpg"),
          name: "莲藕",
          tro: "最好的状态是心不堵",
        },
        {
          pic: require("../assets/shicai/01.jpg"),
          name: "莲藕",
          tro: "最好的状态是心不堵",
        },
        {
          pic: require("../assets/shicai/02.jpg"),
          name: "南瓜",
          tro: "金黄秋意浓",
        },
        {
          pic: require("../assets/shicai/03.jpg"),
          name: "山药",
          tro: "补虚上品“小人参”",
        },
        {
          pic: require("../assets/shicai/04.jpg"),
          name: "梨",
          tro: "独享不是错",
        },
        {
          pic: require("../assets/shicai/05.jpg"),
          name: "芋头",
          tro: "芋，我所欲也",
        },
        {
          pic: require("../assets/shicai/06.jpg"),
          name: "紫薯",
          tro: "高贵优雅紫",
        },
        {
          pic: require("../assets/shicai/07.jpg"),
          name: "板栗",
          tro: "举累了放嘴里",
        },
        {
          pic: require("../assets/shicai/08.jpg"),
          name: "鲫鱼",
          tro: "一勺清汤胜万钱",
        },
        {
          pic: require("../assets/shicai/09.jpg"),
          name: "猪里脊",
          tro: "超嫩小鲜肉",
        },
        {
          pic: require("../assets/shicai/10.jpg"),
          name: "牛肉",
          tro: "牛气冲天",
        },
        {
          pic: require("../assets/shicai/11.jpg"),
          name: "螃蟹",
          tro: "霸道总裁就是我",
        },
        {
          pic: require("../assets/shicai/13.jpg"),
          name: "鱿鱼",
          tro: "炒我，没那么简单",
        },
        {
          pic: require("../assets/shicai/14.jpg"),
          name: "鸡翅",
          tro: "老少通吃",
        },
        {
          pic: require("../assets/shicai/12.jpg"),
          name: "排骨",
          tro: "可记得吮指之乐",
        },
        {
          pic: require("../assets/shicai/04.jpg"),
          name: "梨",
          tro: "独享不是错",
        },
        {
          pic: require("../assets/shicai/04.jpg"),
          name: "梨",
          tro: "独享不是错",
        },
        {
          pic: require("../assets/shicai/04.jpg"),
          name: "梨",
          tro: "独享不是错",
        },
      ],
      item: {},
      data: 0,
      visible: false,
      rolling: true,
      visible_make: false,
      previewVisible: false,
      previewImage: "",
      fileList: [],
      spinning: false,
      visible2: false,
      spinning1: false,
      form: {
        name: '',
        city: '',
        time: '',
        content: ''
      },
      visible_show: false,
      rules: {
         name: [
          { required: true, message: '请输入你的菜名', trigger: 'blur' },
          { min: 3, max: 10, message: '请注意字符', trigger: 'blur' },
        ],
        city: [{ required: true, message: '请选择你的城市', trigger: 'blur' },],
        content: [
          { required: true, message: '请输入做菜方式', trigger: 'blur' },
          { min: 10, max: 2000, message: '请注意字符10-200', trigger: 'blur' },
        ],
      },
      show_Food: '',
      value_show: null,
      business_card: '',
      visible_video: false,
      healthyGroup: null,
      admin: '',
      id: '',
      Username: ''
    };
  },
  mounted() {
    this.init()
    this.checkuserID();
  },
  watch: {
    visible_video: function () {
      if (this.visible_video === false) {
        let myVideo = document.getElementById('video')
        myVideo.pause()
      }
    }
  },
  methods: {
    async init() {
      const res = await healthy({})
      res.data.forEach((item) => {
        item.number = Number(item.number)
      })
      this.healthyGroup = res.data
      const obj = sessionStorage.getItem('user')
      console.log(obj)
      this.business_card = JSON.parse(obj).username
      this.admin = JSON.parse(obj).admin
      this.id = JSON.parse(obj)._id
      this.Username = JSON.parse(obj).username
      // console.log(res.data)
    },
    Morefood() {
      this.visible = true;
    },
    showImg() {
      this.visible_video = true
      console.log("ok");
    },
    handleCancel_video() {
      this.visible_video = false
    },
    Moregreens() {
      this.$router.push("../delicious");
    },
    checkuserID() {
      const objItem = sessionStorage.getItem('user')
      this.item = JSON.parse(objItem)
      var username = window.sessionStorage.getItem("user");
      console.log(username,'okok')
      if (username === "tourists") {
        window.sessionStorage.removeItem("userID");
      }
    },
    Jumpstore() {
      this.rolling = false;
    },
    Jumpway() {
      this.rolling = true;
      // this.$router.go("/home");
    },
    provide() {
      this.visible_make = true;
    },
    handleCancel_make() {
      this.form.time = undefined
      this.visible_make = false;
      this.fileList = []
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      // console.log(this.previewImage)
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
      console.log(this.fileList)
    },
    onSubmit() {
      this.$refs['ruleForm'].validate(async valid => {
        if (valid) {
          // console.log(this.fileList)
          const arr = this.fileList.map((item, index) => {
            return item.response.msg
          })
          console.log(arr)
          const res = await perpic({
            name: this.form.name,
            city: this.form.city,
            step: this.form.content,
            image: arr,
            username: this.Username,
            adminspecial: false
          })
          console.log(res)
          this.spinning = !this.spinning;
          setTimeout(() => {
            this.visible_make = false;
            this.spinning = false;
            this.$message.success("提交成功，等待后台核查");
            this.$refs.ruleForm.resetFields();
            this.form.time = ''
          }, 2000);
        } else {
          return false;
        }
      });
    },
    Cancel() {
      this.visible_make = false;
      this.$refs.ruleForm.resetFields();
      this.form.time = undefined
      this.fileList = []
    },
    JumpAdd() {
      this.$router.push("../project");
    },
    joinCenter() {
      this.$router.push("../health");
    },
    look() {
      this.$router.push("../community");
    },
    joinUs() {
      this.visible2 = true;
    },
    async join_us() { 
      if ( this.sex_value === '') {
        this.$message.error('请输入你的性别')
        return
      }
      if ( this.bir_time === '') {
        this.$message.error('请输入你的生日')
        return
      }
      this.spinning1 = !this.spinning1;
      const res = await joinu({
        business_card : this.business_card,
        sex_value: this.sex_value,
        bir_time: this.bir_time,
        admin: this.admin,
        _id: this.id 
      })
      console.log(res)
      setTimeout(() => {
        this.visible2 = false;
        this.spinning1 = false;
        this.$message.success("亲~ 等待我们核查哦");
      }, 1000);
    },
    showFood(e) {
      this.show_Food = e
      this.value_show = e.evaluate
      this.visible_show = true
    },
    handleCancel_show() {
      this.visible_show = false
    }
  },
};
</script>

<style src="../style/home.css" scoped>
/* .ant-menu /deep/ {
  background: transparent;
} */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>