import { createApp } from "vue";
// './style.css'
import "@/assets/css/tailwind.css";
import "@/assets/fontawesome-pro/css/all.css";

import directives from "@/directives";

import App from "./App.vue";

const app = createApp(App);

directives(app);

app.mount("#app");
