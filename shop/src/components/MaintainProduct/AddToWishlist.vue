<template>
  <div>
    <b-button :size="btnType" @click="addToWishlist" variant="outline-danger">
      <b-icon-cart-plus-fill />
      Add To Wishlist
    </b-button>
  </div>
</template>

<script>
export default {
  name: "AddToWishlist",
  props: {
    btnType: String,
    productId: Number
  },
  data() {
    return {};
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {
    async addToWishlist() {
      const wishlistItem = {
        ProuctId: this.productId,
        UserId: this.user.id
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
