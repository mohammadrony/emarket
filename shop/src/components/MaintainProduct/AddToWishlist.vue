<template>
  <div>
    <b-dropdown
      v-if="!validWishlistItem"
      :size="buttonType"
      variant="warning"
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
      v-if="validWishlistItem"
      :size="buttonType"
      variant="warning"
      @click="addWishlistItem"
    >
      Add To Wishlist
    </b-button>
  </div>
</template>

<script>
import WishlistService from '@/services/WishlistService.js';
export default {
  name: "AddToWishlist",
  props: {
    buttonType: String,
    productId: Number
  },
  data() {
    return {
      wishlistItem: {},
      validWishlistItem: false,
    };
  },
  components: {},
  computed: {},
  mounted() {
    this.wishlistItem = await this.$store.dispatch("Wishlist/getWishlistItem", this.productId)
    this.validWishlistItem = Object.keys(this.wishlistItem).length!=0
  },
  methods: {
    async addWishlistItem() {
      try {
        this.wishlistItem = (await WishlistService.createWishlistItem({
          productId: this.productId
        })).data
        this.validWishlistItem = true;
      } catch(error) {
        console.log(error.response.data.error)
      }
    },
    async removeWishlistItem(){
      try {
        await WishlistService.deleteWishlistItem(this.productId)
        this.wishlistItem = {}
        this.validWishlistItem = false
        await this.$store.dispatch("Wishlist/setWishlist")
      } catch(error) {
        console.log(error.response.data.error)
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
