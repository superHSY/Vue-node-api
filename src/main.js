import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// 引入echarts
import * as echarts from 'echarts'
 
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

//把axios 作为Vue的原型属性
// window.axios = axiosInit();
// Vue.prototype.$axios = window.axios;

// axios.defaults.baseURL = 'http://localhost:8081/'

Vue.use(Antd);
// Vue.use(VueAxios, axios)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
