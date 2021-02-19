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
                <b-card-img
                  @click="viewProduct(product)"
                  :src="product.image1"
                />
                <b-link class="mt-3" @click="viewProduct(product)">
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
import ProductsService from "@/services/ProductsService";
import AddToCart from "@/components/MaintainProduct/AddToCart.vue";
import AddToWishlist from "@/components/MaintainProduct/AddToWishlist.vue";
export default {
  name: "NewAddProduct",
  components: {
    AddToCart,
    AddToWishlist
  },
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
    viewProduct(product) {
      this.$router.push({ path: `/product/${product.id}` });
    }
  }
};
</script>

<style lang="scss" scoped></style>
