<template>
  <div>
    <b-dropdown
      id="cart-dd"
      v-if="validCartItem != -1"
      :size="buttonType"
      variant="info"
    >
      <template #button-content>
        <b-icon scale="1.2" icon="cart-check-fill" />
        {{ addedButtonTitle }}
      </template>
      <b-dropdown-item @click="removeCartItem">
        Remove from Cart
      </b-dropdown-item>
    </b-dropdown>
    <b-button
      v-if="validCartItem == -1"
      :size="buttonType"
      variant="outline-info"
      @click="addToCart"
    >
      <b-icon scale="1.2" icon="cart-plus-fill" />
      {{ addButtonTitle }}
    </b-button>
  </div>
</template>

<script>
export default {
  name: "AddToCart",
  props: {
    addButtonTitle: {
      default: "",
      type: String
    },
    addedButtonTitle: {
      default: "",
      type: String
    },
    buttonType: String,
    productId: Number,
    currency: String,
    rating: Number,
    image: String,
    title: String,
    amount: Number
  },
  computed: {},
  data() {
    return {
      validCartItem: -1
    };
  },
  async mounted() {
    this.validCartItem = await this.$store.dispatch(
      "Cart/getCartItem",
      this.productId
    );
  },
  methods: {
    async addToCart() {
      const cartItem = {
        productId: this.productId,
        currency: this.currency,
        image: this.image,
        rating: this.rating,
        title: this.title,
        amount: this.amount,
        quantity: 1
      };
      this.validCartItem = await this.$store.dispatch(
        "Cart/addToCart",
        cartItem
      );

      if (this.validCartItem != -1) {
        this.$bvToast.toast("Product added to cart", {
          title: "Add To Cart",
          variant: "success",
          toaster: "b-toaster-top-center",
          noCloseButton: false,
          solid: true
        });
      }
    },
    async removeCartItem() {
      this.validCartItem = await this.$store.dispatch(
        "Cart/removeCartItem",
        this.productId
      );
      if (this.validCartItem == -1) {
        this.$bvToast.toast("Product removed from cart", {
          title: "Cart",
          variant: "success",
          toaster: "b-toaster-top-center",
          noCloseButton: false,
          solid: true
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
