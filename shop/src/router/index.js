import Test from "@/components/ProductCategorySidebar.vue";
import Vue from "vue";
import store from "@/store"
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Products from "@/views/Products.vue";
import Login from "@/views/UserControl/Login.vue";
import ForgetPassword from "@/views/UserControl/ForgetPassword.vue";
import Register from "@/views/UserControl/Register.vue";
import UserProfile from "@/views/UserControl/UserProfile.vue";
import AboutUs from "@/views/AboutUs.vue";
import MyCart from "@/views/MyCart.vue";
import Checkout from "@/views/Checkout.vue";
import Admin from "@/views/Admin.vue";
import AOverview from "@/views/AdminChildren/AOverview.vue";
import AProducts from "@/views/AdminChildren/AProducts.vue";
import AOrders from "@/views/AdminChildren/AOrders.vue";
import AProfile from "@/views/AdminChildren/AProfile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/test",
    name: "test",
    component: Test
  },
  {
    path: "/products",
    name: "products",
    component: Products
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/forget-password",
    name: "forget-password",
    component: ForgetPassword
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/user-profile",
    name: "user-profile",
    component: UserProfile
  },
  {
    path: "/about",
    name: "about-page",
    component: AboutUs
  },
  {
    path: "/my-cart",
    name: "my-cart",
    component: MyCart
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/overview",
    name: "admin-overview",
    component: AOverview,
    meta: { requiresAuth: true }
  },
  {
    path: "/admin/products",
    name: "admin-products",
    component: AProducts,
    meta: { requiresAuth: true }
  },
  {
    path: "/admin/orders",
    name: "admin-orders",
    component: AOrders,
    meta: { requiresAuth: true }
  },
  {
    path: "/admin/profile",
    name: "admin-profile",
    component: AProfile,
    meta: { requiresAuth: true }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const admin = store.state.admin;
  if (requiresAuth && !admin) {
    next("/");
  }
  else if (requiresAuth && admin) {
    next();
  }
  else {
    next();
  }


  // if (to.matched.some(record => record.meta.requiresAuth)) {

  //   if (!auth.loggedIn()) {
  //     next({
  //       path: '/login',
  //       query: { redirect: to.fullPath }
  //     })
  //   } else {
  //     next()
  //   }
  // } else {
  //   next() 
  // }
})

export default router;
