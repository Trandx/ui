//import { NavigationType } from "@/components/atoms/sidebar"
import { App } from "vue";
import NSideBar from "@/components/atoms/sidebar/index.vue";

export default {
  install: (app: App) => {
    app.component("NSideBar", NSideBar);
    // app.provide("datas", options)
  },
};

export { NSideBar };
