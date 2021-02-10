export const CurrentUserModule = {
    namespaced: true,
    strict: true,
    state: {
        token: null,
        user: null,
        admin: false,
        userId: 0,
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
    }
}