import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import TheNavigation from "./components/nav/TheNavigation.vue";

const app = createApp(App);

app.component("the-navigation", TheNavigation);

app.use(router);

app.mount("#app");
