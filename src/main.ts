import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api';
import { createPinia, PiniaVuePlugin } from 'pinia';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.prototype.$video = videojs;
Vue.use(VueCompositionAPI);
Vue.use(PiniaVuePlugin);
const pinia = createPinia();

new Vue({
  router,
  store,
  render: h => h(App),
  pinia
}).$mount('#app')
