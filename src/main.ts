import Vue from "vue";
import App from "./App.vue";
import DateFilter from "@/filter-date";

Vue.config.productionTip = false;
Vue.filter("date", DateFilter);

new Vue({
  render: h => h(App)
}).$mount("#app");
