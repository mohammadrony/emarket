<template>
  <div>
    <b-row>
      <b-col cols="4" v-for="product in displayProducts" :key="product.id">
        <b-card-group deck>
          <b-card img-top style="max-width: 25rem" class="mb-4">
            <b-card-img
              @click="$router.push({ path: `/product/${product.id}` })"
              :src="product.image1"
              style="max-width: 25rem; max-height: 25rem"
              alt="Image Not Found"
            />
            <div class="mt-2">
              <b-link :to="`/product/${product.id}`">
                {{ product.title }}
              </b-link>
            </div>
            <h6 class="mt-1">
              Price: {{ product.amount }} {{ product.currency }}
            </h6>
            <b-row class="mt-2" align-v="center">
              <b-col cols="12">
                <b-form-rating
                  :precision="
                    Math.round(product.rating) == product.rating ? 0 : 1
                  "
                  size="sm"
                  show-value
                  show-value-max
                  readonly
                  :value="product.rating"
                  variant="primary"
                />
              </b-col>
            </b-row>
            <div class="d-flex justify-content-between">
              <AddToCart
                class="mt-2"
                addButtonTitle="Add To Cart"
                addedButtonTitle="In Cart"
                :key="cartComponentKey"
                buttonType="sm"
                :productId="product.id"
                :rating="product.rating"
                :currency="product.currency"
                :image="product.image1"
                :title="product.title"
                :amount="product.amount"
              />
              <AddToWishlist
                class="mt-2"
                addButtonTitle="Save"
                addedButtonTitle="Saved"
                :key="wishlistKey"
                buttonType="sm"
                :productId="product.id"
              />
            </div>
            <b-button
              v-if="admin"
              class="mt-2"
              @click="deleteProduct(product)"
              size="sm"
              variant="danger"
            >
              <b-icon icon="trash" />
              Delete
            </b-button>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
    <b-row class="mt-3 mb-5" v-if="this.apCount == 0">
      <b-col>
        <h2>...</h2>
      </b-col>
    </b-row>
    <b-row v-if="this.apCount != 0" class="mt-3" align-v="center">
      <b-col>
        <b-pagination
          size=""
          v-model="currentPage"
          :total-rows="apCount"
          :per-page="perPage"
          @input="paginate(currentPage)"
        ></b-pagination>
      </b-col>
      <b-col />
      <b-col>
        <h6>
          SHOWING {{ (currentPage - 1) * perPage + 1 }} TO
          {{
            currentPage * perPage > apCount ? apCount : currentPage * perPage
          }}
          OF {{ apCount }} ({{ Math.ceil(apCount / perPage) }}
          PAGES)
        </h6>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import AddToCart from "@/components/MaintainProduct/AddToCart.vue";
import AddToWishlist from "@/components/MaintainProduct/AddToWishlist.vue";
import ProductsService from "@/services/ProductsService.js";
import WishlistService from "@/services/WishlistService.js";
import { mapState } from "vuex";
export default {
  name: "ProductList",
  props: {},
  components: {
    AddToWishlist,
    AddToCart,
  },
  data() {
    return {
      admin: false,
      wishlistKey: 4,
      currentPage: 1,
      cartComponentKey: 2,
    };
  },
  computed: {
    ...mapState({
      displayProducts: (state) => state.Products.displayProducts,
      apCount: (state) => state.Products.apCount,
      perPage: (state) => state.Products.perPage,
    }),
  },
  mounted() {
    this.admin = this.$store.state.CurrentUser.admin;
  },
  methods: {
    refreshCartBtn() {
      this.cartComponentKey += 1;
      this.wishlistKey += 1;
    },
    async deleteProduct(product) {
      await WishlistService.deleteWishItemByProduct(product.id);
      await ProductsService.deleteProduct(product.id);
      await this.$store.dispatch("Products/setAllBackupProducts");
      await this.$store.dispatch("Wishlist/setWishlist");
      window.location.reload();
    },
    async paginate(currentPage) {
      await this.$store.dispatch("Products/paginate", currentPage);
      this.refreshCartBtn();
    },
  },
};
</script>

<style lang="scss" scoped></style>
