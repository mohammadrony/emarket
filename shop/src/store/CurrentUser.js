export const CurrentUserModule = {
    namespaced: true,
    strict: true,
    state: {
        token: "",
        user: {},
        admin: false,
        userId: 0,
        userLoggedIn: false,
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
            if (token!="") {
                state.userLoggedIn = true
            } else {
                state.userLoggedIn = false
            }
        },

        SET_USER(state, user) {
            state.user = user
            if (Object.keys(user).length!=0) {
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
        SET_NAME(state, { firstName, lastName }) {
            state.user.firstName = firstName
            state.user.lastName = lastName
        },
        SET_USERNAME(state, userName){
            state.user.username = userName
        }
    },
    actions: {
        setToken({ commit }, token) {
            commit("SET_TOKEN", token)
        },
        setUser({ commit }, user) {
            commit("SET_USER", user)
        },
        setName({ commit }, { firstName, lastName }) {
            commit("SET_NAME", { firstName, lastName })
        },
        setUserName({ commit }, userName) {
            commit("SET_USERNAME", userName)
        }
    }
}