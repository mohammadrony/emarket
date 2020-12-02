import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate"
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

    //products
    allProducts: null,
    displayProducts: null
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

    //products
    SET_ALL_PRODUCTS(state, allProducts) {
      state.allProducts = allProducts
    },
    SET_DISPLAY_PRODUCTS(state, displayProducts) {
      state.displayProducts = displayProducts
    }
  },
  actions: {
    //User
    setToken({commit}, token) {
      commit('SET_TOKEN', token)
    },
    setUser({commit}, user) {
      commit('SET_USER', user)
    },

    //products
    setAllProducts({commit}, allProducts){
      commit('SET_ALL_PRODUCTS', allProducts)
    },
    setDisplayProducts({commit}, displayProducts){
      commit('SET_DISPLAY_PRODUCTS', displayProducts)
    }
  },
  modules: {}
});
