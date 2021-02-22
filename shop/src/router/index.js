import Vue from "vue";
import store from "@/store"
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import AllProducts from "@/views/Product/AllProducts.vue";
import CategoryProducts from "@/views/Product/CategoryProducts.vue";
import SubCategoryProducts from "@/views/Product/SubCategoryProducts.vue";
import SubSubCategoryProducts from "@/views/Product/SubSubCategoryProducts.vue";
import ViewProduct from "@/views/Product/ViewProduct.vue";
import CartView from "@/views/UsersProduct/CartView.vue";
import Wishlist from "@/views/UsersProduct/Wishlist.vue";
import Checkout from "@/views/BuyProduct/Checkout.vue";
import Order from "@/views/BuyProduct/ViewOrder.vue";
import SuccessPayment from "@/views/PayMoney/SuccessPayment.vue";
import CancelPayment from "@/views/PayMoney/CancelPayment.vue";
import AboutUs from "@/views/AboutUs.vue";
import Register from "@/views/User/Register.vue";
import Login from "@/views/User/Login.vue";
import UserProfile from "@/views/User/Profile.vue";
import UserVerify from "@/views/User/UserVerify.vue";
import ResetPassword from "@/views/User/ResetPassword.vue";
import ADashboard from "@/views/Admin/ADashboard.vue";
import AUsers from "@/views/Admin/AUsers.vue";
import AOrders from "@/views/Admin/AOrders.vue";
import AOrder from "@/views/Admin/AOrder.vue";
import AProfile from "@/views/Admin/AProfile.vue";
import AddProduct from "@/views/Admin/AddProduct.vue";
import Unauthorized from "@/views/ErrorPage/Unauthorized.vue";
import NotFound from "@/views/ErrorPage/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/products",
    name: "all-products",
    component: AllProducts
  },
  {
    path: "/products/:category",
    name: "category-products",
    component: CategoryProducts
  },
  {
    path: "/products/:category/:subCategory",
    name: "sub-category-products",
    component: SubCategoryProducts
  },
  {
    path: "/products/:category/:subCategory/:subSubCategory",
    name: "sub-sub-category-products",
    component: SubSubCategoryProducts
  },
  {
    path: "/product/:productId",
    name: "product",
    component: ViewProduct
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
    path: "/order/:sessionId",
    name: "order",
    component: Order
  },
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
    path: "/about-us",
    name: "about-us",
    component: AboutUs
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/profile",
    name: "profile",
    component: UserProfile
  },
  {
    path: "/user-verify",
    name: "user-verify",
    component: UserVerify
  },
  {
    path: "/reset-password/:token",
    name: "reset-password",
    component: ResetPassword
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
    path: "/admin/orders",
    name: "admin-orders",
    component: AOrders,
    meta: { requiresAuth: true }
  },
  {
    path: "/admin/order/:orderId",
    name: "admin-order",
    component: AOrder,
    meta: { requiresAuth: true }
  },
  {
    path: "/admin/profile",
    name: "admin-profile",
    component: AProfile,
    meta: { requiresAuth: true }
  },
  {
    path: "/admin/add-product",
    name: "admin-add-product",
    component: AddProduct,
    meta: { requiresAuth: true }
  },
  {
    path: "/error/401",
    name: "unauthorized",
    component: Unauthorized
  },
  {
    path: "/*",
    name: "not-found",
    component: NotFound
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
})

export default router;
