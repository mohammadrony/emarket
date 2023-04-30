import Api from "./Api";

export default {
  getCompany(companyId) {
    return Api().get(`/api/company/getCompany/${companyId}`);
  },
};
