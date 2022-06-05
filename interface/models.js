const mongoose = require('mongoose')
// 链接数据库
mongoose.connect('mongodb://localhost:27017/super')

// 数据库连接成功
mongoose.connection.on('connected', () => {
  console.log('数据库连接成功')
})
// 注册和登录
const user = new mongoose.Schema({
  username: {
    type: String,
    unique: true, //字段是否唯一
    // _id: false
    _id: new Date()
  },
  password: {
    type: String,
    set(val) {
      // 通过bcryptjs对密码加密返回值 第一个值返回值， 第二个密码强度
      return require('bcryptjs').hashSync(val, 10)
    }
  },
  phone: {
    type: String,
    unique: true, //字段是否唯一
    _id: new Date()
  },
  flavor: {
    type: String
  },
  admin: {
    type: String
  }
})
const User = mongoose.model('User', user)

// 渲染健康社区页面
const temp = new mongoose.Schema({})
const healthy = mongoose.model('healthy', temp)

// 渲染菜品中心
const food = new mongoose.Schema({})
const foodcenter = mongoose.model('foodcenter', food)
const lunch = new mongoose.Schema({})
const foodlunch = mongoose.model('foodlunch', lunch)
const dinner = new mongoose.Schema({})
const fooddinner = mongoose.model('fooddinner', dinner)

// 主页面提交
const perImage = new mongoose.Schema({
  name: {
    type: String,
    // unique: true, //字段是否唯一
    _id: new Date()
  },
  city: {
    type: String,
  },
  step: {
    type: String,
  },
  image: {
    type: Array
  },
  username: {
    type: String
  },
  adminspecial: {
    type: String
  }
})
const perpic = mongoose.model('perpic', perImage)

// 早晚餐提交
const meal = new mongoose.Schema({
  name: {
    type: String,
    // unique: true, //字段是否唯一
    _id: new Date()
  },
  time: {
    type: String,
  },
  step: {
    type: String,
  },
  image: {
    type: Array
  },
  username: {
    type: String
  },
  adminspecial: {
    type: String
  }
})
const mealImage = mongoose.model('mealImage', meal)

// 加入管理者
const joinUs = new mongoose.Schema({
  business_card: {
    type: String,
  },
  sex_value: {
    type: String,
  },
  bir_time: {
    type: String
  },
  admin: {
    type: Boolean
  }
})
const joinu = mongoose.model('joinu', joinUs)

// 评论区
const Area = new mongoose.Schema({
  commit: {
    type: String,
  },
  name: {
    type: String,
  },
  username: {
    type: String
  },
})
const area = mongoose.model('area', Area)



// 数据库断开或者连接失败
mongoose.connection.on('disconnected', () => {
  console.log('数据库断开')
})

// 数据库连接异常
mongoose.connection.on('error', () => {
  console.log('数据库连接异常')
})

//将文件暴露出去
module.exports = { User, healthy, foodcenter, foodlunch, fooddinner, perpic, joinu, mealImage, area };



