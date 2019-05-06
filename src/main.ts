import Vue from "vue";
import App from "./App.vue";
import DateFilter from "@/_shared/filters/filter-date";
import FormatServiceTypeFilter from "@/_shared/filters/filter-format-service-type";

Vue.config.productionTip = false;
Vue.filter("date", DateFilter);
Vue.filter("format-service-type", FormatServiceTypeFilter);

new Vue({
  render: h => h(App)
}).$mount("#app");
