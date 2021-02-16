<template>
  <div>
    <b-button :size="buttonType" @click="addToCart" variant="outline-primary">
      <b-icon-cart-plus-fill />
      Add To Cart
    </b-button>
  </div>
</template>

<script>
export default {
  name: "AddToCart",
  props: {
    buttonType: String,
    id: Number,
    currency: String,
    image: String,
    title: String,
    amount: Number
  },
  computed: {},
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    this.user = this.$store.state.CurrentUser.user;
  },
  methods: {
    async addToCart() {
      const cartItem = {
        productId: this.id,
        currency: this.currency,
        image: this.image,
        title: this.title,
        amount: this.amount,
        quantity: 1,
      };
      const response = await this.$store.dispatch("Cart/addToCart", cartItem);

      if (response) {
        this.addedToCart = true;
        this.$bvToast.toast("Product added to cart", {
          title: "Add to Cart",
          variant: "success",
          toaster: "b-toaster-top-center",
          noCloseButton: false,
          solid: true
        });
        return;
      } else {
        this.$bvToast.toast("Cart item increased", {
          title: "Already in Cart",
          variant: "primary",
          toaster: "b-toaster-top-center",
          noCloseButton: false,
          solid: true
        });
      }
    },
    async remove() {
      const cartItem = { productId: this.productId };
      const remove_response = await this.$store.dispatch(
        "Cart/removeFromCart",
        cartItem
      );
      if (remove_response) {
        this.addedToCart = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
