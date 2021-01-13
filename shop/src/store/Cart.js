export const CartModule = {
    namespaced: true,
    state: {
        cartProducts: [],
    },
    mutations: {
        ADD_CART_ITEM(state, newItem) {
            state.cartProducts.unshift(newItem);
        },
        UPDATE_CART_ITEM_QUANTITY(state, { index, quantity }) {
            state.cartProducts[index].quantity = quantity
        },
        DELETE_CART_ITEM(state, index) {
            state.cartProducts.splice(index, 1)
        }
    },
    actions: {
        checkCartItem({ state }, item) {
            const index = state.cartProducts.findIndex(cartItem => cartItem.productId === item.productId)
            return index;
        },
        async cartQuantity({ commit, dispatch }, cartItem) {
            const index = (await dispatch("checkCartItem", cartItem));
            if (index == -1) {
                console.log("Error updating quantity")
                return false;
            }
            else {
                const quantity = cartItem.quantity
                commit("UPDATE_CART_ITEM_QUANTITY", { index, quantity })
                return true;
            }
        },
        async cartQuantityRelative({ commit, state, dispatch }, cartItem) {
            const index = (await dispatch("checkCartItem", cartItem));
            if (index == -1) {
                console.log("Error updating quantity")
                return false;
            }
            else {
                const quantity = state.cartProducts[index].quantity + cartItem.quantity
                commit("UPDATE_CART_ITEM_QUANTITY", { index, quantity })
                return true;
            }
        },

        async addToCart({ commit, dispatch, state }, cartItem) {
            const index = (await dispatch("checkCartItem", cartItem));
            if (index == -1) {
                commit("ADD_CART_ITEM", cartItem);
                return true;
            }
            else {
                const quantity = state.cartProducts[index].quantity + cartItem.quantity
                commit("UPDATE_CART_ITEM_QUANTITY", { index, quantity })
                return false;
            }
        },
        async removeFromCart({ commit, dispatch }, cartItem) {
            const index = (await dispatch("checkCartItem", cartItem));
            if (index == -1) {
                return false;
            }
            else {
                console.log("remove item index", index)
                commit("DELETE_CART_ITEM", index)
                return true;
            }
        },
    },
    modules: {

    }
}