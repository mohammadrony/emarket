<template>
  <div class="wishlist">
    <TopHeader></TopHeader>

    <b-container class="mt-3">
      <b-row>
        <b-col class="text-center">
          <h2>Your Wishlist</h2>
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
          <b-card-group deck>
            <b-card no-body class="overflow-hidden mb-4">
              <b-row no-gutters>
                <b-col md="6">
                  <b-card-img
                    @click="viewProduct(wishItem.Product)"
                    :src="wishItem.Product.image1"
                    alt="Image"
                    class="rounded-0"
                  ></b-card-img>
                </b-col>
                <b-col md="6">
                  <div class="m-3">
                    <b-link @click="viewProduct(wishItem.Product)">
                      {{ wishItem.Product.title }}
                    </b-link>

                    <h6 class="mt-2">
                      {{ wishItem.Product.amount }}
                      {{ wishItem.Product.currency }}
                    </h6>
                    <AddToCart
                      class="mt-2"
                      buttonType="sm"
                      :id="wishItem.Product.id"
                      :currency="wishItem.Product.currency"
                      :image="wishItem.Product.image1"
                      :title="wishItem.Product.title"
                      :amount="wishItem.Product.amount"
                    />
                    <AddToWishlist
                      class="mt-2"
                      buttonType="sm"
                      :productId="wishItem.Product.id"
                    />
                  </div>
                </b-col>
              </b-row>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
    <Footer class="mt-5" />
  </div>
</template>

<script>
import WishlistService from "@/services/WishlistService.js";
import TopHeader from "@/components/Common/TopHeader.vue";
import AddToCart from "@/components/MaintainProduct/AddToCart.vue";
import AddToWishlist from "@/components/MaintainProduct/AddToWishlist.vue";
import Footer from "@/components/Common/Footer.vue";
export default {
  name: "Wishlist",
  components: {
    TopHeader,
    AddToCart,
    AddToWishlist,
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
  },
  methods: {
    viewProduct(product) {
      const newRoute = "/product/" + product.id;
      window.location.replace(newRoute);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
