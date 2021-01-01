<template>
  <div class="cart">
    <TopHeader></TopHeader>
    <h1 class="m-3">My Cart</h1>
    <b-row class="m-5" v-if="cartItems == 0">No Item Added!!!</b-row>
    <b-row v-if="cartItems != 0">
      <b-col></b-col>
      <b-col cols="3"></b-col>
      <b-col cols="3">
        <strong>Item</strong>
      </b-col>
      <b-col cols="2">
        <strong>Price</strong>
      </b-col>
      <b-col cols="3">
        <strong>Quantity</strong>
      </b-col>
    </b-row>
    <hr />
    <div v-for="product in cartProducts" :key="product.id">
      <b-row>
        <b-col></b-col>
        <b-col cols="3">
          <img
            class="product-image"
            :src="product.Product.image1"
            alt="No Image"
          />
        </b-col>
        <b-col cols="3">
          {{ product.Product.title }}
        </b-col>
        <b-col cols="2">
          {{ product.Product.price * product.quantity }}৳
        </b-col>
        <b-col cols="3">
          <div class="quantity-style">
            <b-button size="sm" variant="primary" @click="product.quantity++"
              >+
            </b-button>
            <a class="ml-4">{{ product.quantity }}</a>
            <b-button size="sm" class="ml-4" @click="product.quantity--"
              >-</b-button
            >
            <b-button
              size="sm"
              class="ml-5"
              @click="remove(product)"
              variant="danger"
            >
              remove
            </b-button>
          </div>
        </b-col>
      </b-row>
      <hr />
    </div>
    <b-row v-if="cartItems != 0">
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
import TopHeader from "@/components/TopHeader.vue";
export default {
  name: "MyCart",
  components: {
    TopHeader,
  },
  data() {
    return {
      cartProducts: null,
      cartItems: null,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  async mounted() {
    if (this.user != null) {
      try {
        this.cartProducts = (await AddToCartService.getAllCartProduct()).data;
        this.cartItems = this.cartProducts.length;
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
    },
  },
};
</script>

<style scoped lang="scss">
.product-image {
  width: 66%;
  margin: 0, auto;
}
</style>
