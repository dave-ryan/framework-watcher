import Vue from "vue";
import App from "./App.vue";
import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? " https://api.github.com/" : "/";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
