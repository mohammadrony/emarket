import Api from "./Api"

export default {
    getCompany(companyId) {
        return Api().get(`/company/getCompany/${companyId}`)
    }
}
