<template>
  <div>
    <b-container class="mt-5">
      <b-row v-if="recommendation">
        <b-col>
          <h3>You May Also Like</h3>
          <hr />
          <b-row>
            <b-col cols="3" v-for="product in recommendation" :key="product.id">
              <b-card deck class="mt-4">
                <b-card-img class="mb-3" :src="product.image1"></b-card-img>
                <b-link @click="gotoProduct(product)">
                  <h5>{{ product.title }}</h5>
                </b-link>
                <h6>{{ product.amount }} {{ product.currency }}</h6>
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
export default {
  name: "Name",
  props: {
    subSubCatId: Number
  },
  components: {},
  data() {
    return {
      limit: 8,
      subSubCategoryId: this.subSubCatId,
      recommendation: [],
    };
  },
  async mounted() {
    try {
      this.recommendation = (
        await ProductsService.getRecommendation({
          subSubCategoryId: this.subSubCategoryId,
          limit: this.limit
        })
      ).data;
    } catch (error) {
      console.log(error.response.data.error);
    }
  },
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped></style>
