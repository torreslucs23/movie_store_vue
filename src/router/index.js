import { createRouter, createWebHistory } from "vue-router";
import AuthPage from "../components/AuthPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/auth",
  },
  {
    name: "auth",
    path: "/auth",
    component: AuthPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
