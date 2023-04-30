<template>
  <div>
    <TopHeader></TopHeader>
    <b-container class="mt-3">
      <b-row>
        <b-col class="text-center">
          <h2>Cart</h2>
          <hr />
        </b-col>
      </b-row>
      <b-row v-if="cartItemCount == 0">
        <b-col>
          empty cart!!!
          <hr />
        </b-col>
      </b-row>
      <div v-if="cartItemCount != 0">
        <b-row>
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
      </div>
      <div v-for="product in cartProducts" :key="product.productId">
        <b-row>
          <b-col cols="3" class="text-center">
            <b-img style="max-width: 66%" :src="product.image" alt="No Image" />
          </b-col>
          <b-col cols="3">
            <b-link :to="`/product/${product.productId}`">
              {{ product.title }}
            </b-link>
            <b-row class="mt-2" align-v="center">
              <b-col>
                <b-form-rating
                  :precision="
                    Math.round(product.rating) == product.rating ? 0 : 1
                  "
                  size="sm"
                  readonly
                  show-value
                  show-value-max
                  :value="product.rating"
                  variant="primary"
                />
              </b-col>
            </b-row>
            <AddToWishlist
              class="mt-2"
              addButtonTitle="Save"
              addedButtonTitle="Saved"
              buttonType="sm"
              :productId="product.productId"
            />
          </b-col>
          <b-col cols="2">
            {{ product.amount * product.quantity }}
            {{ product.currency }}</b-col
          >
          <b-col cols="4">
            <div>
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
                @click="removeCartItem(product)"
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
    <MyFooter class="mt-5" />
  </div>
</template>

<script>
import TopHeader from "@/components/Common/TopHeader.vue";
import AddToWishlist from "@/components/MaintainProduct/AddToWishlist.vue";
import MyFooter from "@/components/Common/MyFooter.vue";
import { mapState } from "vuex";
export default {
  name: "MyCart",
  components: {
    TopHeader,
    AddToWishlist,
    MyFooter,
  },
  data() {
    return {
      selectedCurrency: "USD",
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      cartProducts: (state) => state.Cart.cartProducts,
    }),
    cartItemCount() {
      return this.cartProducts.length;
    },
    totalAmount() {
      var i,
        amount = 0;
      for (i = 0; i < this.cartProducts.length; i++) {
        amount += this.cartProducts[i].amount * this.cartProducts[i].quantity;
      }
      return amount;
    },
  },
  methods: {
    async quantityInc(product) {
      await this.$store.dispatch("Cart/updateCartItemQuantity", {
        productId: product.productId,
        quantity: product.quantity + 1,
      });
    },
    async quantityDec(product) {
      if (product.quantity > 1) {
        await this.$store.dispatch("Cart/updateCartItemQuantity", {
          productId: product.productId,
          quantity: product.quantity - 1,
        });
      }
    },
    async removeCartItem(product) {
      const itemIndex = await this.$store.dispatch(
        "Cart/removeCartItem",
        product.productId
      );
      if (itemIndex == -1) {
        this.$bvToast.toast("Product removed from cart", {
          title: "Cart",
          variant: "success",
          toaster: "b-toaster-top-center",
          noCloseButton: false,
          solid: true,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
