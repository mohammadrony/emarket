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
      name: "TopShop"
    },
    cartProducts: null,
    token: null,
    user: null,
    admin: false,
    userLoggedIn: false,
  },
  mutations: {
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
    SET_CART_PRODUCTS(state, cartProducts) {
      state.cartProducts = cartProducts
    }
  },
  actions: {
    setToken({commit}, token) {
      commit('SET_TOKEN', token)
    },
    setUser({commit}, user) {
      commit('SET_USER', user)
    },
    setCartProducts({commit}, cartProducts) {
      commit('SET_CART_PRODUCTS', cartProducts)
    }
  },
  modules: {}
});
