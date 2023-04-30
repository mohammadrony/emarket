<template>
  <div>
    <b-row v-if="recommendation">
      <b-col>
        <div v-if="recommendation.length != 0">
          <h3>Discover More Like This</h3>
          <hr />
        </div>
        <b-row>
          <b-col cols="3" v-for="product in recommendation" :key="product.id">
            <b-card deck class="mt-4">
              <b-card-img
                @click="$router.push({ path: `/product/${product.id}` })"
                class="mb-3"
                :src="product.image1"
              />
              <b-link @click="$router.push({ path: `/product/${product.id}` })">
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
  </div>
</template>

<script>
import ProductsService from "@/services/ProductsService.js";
import AddToCart from "@/components/MaintainProduct/AddToCart.vue";
import AddToWishlist from "@/components/MaintainProduct/AddToWishlist.vue";
export default {
  name: "Recommendation",
  props: {
    subSubCategoryId: Number,
  },
  components: {
    AddToCart,
    AddToWishlist,
  },
  data() {
    return {
      limit: 8,
      recommendation: [],
    };
  },
  async mounted() {
    try {
      this.recommendation = (
        await ProductsService.getRecommendation({
          subSubCategoryId: this.subSubCategoryId,
          limit: this.limit,
        })
      ).data;
    } catch (error) {
      console.log(error.response.data.error);
    }
  },
  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped></style>
