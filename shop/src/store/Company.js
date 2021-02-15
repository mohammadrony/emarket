import CompanyService from "@/services/CompanyService.js";
export const CompanyModule = {
    namespaced: true,
    strict: true,
    state: {
        companyId: 1,
        companyLogo: "",
    },
    mutations: {
        SET_COMPANY_LOGO(state, companyLogo) {
            state.companyLogo = companyLogo
        }
    },
    actions: {
        async setCompanyLogo({ state, commit }) {
            const company = (await CompanyService.getCompanyLogo(state.companyId)).data
            commit("SET_COMPANY_LOGO", company.logo)
        },
        async getCompanyLogo({ state, dispatch }) {
            if (state.companyLogo == "") {
                await dispatch("setCompanyLogo")
            }
            return state.companyLogo
        }
    }
}