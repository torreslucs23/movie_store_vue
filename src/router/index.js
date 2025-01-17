import { createRouter, createWebHistory } from "vue-router";
import AuthPage from "../components/pages/AuthPage.vue";
import HomePage from "../components/pages/HomePage.vue";
import NotFound from "../components/pages/NotFound.vue";
import AddMovie from "../components/pages/AddMovie.vue";
import RegisterUser from "../components/pages/RegisterUser.vue";
import EditMovie from "../components/pages/EditMovie.vue";

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
    name: "addMovie",
    path: "/addMovie",
    components: { default: AddMovie, notFound: NotFound },
  },
  {
    name: "register",
    path: "/register",
    component: RegisterUser,
  },
  {
    name: "movie",
    path: "/movie/:id",
    components: { default: EditMovie, notFound: NotFound },
  },
  { path: "/:notFound(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (
    to.path === "/auth" ||
    from.path === "/auth" ||
    to.path === "/register" ||
    from.path === "/register"
  ) {
    next();
  }
  const token = localStorage.getItem("token");
  if (token) {
    next();
  } else {
    next("/auth");
  }
});

export default router;
