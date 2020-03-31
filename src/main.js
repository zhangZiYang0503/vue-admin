import Vue from "vue";
import App from "./App.vue";
import VueCompositionApi from "@vue/composition-api";
import router from "./router";
import store from "./store";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./icons"; // icon

import components from "./components";

// register global components
Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});

Vue.use(VueCompositionApi);
Vue.use(Element);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
