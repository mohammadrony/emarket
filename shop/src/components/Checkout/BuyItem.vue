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
            />
            <br />
            <b-link :to="{ path: `/product/${product.productId}` }">
              {{ product.title }}
            </b-link>
            <br />
            <small class="mt-2">
              Price: {{ product.amount }} {{ product.currency }}
            </small>
            <br />
            <small class="mt-2">Quantity: {{ product.quantity }}</small>
            <br />
            <small class="mt-2">
              Cost: {{ product.amount * product.quantity }}
              {{ product.currency }}
            </small>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col cols="2" />
      <b-col cols="10">
        <b-card class="mt-5" v-if="subTotalAmount != 0">
          <b-row>
            <b-col cols="8">
              <h5>Sub-Total</h5>
            </b-col>
            <b-col cols="4">
              <b-card-text>
                {{ subTotalAmount }} {{ selectedCurrency }}
              </b-card-text>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="8">
              <h5>Shipping Rate</h5>
            </b-col>
            <b-col cols="4">
              <b-card-text>
                {{ shippingRate }} {{ selectedCurrency }}
              </b-card-text>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col cols="8">
              <h5>Total</h5>
            </b-col>
            <b-col cols="4">
              <b-card-text>
                {{ totalAmount }} {{ selectedCurrency }}
              </b-card-text>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert
          variant="primary"
          class="mb-0 mt-5 p-1 pl-2"
          :show="!formValidate"
        >
          {{ message }}
        </b-alert>
      </b-col>
    </b-row>
    <b-row class="mt-4" v-if="subTotalAmount != 0">
      <b-col cols="5">
        <b-button block variant="warning" to="/cart-view">Edit Cart</b-button>
      </b-col>
      <b-col cols="2" />
      <b-col>
        <b-button
          v-if="!payBtnSpin"
          @click="checkoutApplied"
          block
          variant="success"
        >
          <b-icon icon="cursor-fill" />
          Pay Now
        </b-button>
        <b-button v-if="payBtnSpin" block variant="success">
          Processing...
          <b-spinner small variant="light"></b-spinner>
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
import CheckoutService from "@/services/CheckoutService.js";

export default {
  name: "BuyItem",
  components: {},
  data() {
    return {
      selectedCurrency: "USD",
      payBtnSpin: false,
      subTotalAmount: 0,
      formValidate: true,
      message: "form data is not valid",
      shippingRate: this.$store.state.Checkout.shippingRate,
      totalAmount: 0,
      checkoutProduct: null,
    };
  },
  computed: {},
  mounted() {
    this.checkoutProduct = this.$store.state.Cart.cartProducts;
    var i;
    for (i = 0; i < this.checkoutProduct.length; i++) {
      this.subTotalAmount +=
        this.checkoutProduct[i].amount * this.checkoutProduct[i].quantity;
    }
    this.totalAmount = this.subTotalAmount + this.shippingRate;
  },
  methods: {
    async checkoutApplied() {
      const response = await this.$store.dispatch(
        "Checkout/informationValidate"
      );
      if (!response) {
        this.formValidate = false;
        return;
      }
      this.payBtnSpin = true;
      const customerName = response.name;
      const customerEmail = response.email;
      const customerPhoneNo = response.phoneNo;
      const shippingAddress = response.shippingAddress;
      var i;
      var checkoutItems = [];
      for (i = 0; i < this.checkoutProduct.length; i++) {
        var obj = {
          price_data: {
            unit_amount: this.checkoutProduct[i].amount * 100,
            currency: "USD",
            product_data: {
              name: this.checkoutProduct[i].title,
            },
          },
          quantity: this.checkoutProduct[i].quantity,
        };
        checkoutItems.push(obj);
      }
      checkoutItems.push({
        price_data: {
          unit_amount: this.shippingRate * 100,
          currency: "USD",
          product_data: {
            name: "Shipping Cost",
          },
        },
        quantity: 1,
      });
      try {
        const checkoutSession = (
          await CheckoutService.createCheckoutSession({
            checkoutProduct: checkoutItems,
            customerName: customerName,
            customerEmail: customerEmail,
            customerPhoneNo: customerPhoneNo,
            shippingAddress: shippingAddress,
          })
        ).data;
        stripeInit.then((stripe) => {
          stripe
            .redirectToCheckout({
              sessionId: checkoutSession.id,
            })
            .catch(function (error) {
              console.error(error);
            });
        });
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
