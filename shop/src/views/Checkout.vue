<template>
  <div class="">
    <!-- Topbar Start -->

    <!-- Topbar End -->

    <TopHeader />
    <!-- Header Start -->
    <!-- <div class="header">
		<div class="container">
			<div class="logo">
				<img src="../../public/assets/images/logo.png">
			</div>
			<div class="searchbar">
				<form>
					<input type="search" class="searchField" placeholder="Search for products & brands">
				</form>
			</div>
			<div class="headerright">
				<ul>
					<li><a href="#"><i class="fas fa-heart"></i> Wishlist</a></li>
					<li><a href="#"><i class="fas fa-shopping-cart"></i> Cart</a></li>
					<li><a href="#" class="signBtn">Login & Register</a></li>
				</ul>
			</div>
		</div>
	</div> -->
    <!-- Header End -->

    <!-- Checkout Start -->
    <div class="checkout">
      <div class="container">
        <h2>Your Order</h2>

        <!-- Checkout Inner Start -->
        <div class="checkout-inner">
          <form>
            <div class="checkout-form-steps">
              <h4>Personal Detail</h4>
              <input
                type="text"
                value="myname"
                class="textfield"
                placeholder="Your Name"
                required=""
              />
              <input type="email" class="textfield" placeholder="Your Email" />
              <input
                type="text"
                class="textfield"
                placeholder="Your Phone No."
              />
            </div>
            <div class="checkout-form-steps">
              <h4>Shipping Address</h4>
              <select class="textfield">
                <option>Select Country</option>
                <option>USA</option>
                <option>UK</option>
                <option>UAE</option>
              </select>
              <select class="textfield">
                <option>Select State</option>
                <option>State 1</option>
                <option>State 2</option>
                <option>State 3</option>
              </select>
              <input type="text" class="textfield" placeholder="Full Address" />
            </div>
            <div class="checkout-form-steps">
              <h4>Shipping Options</h4>
              <label for="radio1">
                <input type="radio" name="shippingoptions" id="radio1" />
                Delivery by courier - during the day free shipping
              </label>
              <label for="radio2">
                <input type="radio" name="shippingoptions" id="radio2" />
                Urgent Delivery - delivery in 1 hour free shipping
              </label>
              <label for="radio3">
                <input type="radio" name="shippingoptions" id="radio3" />
                Pickup - you can pickup 9AM to 8PM
              </label>
            </div>
            <div class="checkout-form-steps">
              <h4>Billing Options</h4>
              <label for="radio4">
                <input type="radio" name="billingoptions" id="radio4" />
                In Cash
              </label>
              <label for="radio5">
                <input type="radio" name="billingoptions" id="radio5" />
                Visa
              </label>
              <label for="radio6">
                <input type="radio" name="billingoptions" id="radio6" />
                Mobile Banking
              </label>
              <label for="radio7">
                <input type="radio" name="billingoptions" id="radio7" />
                Wallet
              </label>
            </div>

            <b-button size="lg" @click="checkoutApplied" variant="warning"
              >Submit Order</b-button
            >
            <input
              type="submit"
              class="submitorder-button"
              value="Submit Order"
            />
          </form>
        </div>
        <!-- Checkout Inner End -->

        <!-- Order List Start-->
        <div class="orderlist">
          <img src="../../public/assets/images/2_tb.jpg" />
          <h3>Macbook Pro MQ032 14.5' Inter Core i7 5550U 8GB DDR3</h3>
          <p>Quantity : <span>1</span></p>
          <p>
            Price : <span><i class="fas fa-dollar-sign"></i> 1099</span>
          </p>
          <input
            type="text"
            class="textfield"
            placeholder="Promo Code : STORE8888"
          />
          <input
            type="submit"
            class="applycode-button"
            value="Apply Promo Code"
          />
          <p>
            Order Total : <span><i class="fas fa-dollar-sign"></i> 1099</span>
          </p>
        </div>
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
import { loadStripe } from "@stripe/stripe-js";
const stripeInit = loadStripe(
  "pk_test_51I4mbiGV3mLAYJeQ13BCPtt0b0DWMHAJALhdOaAVp2sA5P0WgjPcH21Ziw8fQpbBn8kZsNgT513t7htPCDlwnfzh00gkYylUV1"
);
// import { StripeCheckout } from "vue-stripe-checkout";
import { mapState } from "vuex";
// const stripe = window.Stripe("pk_test_51I4mbiGV3mLAYJeQ13BCPtt0b0DWMHAJALhdOaAVp2sA5P0WgjPcH21Ziw8fQpbBn8kZsNgT513t7htPCDlwnfzh00gkYylUV1")
import CheckoutService from "@/services/CheckoutService";
import TopHeader from "@/components/TopHeader.vue";
export default {
  name: "Checkout",
  components: {
    TopHeader,
    // StripeCheckout,
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
    ...mapState({
      user: (state) => state.user
    })
  },
  methods: {
    // checkout() {
    //   this.$refs.checkoutRef.redirectToCheckout();
    // },
    async checkoutApplied() {
      if (this.user != null) {
        try {
          const checkoutSession = (
            await CheckoutService.createCheckoutSession({
              name: "laptop",
              currency: "USD",
              amount: 1000,
              quantity: 1,
            })
          ).data;
          console.log(checkoutSession);
          console.log("checkout");
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
          // stripe.redirectToCheckout({sessionId: checkoutSession.id})
        } catch (err) {
          console.log(err);
        }
      } else {
        this.$bvToast.toast("You have to sign in to checkout.", {
          title: "Checkout failed",
          variant: "info",
          toaster: "b-toaster-top-center",
          noCloseButton: true,
          solid: true,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>
