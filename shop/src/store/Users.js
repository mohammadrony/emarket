import AuthenticationService from "@/services/AuthenticationService";

export const UsersModule = {
  namespaced: true,

  state: {
    displayUsers: null,
    userBackupList: null,
    userList: null,
    userCount: null,
    perPage: null,
    searchParameter: {
      text: null,
      userType: null,
    }
  },
  mutations: {
    SET_USER_BACKUP_LIST(state, userBackupList) {
      state.userBackupList = userBackupList;
    },
    SET_USER_LIST(state, userList) {
      state.userList = userList;
      state.perPage = 20
    },
    SET_DISPLAY_USERS(state, displayUsers) {
      state.disldisplayUsers = displayUsers;
    },
    SET_USER_COUNT(state, userCount) {
      state.userCount = userCount
    },
    SET_SEARCH_TEXT(state, text) {
      state.searchParameter.text = text;
    },
    SET_USER_TYPE(state, userType) {
      state.searchParameter.userType = userType;
    },
  },
  actions: {
    resetSearchParameter({ commit }) {
      commit("SET_SEARCH_TEXT", "");
      commit("SET_USER_TYPE", "");
    },
    setSearchText({ commit }, searchText) {
      commit("SET_SEARCH_TEXT", searchText);
    },
    setUserType({ commit }, userType) {
      commit("SET_USER_TYPE", userType);
    },
    async setUserBackupList({ commit }) {
      const users = (await AuthenticationService.getUserList()).data;
      commit("SET_USER_BACKUP_LIST", users)
    },
    async getUserBackupList({ dispatch, state }) {
      if (!state.userBackupList) {
        await dispatch("setUserBackupList")
      }
      return state.userBackupList;
    },
    async setUserList({ commit, state, dispatch }) {
      const userList = await dispatch("filterUsers");
      commit("SET_USER_LIST", userList);
      commit("SET_USER_COUNT", userList.length);
      const displayUsers = userList.slice(0, state.perPage);
      commit("SET_DISPLAY_USERS", displayUsers)
    },
    paginate({ commit, state }, currentPage) {
      const start = (currentPage - 1) * state.perPage;
      const displayUsers = state.userList.slice(start, start + state.perPage);
      commit("SET_DISPLAY_USERS", displayUsers);
    },
    async filterUsers({ state, dispatch }) {
      var userList = await dispatch("getUserBackupList");
      if (state.searchParameter.userType != null) {
        userList = userList.filter(obj => {
          return (
            obj.userType == state.searchParameter.userType);
        });
      }
      if (state.searchParameter.text != null) {
        userList = userList.filter(obj => {
          return (
            obj.fullName.toLowerCase().includes(state.searchParameter.text.toLowerCase()) ||
            obj.email.toLowerCase().includes(state.searchParameter.text.toLowerCase()) ||
            obj.phoneNo.toLowerCase().includes(state.searchParameter.text.toLowerCase())
          );
        });
      }
      return userList;
    },
  },


}