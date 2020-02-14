import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import fastclick from 'fastclick'
import vuelazyload from 'vue-lazyload'
Vue.use(toast);
Vue.use(vuelazyload,{
  loading:require('./assets/img/common/placeholder.png')   //占位图片
});
fastclick.attach(document.body);
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
