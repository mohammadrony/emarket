<template>
  <div class="cart-modal">
    <b-modal
      size="md"
      id="cart-products-modal"
      hide-footer
      hide-header-close
      centered
      title="Shopping Cart"
    >
      <b-row v-if="emptyCart">Your Cart is Empty!</b-row>
      <b-row v-if="!emptyCart">
        <b-col cols="3"></b-col>
        <b-col cols="3">
          <strong>Item</strong>
        </b-col>
        <b-col cols="2">
          <strong>Price</strong>
        </b-col>
        <b-col cols="4">
          <strong>Quantity</strong>
        </b-col>
      </b-row>
      <hr />
      <div v-for="product in cartProducts" :key="product.id">
        <b-row>
          <b-col cols="3">
            <img class="product-image" :src="product.Product.image" alt="No Image" />
          </b-col>
          <b-col cols="3">
            {{ product.Product.title }}
          </b-col>
          <b-col cols="2"> {{ product.Product.price * product.quantity }}৳ </b-col>
          <b-col cols="4">
            <div class="quantity-style">
              <b-button size="sm" variant="primary" @click="product.quantity++"
                >+
              </b-button>
              <a class="ml-4">{{ product.quantity }}</a>
              <b-button size="sm" class="ml-4" @click="product.quantity--"
                >-</b-button
              >
            </div>
          </b-col>
        </b-row>
        <hr />
      </div>
      <b-row v-if="!emptyCart">
        <b-col>
          <b-button block variant="info" to="products" @click="addMore"
            >Add More</b-button
          >
        </b-col>
        <b-col></b-col>
        <b-col>
          <b-button block variant="primary">Checkout</b-button>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddToCartService from "@/services/AddToCartService";
export default {
  name: "CartModal",
  data() {
    return {
      cartProducts: null,
      emptyCart: true,
    };
  },
  computed: {
    ...mapState(["User/user"])
  },
  async mounted() {
    if (this.user != null) {
      try {
        this.cartProducts = (await AddToCartService.getAllCartProduct()).data;
        this.emptyCart = !this.cartProducts
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    addMore() {
      this.$bvModal.hide("cart-products-modal");
    }
  }
};
</script>

<style scoped lang="scss">
.product-image {
  width: 66%;
  margin: 0, auto;
}
</style>
