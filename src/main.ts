import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(ElementUI);
Vue.prototype.$video = videojs;
Vue.config.productionTip = false;

Vue.use(PiniaVuePlugin);
const pinia = createPinia();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  pinia,
  render: h => h(App)
}).$mount('#app')
