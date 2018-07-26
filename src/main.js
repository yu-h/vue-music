import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import axios from 'axios'
import VueLazyload from 'vue-lazyload' //图片懒加载

import 'common/stylus/index.styl'

// Vue.config.productionTip = false;
fastclick.attach(document.body);
Vue.use(VueLazyload, {
	loading: require('common/image/default.png')
})
Vue.prototype.axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
	store,
  router,
  components: { App },
  template: '<App/>'
})
