import Vue from "vue";
import Vuex from "vuex";
import { CartModule } from "./Cart.js";
import { ReviewModule } from "./Review.js";
import { CompanyModule } from "./Company.js";
import { CategoryModule } from "./Category.js";
import { ProductsModule } from "./Products.js";
import { CheckoutModule } from "./Checkout.js";
import { WishlistModule } from "./Wishlist.js";
import { CurrentUserModule } from "./CurrentUser.js";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  modules: {
    Cart: CartModule,
    Review: ReviewModule,
    Company: CompanyModule,
    Category: CategoryModule,
    Products: ProductsModule,
    Checkout: CheckoutModule,
    Wishlist: WishlistModule,
    CurrentUser: CurrentUserModule,
  },
});
