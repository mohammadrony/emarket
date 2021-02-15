import Api from "./Api"

export default {
    getCompanyLogo(companyId) {
        return Api().get(`/company/getCompanyLogo/${companyId}`)
    }
}
