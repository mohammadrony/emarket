<template>
  <div class="cart-modal">
    <h1 class="mb-4">My Cart</h1>
    <b-row class="mt-5" v-if="emptyCart">No Item Added!!!</b-row>
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
          <img
            class="product-image"
            :src="product.Product.image"
            alt="No Image"
          />
        </b-col>
        <b-col cols="3">
          {{ product.Product.title }}
        </b-col>
        <b-col cols="2">
          {{ product.Product.price * product.quantity }}৳
        </b-col>
        <b-col cols="4">
          <div class="quantity-style">
            <b-button size="sm" variant="primary" @click="product.quantity++"
              >+
            </b-button>
            <a class="ml-4">{{ product.quantity }}</a>
            <b-button size="sm" class="ml-4" @click="product.quantity--"
              >-</b-button
            >
            <b-button size="sm" class="ml-5" @click="remove(product)" variant="danger">remove</b-button>
          </div>
        </b-col>
      </b-row>
      <hr />
    </div>
    <b-row v-if="!emptyCart">
      <b-col cols="1"></b-col>
      <b-col cols="2">
        <b-button block variant="info" to="/">Add More</b-button>
      </b-col>
      <b-col cols="6"></b-col>
      <b-col cols="2">
        <b-button to="/checkout" block variant="primary">Checkout</b-button>
      </b-col>
      <b-col cols="1"></b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddToCartService from "@/services/AddToCartService";
export default {
  name: "MyCart",
  data() {
    return {
      cartProducts: null,
      emptyCart: true,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  async mounted() {
    if (this.user != null) {
      try {
        this.cartProducts = (await AddToCartService.getAllCartProduct()).data;
        this.emptyCart = !this.cartProducts;
      } catch (err) {
        console.log(err);
      }
    }
  },
  methods: {
    async remove(product) {
      try {
        const cartProduct = (await AddToCartService.remove(product.ProductId))
          .data;
        this.addedToCart = !cartProduct;
        location.reload(true);
      } catch (err) {
        console.log(err);
      }
    }
  },
};
</script>

<style scoped lang="scss">
.product-image {
  width: 66%;
  margin: 0, auto;
}
</style>
