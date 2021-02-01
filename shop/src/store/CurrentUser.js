export const CurrentUserModule = {
    namespaced: true,
    strict: true,

    state: {
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
          }
      },
      actions: {
        setToken({commit}, token) {
            commit('SET_TOKEN', token)
          },
          setUser({commit}, user) {
            commit('SET_USER', user)
          }
      },


}