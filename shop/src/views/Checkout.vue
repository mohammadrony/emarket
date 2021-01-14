<template>
  <div>
    <TopHeader />
    <b-container class="mt-4">
      <b-row>
        <b-col class="text-center">
          <h3>Before You Pay Us</h3>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col cols="7">
          <Address />
        </b-col>
        <b-col cols="5">
          <BuyItem />
        </b-col>
      </b-row>
    </b-container>

    <!-- Checkout Start -->
    <div class="checkout">
      <div class="container">
        <h2>Your Order</h2>

        <!-- Checkout Inner Start -->

        <!-- Checkout Inner End -->

        <!-- Order List Start-->
        <!-- <b-button size="lg" @click="checkoutApplied" variant="warning"
          >Submit Order</b-button
        > -->
        <!-- Order List End-->
      </div>
    </div>
    <!-- Checkout End -->
    <!-- <stripe-checkout
      ref="checkoutRef"
      :pk="publishableKey"
      :items="items"
      :successUrl="successUrl"
      :cancelUrl="cancelUrl"
    >
      <template slot="checkout-button">
        <button @click="checkout">Shut up and take my money!</button>
      </template>
    </stripe-checkout> -->
    <!-- Footer Start -->
    <div class="footer">
      <div class="container">
        <div class="col-3">
          <p>
            <big>Address UK:</big><br />Adipisci cum reprehenderit asperiores
            perferendis amet.
          </p>
          <p>
            <big>Address US:</big><br />Ipsum repellat pariatur totam voluptas
            asperiores
          </p>
          <p>
            <big>Address UAE:</big><br />Reprehenderit asperiores perferendis
            asperiores.
          </p>
        </div>
        <div class="col-3">
          <ul>
            <li><a href="#">Contact Anywhere</a></li>
            <li><a href="#">Easy payment Method</a></li>
            <li><a href="#">Fast Shipping</a></li>
            <li><a href="#">Our New Brand</a></li>
            <li><a href="#">Catalog</a></li>
          </ul>
        </div>
        <div class="col-3">
          <ul>
            <li><a href="#">About us</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">Corpoprative Clients</a></li>
            <li><a href="#">Our Partner</a></li>
            <li><a href="#">Terms of use</a></li>
            <li><a href="#">Advertise with us</a></li>
            <li><a href="#">Compare bank</a></li>
          </ul>
        </div>
        <div class="col-3">
          <ul>
            <li><a href="#">Warranty</a></li>
            <li><a href="#">Check in</a></li>
            <li><a href="#">How to place order</a></li>
            <li><a href="#">Exchange and return</a></li>
            <li><a href="#">Installation</a></li>
            <li><a href="#">Quality of services</a></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Footer End -->

    <div class="copyright">
      <div class="container">
        <h5>&copy; 2019 eshopstore.com | Creator by johnsom</h5>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import TopHeader from "@/components/TopHeader.vue";
import Address from "@/components/Checkout/Address.vue";
import BuyItem from "@/components/Checkout/BuyItem.vue";
export default {
  name: "Checkout",
  components: {
    TopHeader,
    Address,
    BuyItem,
  },
  data() {
    return {
      // loading: false,
      // publishableKey:
      //   "pk_test_51I4mbiGV3mLAYJeQ13BCPtt0b0DWMHAJALhdOaAVp2sA5P0WgjPcH21Ziw8fQpbBn8kZsNgT513t7htPCDlwnfzh00gkYylUV1",
      // items: [
      //   {
      //     sku: "sku_FdQKocNoVzznpJ",
      //     quantity: 1,
      //   },
      // ],
      // successUrl: "http://localhost:8080/",
      // cancelUrl: "http://localhost:8080/",
    };
  },
  computed: {

  },
  methods: {
    // checkout() {
    //   this.$refs.checkoutRef.redirectToCheckout();
    // },
  },
};
</script>

<style scoped lang="scss">
</style>
