import { createRouter, createWebHistory } from "vue-router";
import AuthPage from "../components/pages/AuthPage.vue";
import HomePage from "../components/pages/HomePage.vue";
import NotFound from "../components/pages/NotFound.vue";
import AddMovie from "../components/pages/AddMovie.vue";

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
    components: { default: HomePage, notFound: NotFound },
  },
  {
    name: "movie",
    path: "/movie",
    components: { default: AddMovie, notFound: NotFound },
  },
  { path: "/:notFound(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
