// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'//引入vue.js
import App from './App'//引入自定义组件
import router from './router'
import axios from 'axios'//引入axios
import ElementUI from 'element-ui'
import store from'./store/store.js'//引入store
import  VueResource  from 'vue-resource';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.config.$http=axios;//修改axios
Vue.use(ElementUI);
Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({//
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',

})
