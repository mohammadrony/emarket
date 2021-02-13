import ShopService from "@/services/ShopService.js";
export const ShopModule = {
    namespaced: true,
    strict: true,
    state: {
        shopId: 1,
        shopLogo: "",
    },
    mutations: {
        SET_SHOP_LOGO(state, shopLogo) {
            state.shopLogo = shopLogo
        }
    },
    actions: {
        async setShopLogo({ state, commit }) {
            const shop = (await ShopService.getShopLogo(state.shopId)).data
            commit("SET_SHOP_LOGO", shop.logo)
        },
        async getShopLogo({ state, dispatch }) {
            if (state.shopLogo == "") {
                await dispatch("setShopLogo")
            }
            return state.shopLogo
        }
    }
}