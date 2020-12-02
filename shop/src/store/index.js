import Vue from "vue";
import Vuex from "vuex";
import {ProductModule} from "./Product.js";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    shop: {
      name: "UShop"
    },

    //User
    token: null,
    user: null,
    admin: false,
    userLoggedIn: false,
  },
  mutations: {
    //User
    SET_TOKEN(state, token) {
      state.token = token
      if(token) {
        state.userLoggedIn = true
      } else {
        state.userLoggedIn = false
      }
    },
    SET_USER(state, user) {
      state.user = user
      if(user != null){
        state.admin = user.isAdmin
      } else {
        state.admin = false
      }
    },
  },
  actions: {
    //User
    setToken({commit}, token) {
      commit('SET_TOKEN', token)
    },
    setUser({commit}, user) {
      commit('SET_USER', user)
    }
  },
  modules: {
    Product: ProductModule
  }
});
