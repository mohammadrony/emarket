<template>
  <div>
    <b-dropdown
      v-b-tooltip.hover
      title="Added To Cart"
      
      
      v-if="validCartItem != -1"
      :size="buttonType"
      variant="info"
    >
      <template #button-content>
        <b-icon scale="1.2" icon="cart-check-fill" />
      </template>
      <b-dropdown-item @click="removeCartItem">
        Remove from Cart
      </b-dropdown-item>
    </b-dropdown>
    <b-button
      
      v-b-tooltip.hover
      title="Add To Cart"
      v-if="validCartItem == -1"
      :size="buttonType"
      variant="outline-info"
      @click="addToCart"
    >
      <b-icon scale="1.2" icon="cart-plus-fill" />
    </b-button>
  </div>
</template>

<script>
export default {
  name: "AddToCart",
  props: {
    buttonType: String,
    productId: Number,
    currency: String,
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
