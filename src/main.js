import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

import "primeicons/primeicons.css";

import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions"; // optional

import Paginator from "primevue/paginator";

import Button from "primevue/button";

import InputText from "primevue/inputtext";

import Textarea from "primevue/textarea";

import TheNavigation from "./components/nav/TheNavigation.vue";
import BaseDialog from "./components/UI/BaseDialog.vue";

import InputNumber from "primevue/inputnumber";

import "primevue/resources/themes/aura-light-green/theme.css";
import Skeleton from "primevue/skeleton";

import ProgressSpinner from "primevue/progressspinner";

import FloatLabel from "primevue/floatlabel";

const app = createApp(App);

app.component("the-navigation", TheNavigation);

app.component("base-dialog", BaseDialog);

app.component("button-prime", Button);

app.component("paginator-prime", Paginator);

app.component("data-view", DataView);

app.component("skeleton-prime", Skeleton);

app.component("data-view-layout", DataViewLayoutOptions);

app.component("float-label-prime", FloatLabel);

app.component("sppiner-prime", ProgressSpinner);

app.component("text-area-prime", Textarea);

app.component("input-number-prime", InputNumber);

app.component("toast-prime", Toast);

app.use(ToastService);

app.use(router);

app.use(PrimeVue);

app.component("InputText", InputText);

app.mount("#app");
