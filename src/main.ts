import { createApp } from "vue";
// './style.css'
import "@/assets/css/index.css";

import directives from "@/directives";

import App from "./App.vue";

const app = createApp(App);

directives(app);

app.mount("#app");
