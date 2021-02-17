import Api from "./Api"

export default {
    getCompanyLogo(companyId) {
        return Api().get(`/company/getCompanyLogo/${companyId}`)
    },
    getCompanyName(companyId) {
        return Api().get(`/company/getCompanyName/${companyId}`)
    }
}
