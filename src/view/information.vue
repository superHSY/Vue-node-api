<template>
    <div class="bgwrap">
        <!-- 开头 -->
        <div class="info_title">
                <div class="title_left">
                    <span>欢迎来到个人中心</span>
                    <img src="../imgs/center.svg" width="80px">
            </div>
            <div class="title-right" @click="backPage">
                <img src="../imgs/person/back.svg" width="40px">
                <span>返回</span>
            </div>
        </div>
       <!-- 内容 -->
        <div>
                <div class="content_body">
                    <div class="body_left">
                        <img src="../imgs/boy.svg" width="60px">
                        <p style="margin-top:10px">
                            用户名称：
                            <span>{{item.username}}</span>
                        </p>
                        <p>
                            用户等级：
                            <span v-if="item.admin === 'false'">1星</span>
                            <span v-if="item.admin === 'true' && item.username !== '我是超级管理员'">2星</span>
                            <span v-if="item.admin === 'true' && item.username === '我是超级管理员'">3星</span>
                        </p>
                        <p>
                            用户喜好：
                            <span v-if="this.item.flavor === 'qd'">清淡</span>
                        </p>
                        <p>
                            用户手机：
                            <span>{{item.phone}}</span>
                        </p>
                        <p>
                            是否管理：
                            <span v-if="item.admin === 'false'">(不是管理者)</span>
                            <span v-if="item.admin === 'true'">(管理者)</span>
                        </p>
                        <p>
                            <span v-show="!location && !positioning">获取地理位置：</span>
                            <span>{{ location }}</span>
                            <a v-show="!location && !positioning" @click="getLocation">点击获取位置</a>
                            <a-spin :spinning="positioning" />
                            <span v-show="positioning">
                                大概需要需等待
                                <span class="red">{{ countDown }}</span> 秒
                            </span>
                        </p>
                    
                    </div>
                    <div class="body_right">
                        <div>
                            <label>
                                修改名称:
                                <a-input v-model="fixNmae" style="width:240px" disabled/>
                            </label>
                        </div>
                        <div>
                            <label>
                                修改密码:
                                <a-input-password v-model="fixPass" placeholder="修改密码" style="width:240px"/>
                            </label>
                        </div>
                        <div>
                            <label>
                                确认密码:
                                <a-input-password v-model="fePass" placeholder="确认密码" style="width:240px"/>
                            </label>
                        </div>
                        <div>
                            <a-button style="margin-right: 30px" @click="repairPass">提交</a-button>
                            <a-button @click="cancel">清除</a-button>
                        </div>
                    </div>
                </div>
        </div>
        <a-divider />
       <!-- 底部 -->
        <div class="ft">
                <!-- <div class="ft_left">
                    <h5>用户信誉评分</h5>
                    <div id="echarts" class="echarts_elv"></div> 
                </div> -->
                <div class="ft_right">
                    <img src="../imgs/person/coor.svg" width="240px">
                    <div v-if="item.admin === 'true'" class="apply">
                        <p @click="apply_per(1)" v-if="item.username === '我是超级管理员'">管理人员申请表</p>
                        <p @click="mana_food(2)">管理专题申请表</p>
                        <p @click="comm_apply(3)">管理社区申请表</p>
                        <p @click="show_apply(4)" v-if="item.username === '我是超级管理员'">管理人员列表</p>
                        <p @click="mana_apply(5)" v-if="item.username === '我是超级管理员'">专题菜谱管理</p>
                    </div>
                </div>
        </div>
        <!-- 弹出框 -->
        <a-modal :visible="visible" :title="viv_title === 1 ? '管理人员申请表' : '专题/社区/人员申请/菜谱管理表'" @cancel="handleCancel" :footer="null">
            <!-- 管理人员 -->
            <a-spin :spinning='spinning' v-if="viv_title === 1">
                <div v-if="arr_per.length > 0">
                    <div v-for="(item) in arr_per" :key="item.id" >
                        <div class="apply_box" >
                        <p>申请人姓名: {{item.business_card}}</p>
                        <p>申请时间段: {{item.bir_time}}</p>
                        <p>申请人性别: <span v-if="item.sex_value === '1'">男</span><span v-if="item.sex_value === '2'">女</span></p>

                        <div class="apply_btn">
                            <div>
                                <a-button style="margin-right: 30px" @click="refull(item)">同意</a-button>
                                    <a-button @click="reject(item)">拒绝</a-button>
                            </div>
                            
                            <img src="../imgs/apply.svg" width="36px">
                        </div>

                        </div>
                    </div>
                </div>
            </a-spin>
            <!-- 专题申请 -->
            <div v-if="viv_title === 2">
                <div v-for="item in manaArr" :key="item.id" >
                    <div v-if="item.adminspecial === 'false'" class="viv-item">
                        <div>菜品名称: {{item.name}}</div>
                        <div class="viv-box">
                            <img src="../imgs/boy.svg" width="50px">
                            <p>厨师姓名: {{item.username}}</p>
                            <p>菜品地区: {{item.city}}</p>
                            <p>做菜步骤: {{item.step}}</p>
                            <div>
                                <a-button style="margin-right: 20px" @click="refull_spic(item)">同意</a-button>
                                <a-button @click="reject_spic(item)">拒绝</a-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="newmanarr.length === 0" class="nodata">
                     <img src="../imgs/nodata.svg" width="400px">
                </div>
            </div>
            <!-- 社区申请 -->
            <div v-if="viv_title === 3">
                <div v-for="item in commarr" :key="item.id" >
                    <div v-if="item.adminspecial === 'false'" class="viv-item">
                        <div>菜品名称: {{item.name}}</div>
                        <div class="viv-box">
                            <img src="../imgs/boy.svg" width="50px">
                            <p>社区用户: {{item.username}}</p>
                            <p>菜品时间: {{item.time}}</p>
                            <p>做菜步骤: {{item.step}}</p>
                            <div>
                                <a-button style="margin-right: 20px" @click="refull_comm(item)">同意</a-button>
                                <a-button @click="reject_comm(item)">拒绝</a-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="newcommarr.length === 0" class="nodata">
                     <img src="../imgs/nodata.svg" width="400px">
                </div>
            </div>
            <div v-if="viv_title === 4">
                <div v-for="i in arr" :key="i.id">
                    <span>管理者姓名: </span><span>{{ i.username }}</span>
                    <div style="margin: 10px 0">
                        <a-button @click="cancel_mana(i)">取消管理资格</a-button>
                    </div>
                </div>
            </div>
            <div v-if="viv_title === 5">
                <div>
                    <div>成都菜谱:</div>
                    <div v-for="i in cdarr" :key="i._id" class="item">
                        <div style="width: 150px">
                            <span>提交者: {{ i.username }} ---- 菜名: {{ i.name }}</span>
                        </div>
                        <a-button @click="dele_query(i)">删除菜谱</a-button>
                    </div>
                    <div>杭州菜谱:</div>
                    <div v-for="i in hzarr" :key="i._id" class="item">
                        <div style="width: 150px">
                            <span>提交者: {{ i.username }} ---- 菜名: {{ i.name }}</span>
                        </div>
                        <a-button @click="dele_query(i)">删除菜谱</a-button>
                    </div>
                    <div>哈尔滨菜谱:</div>
                    <div v-for="i in hebarr" :key="i._id" class="item">
                        <div style="width: 150px">
                            <span>提交者: {{ i.username }} ---- 菜名: {{ i.name }}</span>
                        </div>
                        <a-button @click="dele_query(i)">删除菜谱</a-button>
                    </div>
                    <div>北京菜谱:</div>
                    <div v-for="i in bjarr" :key="i._id" class="item">
                        <div style="width: 150px">
                            <span>提交者: {{ i.username }} ---- 菜名: {{ i.name }}</span>
                        </div>
                        <a-button @click="dele_query(i)">删除菜谱</a-button>
                    </div>
                </div>
            </div>
            <!-- 没有数据 -->
            <div v-if="arr_per.length === 0 && viv_title === 1" class="nodata">
                <img src="../imgs/nodata.svg" width="400px">
            </div>
        </a-modal>
    </div>
</template>

<script>
import { loadBMap } from '../utils/local'
import { dateFormat } from '../utils/date'
import { delequery, findjoin, dele, refull, query, delespic, refullpic, meals, refullcomm, delecomm, repair, findperple, cancel } from "../api/api";
export default {
    data() {
        return {
            spinning: false,
            BMap: null,
            geolocation: null, // Geolocation对象实例
            positioning: false, // 定位中
            positioningInterval: null, // 定位倒计时计时器
            countDown: 30, // 倒计时，单位秒
            location: null, // 位置信息
            ad_super: 0.8,
            item: {},
            visible:false,
            // option: {
            //     series: [
            //         {
            //         type: 'gauge',
            //         startAngle: 180,
            //         endAngle: 0,
            //         min: 0,
            //         max: 1,
            //         splitNumber: 8,
            //         axisLine: {
            //             lineStyle: {
            //             width: 6,
            //             color: [
            //                 [0.25, '#FF6E76'],
            //                 [0.5, '#FDDD60'],
            //                 [0.75, '#58D9F9'],
            //                 [1, '#7CFFB2']
            //             ]
            //             }
            //         },
            //         pointer: {
            //             icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            //             length: '12%',
            //             width: 10,
            //             offsetCenter: [0, '-42%'],
            //             itemStyle: {
            //             color: 'auto'
            //             }
            //         },
            //         axisTick: {
            //             length: 12,
            //             lineStyle: {
            //             color: 'auto',
            //             width: 2
            //             }
            //         },
            //         splitLine: {
            //             length: 20,
            //             lineStyle: {
            //             color: 'auto',
            //             width: 5
            //             }
            //         },
            //         axisLabel: {
            //             color: '#464646',
            //             fontSize: 20,
            //             distance: -60,
            //             formatter: function (value) {
            //             if (value === 0.875) {
            //                 return 'A';
            //             } else if (value === 0.625) {
            //                 return 'B';
            //             } else if (value === 0.375) {
            //                 return 'C';
            //             } else if (value === 0.125) {
            //                 return 'D';
            //             }
            //             return '';
            //             }
            //         },
            //         title: {
            //             offsetCenter: [0, '-20%'],
            //             fontSize: 30
            //         },
            //         detail: {
            //             fontSize: 20,
            //             offsetCenter: [0, '0%'],
            //             valueAnimation: true,
            //             formatter: function (value) {
            //             return Math.round(value * 100) + '分';
            //             },
            //             color: 'auto'
            //         },
            //         data: [
            //             {
            //             value: 0.8,
            //             }
            //         ]
            //         }
            //     ]
            // },
            arr_per: [],
            viv_title: '',
            manaArr: [],
            newmanarr: [],
            commarr: [],
            newcommarr: [],
            fixNmae: '',
            fixPass: '',
            fePass: '',
            id: '',
            arr: [],
            cdarr: [],
            hzarr: [],
            hebarr: [],
            bjarr: []
        }
    },
    mounted() {
        const _this = this
        window.initBaiduMapScript = () => {
            _this.BMap = window.BMap
        }
        loadBMap('initBaiduMapScript')
        // let myChart = this.$echarts.init(document.getElementById("echarts"));
        // //设置echarts对象的option属性
        // myChart.setOption(this.option)
        this.titleGet()
    },
    watch: {
        arr: 'changeData'
    },
   methods: {
       async repairPass() {
        if(this.fixPass === '') {
            this.$message.error('密码不能为空')
            return
        }
        if(this.fixPass !== this.fePass) {
            this.$message.error('密码不一致')
            return
        }
        const res = await repair({
            _id:this.id,
            password: this.fixPass
        })
        this.$message.success('更改密码成功！')
        this.$router.push('/')
        console.log(res)    
        },
        cancel() {
            this.fixPass = ''
            this.fePass = ''
        },
        backPage() {
            this.$router.go(-1)
        },
        handleCancel () {
            this.visible = false
        },
        // 获取地理定位
        getLocation() {
        const _this = this
        _this.geolocation = new _this.BMap.Geolocation()
        if (_this.geolocation) {
            // 开启SDK辅助定位，仅当使用环境为移动web混合开发，且开启了定位sdk辅助定位功能后生效
            _this.geolocation.enableSDKLocation()
            // 开始定位
            this.positioning = true
            // 倒计时
            this.positioningInterval = setInterval(() => {
            if (this.countDown === 0) {
                this.countDown = 30
                clearInterval(this.positioningInterval)
            } else {
                this.countDown--
            }
            }, 1000)
            // 位置选项
            const positionOptions = {
            enableHighAccuracy: true, // 要求浏览器获取最佳结果
            timeout: 30, //    超时时间
            maximumAge: 0 // 允许返回指定时间内的缓存结果。如果此值为0，则浏览器将立即获取新定位结果
            }
            // 获取用户位置信息
            _this.geolocation.getCurrentPosition(position => {
            _this.resetPositioning()
            // 获取定位结果状态码
            const statusCode = _this.geolocation.getStatus()
            let msg = '由于未知错误而无法检索设备的位置' // 提示消息
            let msgType = 'error' // 消息类型
            // 判断结果状态码，为0代表获取成功，读取省市、经纬度
            switch (statusCode) {
                case 0:
                msgType = 'success'
                msg = '获取地理位置定位请求成功'
                if (position) {
                    // 数据变量定义
                    let lat = 0.0 // 经度
                    let lng = 0.0 // 纬度
                    let province = '未知' // 经度
                    let city = '未知' // 纬度

                    // 坐标
                    if (position.point) {
                    lat = position.point.lat
                    lng = position.point.lng
                    }
                    // 位置
                    if (position.address) {
                    province = position.address.province
                    city = position.address.city
                    }
                    // _this.location = {
                    // 省份: province,
                    // 城市: city,
                    // 经度: lat,
                    // 纬度: lng
                    // }
                    _this.location = "当前您的城市是:" + province + "--" + city 
                } else {
                    msg = '由于未知错误而无法检索设备的位置'
                }
                break
                case 2:
                msg = '由于未知错误而无法检索设备的位置'
                break
                case 4:
                case 5:
                msg = '位置服务请求非法'
                break
                case 6:
                msg = '应用程序没有使用位置服务的权限'
                break
                case 7:
                msg = '网络不可用或者无法连接到获取位置信息的卫星'
                break
                case 8:
                msg = '无法在指定的最大超时间隔内检索位置信息'
                break
                default:
                msg = '由于未知错误而无法检索设备的位置'
                break
            }
            _this.$notification[msgType]({
                message: '提示',
                description: msg
            })
            }, positionOptions)
            } else {
                _this.$notification.error({
                message: '提示',
                description: '您的浏览器不支持地理位置服务'
                })
            }
        },
        // 重置定位相关数据
        resetPositioning() {
            this.positioning = false
            this.location = null
            this.countDown = 30
            clearInterval(this.positioningInterval)
        },
        titleGet() {
            const objItem = sessionStorage.getItem('user')
            this.item = JSON.parse(objItem)
            const obj = JSON.parse(objItem)
            this.fixNmae = obj.username
            this.id = obj._id
            console.log(this.id)
        },
        async apply_per(e) {
            this.viv_title = e
            this.visible = true
            const res = await findjoin({})
            this.arr_per = res.data
            console.log(this.arr_per)
            this.arr_per.forEach((item) => {
                item.bir_time = dateFormat(item.bir_time)
            })
        },
        async mana_food(e) {
            this.viv_title = e
            this.visible = true
            const res = await query({})
            this.manaArr = res.data
            this.newmanarr = res.data.filter(item => {
                return item.adminspecial === 'false'
            })
            // console.log(this.newmanarr)
        },
        async mana_apply(e) {
            this.viv_title = e
            this.visible = true
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
            console.log(res.data)
        },
        async comm_apply(e) {
            this.viv_title = e
            this.visible = true
            const res = await meals({})
            this.commarr = res.data
            this.newcommarr = res.data.filter(item => {
                return item.adminspecial === 'false'
            })
            console.log(this.newmanarr)
        },
        async show_apply(e) {
            this.viv_title = e
            this.visible = true
            const res = await findperple({})
            this.arr = res.data.filter(i => {return i.admin === 'true'})
            console.log(this.arr)
        },
        // 拒绝
        async reject(e) {
            this.spinning = true
            const res = await dele({
                business_card: e.business_card
            })
            setTimeout(async () => {
                const res1 = await findjoin({})
                this.arr_per = res1.data
                this.spinning = false
            }, 1000)
        },
        async dele_query(e) {
            const res = await delequery({
                _id: e._id
            })
            console.log(res)
            const res1 = await query({})
            this.cdarr = res1.data.filter(item => {
                return item.city === "成都" && item.adminspecial === "true"
            })
            this.hzarr = res1.data.filter(item => {
            return item.city === "杭州" && item.adminspecial === "true"
            })
            this.hebarr = res1.data.filter(item => {
            return item.city === "哈尔滨" && item.adminspecial === "true"
            })
            this.bjarr = res1.data.filter(item => {
            return item.city === "北京" && item.adminspecial === "true"
            })
        },
        async cancel_mana(e) {
            const res = await cancel({
                _id:e._id
            })
            console.log(res)
        },
        async reject_spic(e) {
            console.log(e)
            const res = await delespic({
                name: e.name
            })
            const res1 = await query({})
            this.manaArr = res1.data
            this.newmanarr = this.manaArr.filter(item => {
                return item.adminspecial === 'false'
            })
        },
        async reject_comm(e) {
            console.log(e.name)
            const res = await delecomm({
                name: e.name
            })
            const res1 = await meals({})
            this.commarr = res1.data
            this.newcommarr = this.commarr.filter(item => {
                return item.adminspecial === 'false'
            })
        },
        // 同意
        async refull(e) {
            // console.log(e)
            // console.log(e._id)
            const res = await refull({
                _id:e._id
            })
            if (res.status === 200) {
                const res2 = await dele({
                    business_card: e.business_card
                })
                const res3 = await findjoin({})
                this.arr_per = res3.data
                this.$message.success('同意申请')
            }
            // console.log(res)
        },
        async refull_spic(e) {
            console.log(e)
            const res = await refullpic({
                _id: e._id
            })
             if (res.status === 200) {
                Array.prototype.remove = function(val) { 
                    var index = this.indexOf(val); 
                        if (index > -1) { 
                        this.splice(index, 1); 
                        }
                };
                this.manaArr.remove(e)
                this.newmanarr = this.manaArr.filter(item => {
                    return item.adminspecial === 'false'
                })
             }
            console.log(res)
        },
        async refull_comm(e) {
            console.log(e)
            const res = await refullcomm({
                _id: e._id
            })
             if (res.status === 200) {
                Array.prototype.remove = function(val) { 
                    var index = this.indexOf(val); 
                        if (index > -1) { 
                        this.splice(index, 1); 
                        } 
                };
                this.commarr.remove(e)
                this.newcommarr = this.commarr.filter(item => {
                    return item.adminspecial === 'false'
                })
             }
            console.log(res)
        },
        async changeData() {
            const res = await findperple({})
            this.arr = res.data.filter(i => {return i.admin === 'true'})
        }
   }
}
</script>

<style src="../style/information.css" scoped>

</style>