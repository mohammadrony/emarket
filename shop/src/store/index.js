import Vue from "vue";
import Vuex from "vuex";

import { CartModule } from "./Cart.js";
import { UsersModule } from "./Users.js"
import { CategoryModule } from "./Category.js";
import { ProductsModule } from "./Products.js";
import { CheckoutModule } from "./Checkout.js";
import { CurrentUserModule } from "./CurrentUser.js"

import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    shop: {
      name: "e-store",
    },
    token: null,
    user: null,
    userId: 0,
    admin: false,
    userLoggedIn: false,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      if (token) {
        state.userLoggedIn = true
      } else {
        state.userLoggedIn = false
      }
    },
    SET_USER(state, user) {
      state.user = user
      if (user != null) {
        state.userId = user.id
        if (user.priority == 1) {
          state.admin = true
        } else {
          state.admin = false
        }
      } else {
        state.admin = false
        state.userId = 0
      }
    },
  },
  actions: {

    setToken({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    setUser({ commit }, user) {
      commit('SET_USER', user)
    }
  },
  modules: {

    Cart: CartModule,
    Users: UsersModule,
    Category: CategoryModule,
    Products: ProductsModule,
    Checkout: CheckoutModule,
    CurrentUser: CurrentUserModule,
  }
});
