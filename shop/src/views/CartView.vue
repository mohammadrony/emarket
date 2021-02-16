<template>
  <div class="cart">
    <TopHeader></TopHeader>
    <b-container class="mt-3">
      <b-row>
        <b-col class="text-center">
          <h2>Cart</h2>
          <hr />
        </b-col>
      </b-row>
      <b-row class="ml-2" v-if="cartItemCount == 0">empty cart!!!</b-row>
      <b-row v-if="cartItemCount != 0">
        <b-col cols="3" />
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
            <img class="product-image" :src="product.image" alt="No Image" />
          </b-col>
          <b-col cols="3">
            <b-link @click="routeChangetoProduct(product)">
              {{ product.title }}
            </b-link>
          </b-col>
          <b-col cols="2">
            {{ product.amount * product.quantity }}
            {{ product.currency }}</b-col
          >
          <b-col cols="4">
            <div class="quantity-style">
              <b-button
                size="sm"
                variant="primary"
                @click="quantityInc(product)"
              >+
              </b-button>
              <a class="ml-4">{{ product.quantity }}</a>
              <b-button
                size="sm"
                variant="warning"
                class="ml-4"
                @click="quantityDec(product)"
              >-
              </b-button>
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
      <div v-if="cartItemCount != 0">
        <b-row class="mb-3">
          <b-col cols="10" />
          <b-col cols="2">
            <b-card>
              <b-card-title>Total</b-card-title>
              <b-card-text
                >{{ totalAmount }} {{ selectedCurrency }}</b-card-text
              >
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="2">
            <b-button block variant="info" to="/products">Add More</b-button>
          </b-col>
          <b-col cols="8" />
          <b-col cols="2">
            <b-button to="/checkout" block variant="primary">
              <b-icon icon="cursor-fill" />
              Checkout
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-container>
    <Footer class="mt-5" />
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import Footer from "@/components/Footer.vue";
import { mapState } from "vuex";
export default {
  name: "MyCart",
  components: {
    TopHeader,
    Footer
  },
  data() {
    return {
      selectedCurrency: "USD"
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      cartProducts: state => state.Cart.cartProducts
    }),
    cartItemCount: function() {
      return this.cartProducts.length;
    },
    totalAmount: function() {
      var i,
        amount = 0;
      for (i = 0; i < this.cartProducts.length; i++) {
        amount += this.cartProducts[i].amount * this.cartProducts[i].quantity;
      }
      return amount;
    }
  },
  methods: {
    routeChangetoProduct(product) {
      window.location.replace(`/product/${product.productId}`);
    },
    async quantityInc(product) {
      const cartItem = {
        productId: product.productId,
        quantity: 1
      };
      await this.$store.dispatch("Cart/cartQuantityRelative", cartItem);
    },
    async quantityDec(product) {
      if (product.quantity > 1) {
        const cartItem = {
          productId: product.productId,
          quantity: -1
        };
        await this.$store.dispatch("Cart/cartQuantityRelative", cartItem);
      }
    },
    async remove(product) {
      const cartItem = { productId: product.productId };
      await this.$store.dispatch("Cart/removeFromCart", cartItem);
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
