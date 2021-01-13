<template>
  <div>
    <b-container class="mt-5">
      <b-row v-if="recommendation">
        <b-col>
          <h3>{{ recommendationTitle }}</h3>
          <hr />
          <b-row>
            <b-col cols="3" v-for="product in recommendation" :key="product.id">
              <b-card deck class="mt-4">
                <b-card-img class="mb-3" :src="product.image1"></b-card-img>
                <b-link @click="gotoProduct(product)"
                  ><h5>{{ product.title }}</h5></b-link
                >
                <h6>{{ product.price }} {{ product.currency }}</h6>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <!-- <b-container>
      <b-row id="top-sell" class="mt-5">
        <b-col>
          <h3>You May Also Like</h3>
          <hr />
          <b-row class="mt-3">
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
          </b-row>
          <h3 id="new-items" class="mt-5">New 2020 Fresh Stock</h3>
          <hr />
          <b-row class="mt-3">
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container> -->
  </div>
</template>

<script>
import ProductsService from "@/services/ProductsService.js";
export default {
  name: "Name",
  props: {
    subSubCategoryId: Number,
  },
  components: {},
  data() {
    return {
      limit: 8,
      recommendation: null,
      recommendationTitle: "You May Also Like",
    };
  },
  async mounted() {
    this.recommendation = (
      await ProductsService.getRecommendation({
        subSubCategoryId: this.subSubCategoryId,
        limit: this.limit,
      })
    ).data;
  },
  methods: {},
  computed: {},
};
</script>

<style lang="sass" scoped>
</style>