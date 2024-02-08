import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";

import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions"; // optional

import Paginator from "primevue/paginator";

import Button from "primevue/button";

import InputText from "primevue/inputtext";

import TheNavigation from "./components/nav/TheNavigation.vue";
import BaseDialog from "./components/UI/BaseDialog.vue";

import "primevue/resources/themes/aura-light-green/theme.css";
import Skeleton from "primevue/skeleton";

const app = createApp(App);

app.component("the-navigation", TheNavigation);

app.component("base-dialog", BaseDialog);

app.component("button-prime", Button);

app.component("paginator-prime", Paginator);

app.component("data-view", DataView);

app.component("skeleton-prime", Skeleton);

app.component("data-view-layout", DataViewLayoutOptions);

app.use(router);

app.use(PrimeVue);

app.component("InputText", InputText);

app.mount("#app");
