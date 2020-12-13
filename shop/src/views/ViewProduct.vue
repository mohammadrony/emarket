<template>
  <div class="product-details">
    <div>
      <div>
        <carousel :perPage="1">
          <slide>
            <b-img
              :src="displayProduct.image"
              class="details-image"
              width="765"
            ></b-img>
          </slide>
        </carousel>
        <b-container>
          <b-row class="mt-2 d-flex justify-content-between" align-v="center">
            <h2>{{ displayProduct.title }}</h2>
            <h6>Price: {{ displayProduct.price }} taka</h6>
          </b-row>
          <b-row class="mt-2">
            <b-badge variant="dark">{{ displayProduct.tags }}</b-badge>
          </b-row>
        </b-container>
        <hr />
        <div class="mt-2">
          <h6>Description</h6>
          <hr />
          <p v-html="displayProduct.description"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ProductDetails",
  data() {
    return {
        
    }
  },
  mounted() {
    const productId = this.$store.state.route.params.productId
    this.$store.dispatch("Products/setDisplayProduct", productId);
  },
  computed: {
    ...mapState({
      displayProduct: state => state.Products.displayProduct
    }),
  },
};
</script>

<style scoped lang="scss">
</style>
