<template>
  <div>
    <b-dropdown
      v-if="validWishlistItem != -1"
      :size="buttonType"
      variant="primary"
      class="mt-0"
    >
      <template #button-content>
        Added To Wishlist
      </template>
      <b-dropdown-item @click="removeWishlistItem">
        Remove from wishlist
      </b-dropdown-item>
    </b-dropdown>
    <b-button
      v-if="validWishlistItem == -1"
      :size="buttonType"
      variant="outline-primary"
      @click="addWishlistItem"
    >
      Add To Wishlist
    </b-button>
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
    return {
      validWishlistItem: -1,
      userId: 0
    };
  },
  components: {},
  computed: {},
  async mounted() {
    this.userId = this.$store.state.CurrentUser.userId;
    if (this.userId != 0) {
      this.validWishlistItem = await this.$store.dispatch(
        "Wishlist/getWishlistItem",
        this.productId
      );
    }
  },
  methods: {
    async addWishlistItem() {
      if (this.userId == 0) {
        this.$bvToast.toast("Please login to save on wishlist", {
          title: "Wishlist",
          variant: "primary",
          toaster: "b-toaster-top-center",
          noCloseButton: false,
          solid: true
        });
        return;
      }
      this.validWishlistItem = await this.$store.dispatch(
        "Wishlist/addToWishlist",
        this.productId
      );
      if (this.validWishlistItem != -1) {
        this.$bvToast.toast("Product added to wishlist", {
          title: "Add To Wishlist",
          variant: "success",
          toaster: "b-toaster-top-center",
          noCloseButton: false,
          solid: true
        });
      }
    },
    async removeWishlistItem() {
      this.validWishlistItem = await this.$store.dispatch(
        "Wishlist/removeWishlistItem",
        this.productId
      );
      if (this.validWishlistItem == -1) {
        this.$bvToast.toast("Product removed from wishlist", {
          title: "Wishlist",
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
