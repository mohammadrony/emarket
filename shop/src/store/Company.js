import CompanyService from "@/services/CompanyService.js";
export const CompanyModule = {
  namespaced: true,
  strict: true,
  state: {
    companyId: 1,
    company: {},
  },
  mutations: {
    SET_COMPANY(state, company) {
      state.company = company;
    },
  },
  actions: {
    async setCompany({ state, commit }) {
      try {
        const company = (await CompanyService.getCompany(state.companyId)).data;
        commit("SET_COMPANY", company);
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    async getCompany({ state, dispatch }) {
      if (Object.keys(state.company).length == 0) {
        await dispatch("setCompany");
      }
      return state.company;
    },
    async getCompanyLogo({ state, dispatch }) {
      if (!state.company.logo) {
        await dispatch("setCompany");
      }
      return state.company.logo;
    },
    async getCompanyName({ state, dispatch }) {
      if (!state.company.name) {
        await dispatch("setCompany");
      }
      return state.company.name;
    },
  },
};
