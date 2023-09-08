import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // order
    {
      // 초기 화면(메인 화면)
      path: "/",
      name: "home",
      component: () => import("../views/order/MainView.vue"),
    },
    {
      // 주문 전체 조회
      path: "/orders",
      name: "orders",
      component: () => import("../views/order/ListView.vue"),
    },
    {
      // 주문 등록
      path: "/orders/register",
      name: "order-register",
      component: () => import("../views/order/RegisterView.vue"),
    },
    {
      // 주문 수정
      path: "/orders/register/:id",
      name: "order-update",
      component: () => import("../views/order/RegisterView.vue"),
    },
    {
      // 주문 상세 조회
      path: "/orders/:id",
      name: "order-detail",
      component: () => import("../views/order/DetailView.vue"),
    },
    // admin
    {
      // 초기 화면(메인 화면)
      path: "/admin/home",
      name: "menus-home",
      component: () => import("../views/admin-menu/MainView.vue"),
    },
    {
      // 메뉴 전체 조회
      path: "/admin/menus",
      name: "menus",
      component: () => import("../views/admin-menu/ListView.vue"),
    },
    {
      // 메뉴 등록
      path: "/admin/menus/register",
      name: "menus-register",
      component: () => import("../views/admin-menu/RegisterView.vue"),
    },
    {
      // 메뉴 수정
      path: "/admin/menus/register/:id",
      name: "menus-update",
      component: () => import("../views/admin-menu/RegisterView.vue"),
    },
    {
      // 메뉴 상세 조회
      path: "/admin/menus/:id",
      name: "menus-detail",
      component: () => import("../views/admin-menu/DetailView.vue"),
    },
  ],
});

export default router;
