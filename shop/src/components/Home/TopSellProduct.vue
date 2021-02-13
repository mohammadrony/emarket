<template>
  <div>
    <b-container class="mt-5">
      <b-row v-if="topSellProduct">
        <b-col>
          <h3>{{ topSellViewTitle }}</h3>
          <hr />
          <b-row>
            <b-col cols="3" v-for="product in topSellProduct" :key="product.id">
              <b-card deck class="mt-4">
                <b-card-img class="mb-3" :src="product.image1"></b-card-img>
                <b-link @click="gotoProduct(product)"
                  ><h5>{{ product.title }}</h5></b-link
                >
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
import ProductsService from "@/services/ProductsService";
export default {
  name: "TopSellProduct",
  components: {},
  data() {
    return {
      topSellProduct: null,
      topSellLimit: 8,
      topSellViewTitle: "Top Selling Products",
    };
  },
  async mounted() {
    this.topSellProduct = (
      await ProductsService.topSellProduct(this.topSellLimit)
    ).data;
  },
  methods: {
    gotoProduct(product) {
      window.location.replace(`/product/${product.id}`);
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped></style>
