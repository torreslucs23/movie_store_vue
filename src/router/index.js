import { createRouter, createWebHistory } from "vue-router";
import AuthPage from "../components/pages/AuthPage.vue";
import HomePage from "../components/pages/HomePage.vue";

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
  {
    name: "home",
    path: "/home",
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
