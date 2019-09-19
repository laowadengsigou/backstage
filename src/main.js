import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import http from "./http";
import "./mock";
import VCharts from "v-charts";
import dayjs from "dayjs";
import VueClipboard from "vue-clipboard";
import LunarFullCalendar from "vue-lunar-full-calendar";
import Print from 'vue-print-nb'

Vue.use(LunarFullCalendar);
Vue.use(Print);
Vue.prototype.$axios = http;
Vue.prototype.$dayjs = dayjs;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VCharts);
Vue.use(VueClipboard);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
