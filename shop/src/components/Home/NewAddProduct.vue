<template>
  <div>
    <b-container class="mt-5">
      <b-row v-if="newAddProduct">
        <b-col>
          <h3>{{ newAddViewTitle }}</h3>
          <hr />
          <b-row>
            <b-col cols="3" v-for="product in newAddProduct" :key="product.id">
              <b-card deck class="mt-4">
                <b-card-img class="mb-3" :src="product.image1" />
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
import ProductsService from "@/services/ProductsService";
export default {
  name: "NewAddProduct",
  components: {},
  data() {
    return {
      newAddProduct: null,
      newAddLimit: 4,
      newAddViewTitle: "New 2021 Fresh Stock"
    };
  },
  async mounted() {
    this.newAddProduct = (
      await ProductsService.newAddProduct(this.newAddLimit)
    ).data;
  },
  methods: {
    gotoProduct(product) {
      window.location.replace(`/product/${product.id}`);
    }
  }
};
</script>

<style lang="scss" scoped></style>
