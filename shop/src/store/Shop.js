export const ShopModule = {
    namespaced: true,
    strict: true,
    state: {
        shopName: "e-store",
    },
    mutations: {
        SET_SHOP_NAME(state, shopName) {
            state.shopName = shopName
        }
    },
    actions: {
        setShopName({ commit }, shopName) {
            commit('SET_SHOP_NAME', shopName)
        }
    }
}