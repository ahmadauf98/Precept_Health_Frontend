import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";

Vue.config.productionTip = false;

require("dotenv").config();

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
