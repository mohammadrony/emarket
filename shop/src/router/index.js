import Vue from "vue";
import store from "../store"
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Products from "../views/Products.vue";
import UserProfile from "../views/UserProfile.vue";
import AboutUs from "../views/AboutUs.vue";
import Admin from "../views/Admin.vue";
import AOverview from "../views/AdminChildren/AOverview.vue";
import AProducts from "../views/AdminChildren/AProducts.vue";
import AOrders from "../views/AdminChildren/AOrders.vue";
import AProfile from "../views/AdminChildren/AProfile.vue";

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
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: { requiresAuth: true },
    children: [
      {
        path: "overview",
        name: "admin-overview",
        component: AOverview
      },
      {
        path: "products",
        name: "admin-products",
        component: AProducts
      },
      {
        path: "orders",
        name: "admin-orders",
        component: AOrders
      },
      {
        path: "profile",
        name: "admin-profile",
        component: AProfile
      },
    ]
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
  if(requiresAuth && !admin){
    next("/");
  }
  else if( requiresAuth && admin){
    next();
  }
  else{
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
