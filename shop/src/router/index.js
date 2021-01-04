import Test from "@/components/ProductCategorySidebar.vue";
import Vue from "vue";
import store from "@/store"
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Products from "@/views/Products.vue";
import ViewProduct from "@/views/ViewProduct.vue";
import Login from "@/views/UserControl/Login.vue";
import ForgetPassword from "@/views/UserControl/ForgetPassword.vue";
import ResetPassword from "@/views/UserControl/ResetPassword.vue";
import Register from "@/views/UserControl/Register.vue";
import UserProfile from "@/views/UserControl/UserProfile.vue";
import AboutUs from "@/views/AboutUs.vue";
import CartView from "@/views/CartView.vue";
import Wishlist from "@/views/Wishlist.vue";
import Checkout from "@/views/Checkout.vue";
import Admin from "@/views/Admin.vue";
import AOverview from "@/views/AdminChildren/AOverview.vue";
import AProducts from "@/views/AdminChildren/AProducts.vue";
import AOrders from "@/views/AdminChildren/AOrders.vue";
import AProfile from "@/views/AdminChildren/AProfile.vue";
import Unauthorized from "@/views/ErrorPage/Unauthorized.vue";

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
    path: "/product/:productId",
    name: "product",
    component: ViewProduct
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
    path: "/reset-password/:token",
    name: "reset-password",
    component: ResetPassword
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/profile/:userId",
    name: "profile",
    component: UserProfile
  },
  {
    path: "/about",
    name: "about-page",
    component: AboutUs
  },
  {
    path: "/cart-view",
    name: "cart-view",
    component: CartView
  },
  {
    path: "/wishlist",
    name: "wishlist",
    component: Wishlist
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
  {
    path: "/error/401",
    name: "unauthorized",
    component: Unauthorized
  }
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
    next("/error/401");
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
