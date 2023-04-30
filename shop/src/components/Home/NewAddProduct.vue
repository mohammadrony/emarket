<template>
  <div>
    <b-row v-if="newAddProduct.length != 0">
      <b-col>
        <h3>{{ newAddViewTitle }}</h3>
        <hr />
        <b-row>
          <b-col cols="3" v-for="product in newAddProduct" :key="product.id">
            <b-card deck class="mt-4">
              <b-card-img
                @click="$router.push({ path: `/product/${product.id}` })"
                :src="product.image1"
              />
              <b-link
                class="mt-3"
                @click="$router.push({ path: `/product/${product.id}` })"
              >
                <h5>{{ product.title }}</h5>
              </b-link>
              <h6>Price: {{ product.amount }} {{ product.currency }}</h6>
              <b-row class="mt-2" align-v="center">
                <b-col>
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
                  buttonType="sm"
                  :key="cartComponentKey"
                  :productId="product.id"
                  :rating="product.rating"
                  :currency="product.currency"
                  :image="product.image1"
                  :title="product.title"
                  :amount="product.amount"
                />
                <AddToWishlist
                  class="mt-2"
                  :key="wishlistKey"
                  addButtonTitle="Save"
                  addedButtonTitle="Saved"
                  buttonType="sm"
                  :productId="product.id"
                />
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ProductsService from "@/services/ProductsService.js";
import AddToCart from "@/components/MaintainProduct/AddToCart.vue";
import AddToWishlist from "@/components/MaintainProduct/AddToWishlist.vue";
export default {
  name: "NewAddProduct",
  components: {
    AddToCart,
    AddToWishlist,
  },
  data() {
    return {
      newAddProduct: [],
      cartComponentKey: 0,
      wishlistKey: 2,
      newAddLimit: 4,
      newAddViewTitle: "New Collection 2023",
    };
  },
  async mounted() {
    this.newAddProduct = (
      await ProductsService.newAddProduct(this.newAddLimit)
    ).data;
    this.forceRerender();
  },
  methods: {
    forceRerender() {
      this.cartComponentKey += 1;
      this.wishlistKey += 1;
    },
  },
};
</script>

<style lang="scss" scoped></style>
