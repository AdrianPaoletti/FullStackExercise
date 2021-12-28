import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AlbumsList from "../views/AlbumsList.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "AlbumsList",
    component: AlbumsList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
