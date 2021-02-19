<template>
  <div>
    <b-container>
      <b-row v-if="topSellProduct">
        <b-col>
          <h3>{{ topSellViewTitle }}</h3>
          <hr />
          <b-row>
            <b-col cols="3" v-for="product in topSellProduct" :key="product.id">
              <b-card deck class="mt-4">
                <b-card-img
                  @click="gotoProduct(product)"
                  class="mb-3"
                  :src="product.image1"
                />
                <b-link @click="gotoProduct(product)">
                  <h5>{{ product.title }}</h5>
                </b-link>
                <h6>Price: {{ product.amount }} {{ product.currency }}</h6>
                <b-row class="mt-2" align-v="center">
                  <b-col cols="12">
                    <b-form-rating
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
                    buttonType="sm"
                    :productId="product.id"
                  />
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ProductsService from "@/services/ProductsService.js";
import AddToCart from "@/components/MaintainProduct/AddToCart.vue";
import AddToWishlist from "@/components/MaintainProduct/AddToWishlist.vue";
import router from "@/router";
export default {
  name: "TopSellProduct",
  components: {
    AddToCart,
    AddToWishlist
  },
  data() {
    return {
      topSellProduct: null,
      topSellLimit: 8,
      topSellViewTitle: "Top Selling Products"
    };
  },
  async mounted() {
    this.topSellProduct = (
      await ProductsService.topSellProduct(this.topSellLimit)
    ).data;
  },
  methods: {
    gotoProduct(product) {
      router.push({ path: `/product/${product.id}` });
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped></style>
