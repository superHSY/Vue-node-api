<template>
  <div class="login-bc">
    <!-- logo -->
    <div class="body">
      <!-- 登陆表单框 -->
      <div class="login-body">
        <!-- login标题 -->
        <div class="login-body-title">
          登陆
          <a-icon
            type="exclamation-circle"
            style="color: rgba(0, 0, 0, 0.25); cursor: pointer"
            @click="info"
          />
        </div>
        <!-- 注册按钮 -->
        <div class="login-register" @click="showDrawer">
          <a-icon type="plus" style="font-size: 25px" />
        </div>
        <!-- 登陆 -->
        <a-form>
          <a-form-model style="margin-top: 15px">
            <a-form-model-item style="margin-bottom: 15px">
              <a-input placeholder="Username" allow-clear v-model="loginName">
                <a-icon
                  slot="prefix"
                  type="user"
                  style="color: rgba(0, 0, 0, 0.25)"
                />
              </a-input>
            </a-form-model-item>

            <a-form-model-item style="margin-bottom: 15px">
              <a-input-password placeholder="Password" v-model="loginPwd">
                <a-icon
                  slot="prefix"
                  type="lock"
                  style="color: rgba(0, 0, 0, 0.25)"
                />
              </a-input-password>
            </a-form-model-item>

            <a-form-model-item style="margin-bottom: 15px" prop="sidentify">
              <div class="Verification-code">
                <a-input
                  placeholder="Code"
                  style="width: 250px"
                  allow-clear
                  v-model="code"
                >
                  <a-icon
                    slot="prefix"
                    type="safety-certificate"
                    style="color: rgba(0, 0, 0, 0.25)"
                  />
                </a-input>

                <!-- 验证码 -->
                <div class="login-code" @click="refreshCode">
                  <v-sidentify :identifyCode="identifyCode"></v-sidentify>
                </div>
              </div>
            </a-form-model-item>

            <div class="login-body-input">
              <a-button type="primary" html-type="submit" @click="canLogin"
                >登陆</a-button
              >
              <a-button style="margin-left: 10px" @click="loadEmpty"
                >清除</a-button
              >
              <a class="NO_password" @click="tourists">游客登录</a>
            </div>
          </a-form-model>
        </a-form>
      </div>
    </div>
    <!-- 注册表单 -->
    <a-drawer
      title="注册"
      :placement="placement"
      :closable="false"
      :visible="visible"
      @close="onClose"
      :width="500"
    >
      <div class="login-register-back" @click="setBack">
        <a-icon type="arrow-right" />
      </div>
      <!-- 注册表单 -->
      <a-form :form="form">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="用户名">
              <a-input
                v-decorator="[
                  'name',
                  {
                    rules: [{ required: true, message: '请输入用户名' },
                    { min: 3, max: 12, message: '名字位3-12之间', trigger: 'blur' },],
                  },
                ]"
                placeholder="请输入你的用户名"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="邮箱地址">
              <a-input
                v-decorator="[
                  'url',
                  {
                    rules: [{ required: true, message: '请输入邮箱地址' }],
                  },
                ]"
                addon-after=".com"
                placeholder="请输入邮箱地址"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="地区选择">
              <a-select
                placeholder="请选择城市"
                v-decorator="[
                  'owner1',
                  {
                    rules: [{ required: true, message: '请选择城市' }],
                  },
                ]"
              >
                <a-select-option value="cheng"> 成都 </a-select-option>
                <a-select-option value="hang"> 杭州 </a-select-option>
                <a-select-option value="bei"> 北京 </a-select-option>
                <a-select-option value="ha"> 哈尔滨 </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="口味选择">
              <a-select
                placeholder="请选择一种口味"
                v-decorator="[
                  'owner2',
                  {
                    rules: [{ required: true, message: '请选择一种口味' }],
                  },
                ]"
              >
                <a-select-option value="ml"> 麻辣 </a-select-option>
                <a-select-option value="qd"> 清淡 </a-select-option>
                <a-select-option value="ts"> 泰式 </a-select-option>
                <a-select-option value="st"> 酸甜 </a-select-option>
                <a-select-option value="xt"> 咸甜 </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="用户密码">
              <a-input
                placeholder="请输入用户密码"
                type="password"
                v-decorator="[
                  'password',
                  {
                    rules: [{ required: true, message: '请输入用户密码' },
                    { min: 3, max: 10, message: '密码3-10之间', trigger: 'blur' },],
                  },
                ]"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="用户手机">
              <a-input
                placeholder="请输入用户手机号"
                v-decorator="[
                  'phone',
                  {
                    rules: [{ required: true, message: '手机号为空' },
                    { validator: validatorPhone}],
                  },
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>


      </a-form>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          取消
        </a-button>
        <a-button type="primary" @click="onSubmit"> 注册 </a-button>
      </div>

      <!-- 注册logo -->
      <div class="login-register-logo">
        <img src="../assets/logo-2.png" />
      </div>
    </a-drawer>
  </div>
</template>

<script>
import Sidentify from "../components/Verification/Verification.vue"; //**引入验证码组件**
import { login, register } from "../api/api";
export default {
  components: { "v-sidentify": Sidentify },
  
  data() {
    return {
      visible: false,
      placement: "left", //控制注册抽屉的方向
      identifyCodes: "1234567890abzdefghijklmnopqrstuvwxyz",
      identifyCode: "", //验证码
      code: "",
      form: this.$form.createForm(this),
      loginName: "",
      loginPwd: "",
    };
  },
  created() {
    // 验证码
    this.refreshCode();
  },
  mounted() {
    // 验证码
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    validatorPhone(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入手机号!'))
      } else {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error('手机号格式不正确!'))
        } else {
          callback()
        }
      }
    },
    info() {
      this.$message.info(
        "这是一个登录页面，需要输入用户名以及密码,如需要注册需要点击左上角加号   "
      );
    },
    // 弹出注册框
    showDrawer() {
      this.visible = true;
    },
    // 验证码
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode +=
          this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
    },
    // 登录
    async canLogin() {
      if (this.loginName === "") {
        this.$message.error("请输入用户名");
        return;
      } else if (this.loginPwd === "") {
        this.$message.error("请输入密码");
        return;
      } else if (this.code === "") {
        this.$message.error("请输入验证码");
        return;
      } else if (this.code !== this.identifyCode) {
        this.$message.error("验证码输入不正确");
        return;
      }
      const LoginRes = await login({
        username: this.loginName,
        password: this.loginPwd,
      });
      console.log(LoginRes);
      if (LoginRes.data.message === "用户不存在") {
        this.$message.error("用户不存在");
        return;
      }
      if (LoginRes.data.message === "密码无效") {
        this.$message.error("密码无效");
        return;
      }
      this.$message.success("登录成功");
      const objStr = JSON.stringify(LoginRes.data.user)
      sessionStorage.setItem("user", objStr)
      this.loadEmpty();
      this.$router.push("/home");
    },
    // 注册
    onSubmit() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const res = await register({
            username: values.name,
            password: values.password,
            phone: values.phone,
            flavor: values.owner2,
            admin: false
          });
          console.log(res);
          if (res.data.message === "用户存在, 请更换用户名") {
            this.$message.error("用户名重复,无法注册");
            return
          } 
          if (res.data.message === "手机号存在, 请更换用户名") {
          this.$message.error("手机号存在,无法注册");
          return
          } 
          this.$message.success("注册成功，请登录");
          this.form.resetFields();
          this.visible = false;
          return;
        }
      });
    },
    onClose() {
      this.form.resetFields(); //清空表单
      this.visible = false;
    },
    // 清空登录框
    loadEmpty() {
      this.loginName = "";
      this.loginPwd = "";
      this.code = "";
    },
    // 返回
    setBack() {
      this.form.resetFields();
      this.visible = false;
    },
    tourists() {
      // sessionStorage.setItem("user");
      sessionStorage.setItem("user", '1');
      this.$router.push("../home");
      if (sessionStorage.getItem("user")) {
        sessionStorage.removeItem("user")
      }
      
    },
  },
};
</script>

<style scoped>
.login-bc {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding-top: 4%; */
  height: 100%;
  width: 100%;
  background: url("../assets/login.png") no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
}

.login-body {
  position: relative;
  width: 400px;
  padding: 25px 15px 20px 15px;
  border: 6px solid #ffffff;
  box-sizing: border-box;
  background: transparent;
  border-radius: 10px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
}

.login-body-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  color: #ffffff;
  text-shadow: 5px 5px 5px black, 0px 0px 2px black;
  cursor: pointer;
  user-select: none;
}

.Verification-code {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

::v-deep .ant-input {
  background: transparent;
}

.login-register {
  position: absolute;
  left: -5%;
  top: -7%;
  background: #ffffff;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
}

.login-register:hover {
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
}

::v-deep .ant-drawer-title {
  color: #ffffff;
  font-size: 26px;
  text-shadow: 5px 5px 5px black, 0px 0px 2px black;
}

.login-register-back {
  position: absolute;
  top: 14px;
  right: 20px;
  font-size: 20px;
  cursor: pointer;
}

.login-register-logo {
  position: relative;
  margin-top: 20px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 验证码样式 */
.login-code {
  cursor: pointer;
}

.NO_password {
  font-size: 14px;
  color: black;
  margin-left: 164px;
}

.NO_password:hover {
  color: #1890ff;
}

.login-body-input {
  display: flex;
  align-items: center;
}

.body {
  margin: auto;
}
</style>