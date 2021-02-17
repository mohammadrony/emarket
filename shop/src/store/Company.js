import CompanyService from "@/services/CompanyService.js";
export const CompanyModule = {
    namespaced: true,
    strict: true,
    state: {
        companyId: 1,
        companyLogo: "",
        companyName: "",
    },
    mutations: {
        SET_COMPANY_LOGO(state, companyLogo) {
            state.companyLogo = companyLogo
        },
        SET_COMPANY_NAME(state, companyName) {
            state.companyName = companyName
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
        },
        async setCompanyName({ state, commit }) {
            const company = (await CompanyService.getCompanyName(state.companyId)).data
            commit("SET_COMPANY_NAME", company.name)
        },
        async getCompanyName({ state, dispatch }) {
            if (state.companyName == "") {
                await dispatch("setCompanyName")
            }
            return state.companyName
        }
    }
}