import Vue from "vue";
import store from "@/store"
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Products from "@/views/Products.vue";
import ViewProduct from "@/views/ViewProduct.vue";
import Login from "@/views/User/Login.vue";
import ResetPassword from "@/views/User/ResetPassword.vue";
import Register from "@/views/User/Register.vue";
import UserProfile from "@/views/User/Profile.vue";
import UserVerify from "@/views/User/UserVerify.vue";
// import AboutUs from "@/views/AboutUs.vue";
import CartView from "@/views/CartView.vue";
// import Wishlist from "@/views/Wishlist.vue";
import Checkout from "@/views/Checkout.vue";
import Order from "@/views/Order.vue";
import SuccessPayment from "@/views/Payment/SuccessPayment.vue";
import CancelPayment from "@/views/Payment/CancelPayment.vue";
// import Admin from "@/views/Admin.vue";
import ADashboard from "@/views/AdminChildren/ADashboard.vue";
import AUsers from "@/views/AdminChildren/AUsers.vue";
import AddProduct from "@/views/AdminChildren/AddProduct.vue";
import AOrder from "@/views/AdminChildren/AOrder.vue";
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
    path: "/products",
    name: "products",
    component: Products
  },
  {
    path: "/products/:category",
    name: "products",
    component: Products
  },
  {
    path: "/products/:category/:subCategory",
    name: "products",
    component: Products
  },
  {
    path: "/products/:category/:subCategory/:subSubCategory",
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
    path: "/reset-password",
    name: "reset-password",
    component: ResetPassword
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
    path: "/user-verify/:token",
    name: "user-verify",
    component: UserVerify
  },
  {
    path: "/profile",
    name: "profile",
    component: UserProfile
  },
  // {
  //   path: "/about",
  //   name: "about-page",
  //   component: AboutUs
  // },
  {
    path: "/cart-view",
    name: "cart-view",
    component: CartView
  },
  // {
  //   path: "/wishlist",
  //   name: "wishlist",
  //   component: Wishlist
  // },
  {
    path: "/success-payment",
    name: "success-payment",
    component: SuccessPayment
  },
  {
    path: "/cancel-payment",
    name: "/cancel-payment",
    component: CancelPayment
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout
  },
  {
    path: "/order/:sessionId",
    name: "order",
    component: Order
  },
  {
    path: "/add-product",
    name: "add-product",
    component: AddProduct,
    meta: { requiresAuth: true }
  },
  {
    path: "/admin",
    name: "admin",
    component: ADashboard,
    meta: { requiresAuth: true }
  },
  {
    path: "/admin/users",
    name: "admin-users",
    component: AUsers,
    meta: { requiresAuth: true }
  },
  {
    path: "/admin/order/:orderId",
    name: "admin-order",
    component: AOrder,
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
  const admin = store.state.CurrentUser.admin;
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
