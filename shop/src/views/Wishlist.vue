<template>
  <div class="wishlist">
    <TopHeader></TopHeader>

    <b-container class="mt-5">
      <b-row>
        <b-col class="text-center">
          <h2>My Wishlist</h2>
          <hr />
        </b-col>
      </b-row>
      <b-row v-if="myWishlist.length == 0">
        <b-col>
          empty wishlist...
          <hr />
        </b-col>
      </b-row>
      <b-row v-if="myWishlist.length != 0">
        <b-col v-for="wishItem in myWishlist" :key="wishItem.id" cols="6">
          <b-card img-left style="max-height: 25rem">
            <b-card-img :src="wishItem.Product.image1" max-height />
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <Footer class="mt-5" />
  </div>
</template>

<script>
import WishlistService from "@/services/WishlistService.js";
import TopHeader from "@/components/TopHeader.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "Wishlist",
  components: {
    TopHeader,
    Footer
  },
  data() {
    return {
      myWishlist: [],
      userId: 0
    };
  },
  async mounted() {
    this.userId = this.$store.state.CurrentUser.userId;
    if (this.userId == 0) {
      this.$bvToast.toast("Please login for the wishlist", {
        title: "Wishlist",
        variant: "primary",
        toaster: "b-toaster-top-center",
        noCloseButton: false,
        solid: true
      });
      return;
    }
    try {
      this.myWishlist = (await WishlistService.getWishlist()).data;
    } catch (error) {
      console.log(error.response.data.error);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
