import Api from "./Api"

export default {
    getShopLogo(shopId) {
        return Api().get(`/shop/getShopLogo/${shopId}`)
    }
}
