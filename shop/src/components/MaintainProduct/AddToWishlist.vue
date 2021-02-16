<template>
  <div>
    <b-dropdown
      :size="buttonType"
      variant="warning"
      @click="addToWishlist"
      class="mt-0"
    >
      <template #button-content>
        Added To Wishlist
      </template>
      <b-dropdown-item href="#">
        Remove from wishlist
      </b-dropdown-item>
    </b-dropdown>
    <!-- <b-button
      :size="buttonType"
      @click="addToWishlist"
      variant="outline-danger"
    >
      <b-icon-cart-plus-fill />
      Add To Wishlist
    </b-button> -->
  </div>
</template>

<script>
export default {
  name: "AddToWishlist",
  props: {
    buttonType: String,
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
      const userId = this.$store.state.CurrentUser.userId;
      const wishlistItem = {
        ProuctId: this.productId,
        UserId: userId
      };
      console.log(wishlistItem);
    }
    // async remove() {
    //   const cartItem = { productId: this.productId };
    //   const remove_response = await this.$store.dispatch(
    //     "Cart/removeFromCart",
    //     cartItem
    //   );
    //   if (remove_response) {
    //     this.addedToCart = false;
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped></style>
