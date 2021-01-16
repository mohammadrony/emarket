<template>
  <div>
    <b-row>
      <b-col
        cols="6"
        v-for="product in checkoutProduct"
        :key="product.productId"
      >
        <b-card-group deck>
          <b-card img-top style="max-width: 14rem" class="mb-4">
            <b-card-img
              :src="product.image"
              style="max-width: 14rem; max-height: 14rem"
              alt="Image Not Found"
            ></b-card-img
            ><br />
            <a href="" @click="viewProduct(product)">{{ product.title }}</a>
            <br />
            <small class="mt-2"
              >Amount: {{ product.amount }} {{ product.currency }}</small
            >
            <br />
            <small class="mt-2"
              >Quantity: {{ product.quantity }} {{ product.currency }}</small
            >
            <br />
            <small class="mt-2"
              >Cost: {{ product.amount * product.quantity }}
              {{ product.currency }}</small
            >
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col cols="2"></b-col>
      <b-col cols="10">
        <b-card v-if="subTotalAmount != 0">
          <b-row>
            <b-col cols="8">
              <h5>Sub-Total</h5>
            </b-col>
            <b-col cols="4">
              <b-card-text>{{ subTotalAmount }} $</b-card-text>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="8">
              <h5>Shipping Rate</h5>
            </b-col>
            <b-col cols="4">
              <b-card-text>{{ shippingRate }} $</b-card-text>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col cols="8">
              <h5>Total</h5>
            </b-col>
            <b-col cols="4">
              <b-card-text>{{ totalAmount }} $</b-card-text>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-if="subTotalAmount != 0">
      <b-col cols="5">
        <b-button block variant="warning" to="/cart-view">Edit Cart</b-button>
      </b-col>
      <b-col cols="2"></b-col>
      <b-col>
        <b-button @click="checkoutApplied" block variant="success">
          <b-icon icon="cursor-fill"></b-icon>
          Pay Now
        </b-button>
      </b-col>
    </b-row>
    <b-row v-if="subTotalAmount == 0">
      <b-col class="text-center">
        <h4>No Product to Buy!!!</h4>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
const stripeInit = loadStripe(
  "pk_test_51I4mbiGV3mLAYJeQ13BCPtt0b0DWMHAJALhdOaAVp2sA5P0WgjPcH21Ziw8fQpbBn8kZsNgT513t7htPCDlwnfzh00gkYylUV1"
);
import CheckoutService from "@/services/CheckoutService";

export default {
  name: "BuyItem",
  components: {},
  data() {
    return {
      subTotalAmount: 0,
      totalAmount: 0,
      shippingRate: 4,
      checkoutProduct: null,
    };
  },
  computed: {},
  mounted() {
    this.checkoutProduct = this.$store.state.Products.Cart.cartProducts;
    var i;
    for (i = 0; i < this.checkoutProduct.length; i++) {
      this.subTotalAmount +=
        this.checkoutProduct[i].amount * this.checkoutProduct[i].quantity;
    }
    this.totalAmount = this.subTotalAmount + this.shippingRate;
  },
  methods: {
    viewProduct(product) {
      this.$router.push({
        name: "product",
        params: {
          productId: product.id,
        },
      });
    },
    async checkoutApplied() {
      var i;
      var toCheckout = [];
      for (i = 0; i < this.checkoutProduct.length; i++) {
        var obj = {
          name: this.checkoutProduct[i].title,
          currency: "USD",
          amount: this.checkoutProduct[i].amount * 100,
          quantity: this.checkoutProduct[i].quantity,
        };
        toCheckout.push(obj);
      }
      toCheckout.push({
        name: "Shipping Cost",
        amount: this.shippingRate * 100,
        currency: "USD",
        quantity: 1,
      });
      try {
        const checkoutSession = (
          await CheckoutService.createCheckoutSession({
            checkoutProduct: toCheckout,
          })
        ).data;
        stripeInit.then((stripe) => {
          stripe
            .redirectToCheckout({
              sessionId: checkoutSession.id,
            })
            .then(function (result) {
              console.log(result);
            })
            .catch(function (error) {
              console.error(error);
            });
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="sass" scoped>
</style>