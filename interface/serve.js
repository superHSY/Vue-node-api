// 引入文件
const {User, healthy, foodcenter, foodlunch, fooddinner, perpic, joinu, mealImage, area} = require('./models')
const express = require('express');
const path = require('path')
const app = express();

const multiparty = require('multiparty');
const fs = require('fs')


// 引入中间件
const bodyParser = require('body-parser')

// 解析中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const SECRET = 'ewgfvwergvwsgw5454gsrgvsvsd'

const jwt = require('jsonwebtoken')

// 静态资源
app.use(express.static(path.join(__dirname, 'public')))


// 跨域
app.use((req, res, next) => {
    //设置请求头
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Max-Age': 1728000,
        'Access-Control-Allow-Origin': req.headers.origin || '*',
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Content-Type': 'application/json; charset=utf-8'
    })
    req.method === 'OPTIONS' ? res.status(204).end() : next()
})


// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Headers', 'mytoken');
//     res.header("Access-control-max-age", 1000);
//     next();
// });



app.listen(8081,() =>{
    console.log('后台启动')
})

// 监听测试
app.get('/api/test',async(req,res) =>{
    res.send('ok')
})

// 注册
app.post('/api/register',async(req,res) =>{
    // const username = String(req.body.username)
    const Zcuser = await User.findOne({
        username:req.body.username
    })
    if (Zcuser) {
        return res.send({
            message:"用户存在, 请更换用户名"
        })
    }
    const Phone = await User.findOne({
        phone:req.body.phone
    })
    if (Phone) {
        return res.send({
            message:"手机号存在, 请更换用户名"
        })
    }
    // console.log(String(req.body.password))
    // 返回出去
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        flavor: req.body.flavor,
        admin: req.body.admin
    })

    res.send(user)
})

// 登录
app.post('/api/login',async(req,res) =>{
    const cg = '登录成功'
    const user = await User.findOne({
        username:req.body.username
    })
    if(!user) {
        return res.send({
            message:"用户不存在"
        })
    }

    const isPasswordValid = require('bcryptjs').compareSync(
        req.body.password,
        user.password
    )
    if(!isPasswordValid){
        return res.send({
            message:"密码无效"
        })
    }
    
    const token = jwt.sign({
        id:String(user._id)
    },SECRET)

    // 生成token
    res.send({
        user,
        cg,
        token
    })
})

// 渲染home页面
app.get('/api/healthy', async(req, res) => {
    const user = await healthy.find({
        // name:req.body.name
    })
    res.send(user)
})

// 渲染健康页面
app.get('/api/foodcenter', async(req, res) => {
    const user = await foodcenter.find({
        // name:req.body.name
    })
    res.send(user)
})

app.get('/api/foodlunch', async(req, res) => {
    const user = await foodlunch.find({
        // name:req.body.name
    })
    res.send(user)
})

app.get('/api/fooddinner', async(req, res) => {
    const user = await fooddinner.find({
        // name:req.body.name
    })
    res.send(user)
})

// 图片
app.post('/api/pic', function(req, res, next) {
    var form = new multiparty.Form()
    form.parse(req, function(err, fields, files) {
        if (err) {
            console.log('上传失败', err)
        } else {
            console.log('文件列表', files)
            var file = files.file[0]

            var rs = fs.createReadStream(file.path)
            var newPath = '/imgs/uploads/' + file.originalFilename
            var ws = fs.createWriteStream('./public' + newPath)
            rs.pipe(ws)
            ws.on('close', function () {
                console.log('文件上传成功')
                res.send({err: '', msg: 'http://localhost:8081' + newPath})
            })
        }
    })
})

// meal图片
app.post('/api/mealpic', function(req, res, next) {
    var form = new multiparty.Form()
    form.parse(req, function(err, fields, files) {
        if (err) {
            console.log('上传失败', err)
        } else {
            console.log('文件列表', files)
            var file = files.file[0]

            var rs = fs.createReadStream(file.path)
            var newPath = '/imgs/meals/' + file.originalFilename
            var ws = fs.createWriteStream('./public' + newPath)
            rs.pipe(ws)
            ws.on('close', function () {
                console.log('文件上传成功')
                res.send({err: '', msg: 'http://localhost:8081' + newPath})
            })
        }
    })
})

// 提交meals
app.post('/api/mealImage', async(req, res) => {
    const formdata = await mealImage.create({
        name: req.body.name,
        time: req.body.time,
        step: req.body.step,
        image: req.body.image,
        username: req.body.username,
        adminspecial: req.body.adminspecial
    })
    res.send(formdata)
})

// 查询meals
app.get('/api/meals', async(req, res) => {
    const formdata = await mealImage.find({})
    res.send(formdata)
})

// 提交表单
app.post('/api/perpic', async(req, res) => {
    const formdata = await perpic.create({
        name: req.body.name,
        city: req.body.city,
        step: req.body.step,
        image: req.body.image,
        username: req.body.username,
        adminspecial: req.body.adminspecial
    })
    res.send(formdata)
})

// 查询表单  
app.get('/api/query', async(req, res) => {
    const formdata = await perpic.find({})
    res.send(formdata)
})

// 查询按钮
app.post('/api/queryfood', async(req, res) => {
    const formdata = await perpic.findOne({
        name: req.body.name
    })
    res.send(formdata)
})

// 管理员删除菜谱
app.post('/api/delefood', async(req, res) => {
    const formdata = await perpic.deleteOne({
        _id: req.body._id
    })
    res.send(formdata)
})

// 删除表单
app.post('/api/delespic', async(req, res) => {
    const joindata = await perpic.deleteOne({
        name: req.body.name
    })
    res.send(joindata)
})

// 同意表单
app.post('/api/refullpic', async(req, res) => {
    const whereStr = {_id:req.body._id}
    console.log(whereStr)
    const newState = {$set: { adminspecial: 'true' }}
    const joindata = perpic.updateOne(whereStr,newState).then(rel => {
        console.log('ok')
        res.send(joindata)
    })
})

// 同意表单
app.post('/api/refullcomm', async(req, res) => {
    const whereStr = {_id:req.body._id}
    console.log(whereStr)
    const newState = {$set: { adminspecial: 'true' }}
    const joindata = mealImage.updateOne(whereStr,newState).then(rel => {
        console.log('ok')
        res.send(joindata)
    })
})

app.post('/api/delecomm', async(req, res) => {
    const joindata = await mealImage.deleteOne({
        name: req.body.name
    })
    res.send(joindata)
})

// 加入我们
app.post('/api/joinu', async(req, res) => {
    const joindata = await joinu.create({
        business_card: req.body.business_card,
        sex_value: req.body.sex_value,
        bir_time: req.body.bir_time,
        admin: req.body.admin,
        _id: req.body._id
    })
    res.send(joindata)
})

// 查询加入我们
app.get('/api/findjoin', async(req, res) => {
    const joindata = await joinu.find({})
    res.send(joindata)
})

// 删除申请人
app.post('/api/dele', async(req, res) => {
    const joindata = await joinu.deleteOne({
        business_card: req.body.business_card
    })
    res.send(joindata)
})

// 同意申请人
app.post('/api/refull', (req, res) => {
    const whereStr = {_id:req.body._id}
    console.log(whereStr)
    const newState = {$set: { admin: 'true' }}
    const joindata = User.updateOne(whereStr,newState).then(rel => {
        console.log('ok')
        res.send(joindata)
    })
})

// 取消申请人
app.post('/api/cancel', (req, res) => {
    const whereStr = {_id:req.body._id}
    console.log(whereStr)
    const newState = {$set: { admin: 'false' }}
    const joindata = User.updateOne(whereStr,newState).then(rel => {
        console.log('ok')
        res.send(joindata)
    })
})

// 修改密码
app.post('/api/repair', (req, res) => {
    const whereStr = {_id:req.body._id}
    console.log(whereStr)
    const newState = {$set: { password: req.body.password }}
    const joindata = User.updateOne(whereStr,newState).then(rel => {
        console.log('ok')
        res.send(joindata)
    })
})
// 评论区
app.post('/api/area', async(req, res) => {
    const joindata = await area.create({
        commit: req.body.commit,
        name: req.body.name,
        username: req.body.username,

    })
    res.send(joindata)
})
app.get('/api/queryarea', async(req, res) => {
    const joindata = await area.find({})
    res.send(joindata)
})
// 人员
app.get('/api/findperple', async(req, res) => {
    const user = await User.find({
        // name:req.body.name
    })
    res.send(user)
})
   



