import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import commonUI from './common'

//使用自定义插件
Vue.use(commonUI);
//利用发送ajax
// import axios from 'axios'
// axios.get('/128.180/movie/363e3a7e614d29b2847ff4e62afcd3f42168651.jpg').then(result=>{
//   console.log(result)
// })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
