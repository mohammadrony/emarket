<template>
  <div>
    <TopHeader></TopHeader>
    <b-container class="mt-3">
      <b-row>
        <b-col class="text-center">
          <h2>
            Your Wishlist
            <b-icon scale="1" icon="suit-heart-fill" />
          </h2>
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
        <b-col cols="6" v-for="wishItem in myWishlist" :key="wishItem.id">
          <b-card-group deck>
            <b-card no-body class="mb-4">
              <b-row no-gutters>
                <b-col md="6">
                  <b-card-img
                    @click="
                      $router.push({ path: `/product/${wishItem.Product.id}` })
                    "
                    :src="wishItem.Product.image1"
                    alt="Image"
                  ></b-card-img>
                </b-col>
                <b-col md="6">
                  <div class="m-3">
                    <b-link :to="`/product/${wishItem.Product.id}`">
                      {{ wishItem.Product.title }}
                    </b-link>

                    <h6 class="mt-2">
                      Price: {{ wishItem.Product.amount }}
                      {{ wishItem.Product.currency }}
                    </h6>
                    <b-row class="mt-2" align-v="center">
                      <b-col>
                        <b-form-rating
                          :precision="
                            Math.round(wishItem.Product.rating) ==
                            wishItem.Product.rating
                              ? 0
                              : 1
                          "
                          size="sm"
                          readonly
                          show-value
                          show-value-max
                          :value="wishItem.Product.rating"
                          variant="primary"
                        />
                      </b-col>
                    </b-row>

                    <b-row class="mt-2">
                      <b-col>
                        <AddToCart
                          buttonType="sm"
                          addButtonTitle="Add To Cart"
                          addedButtonTitle="In Cart"
                          :productId="wishItem.Product.id"
                          :rating="wishItem.Product.rating"
                          :currency="wishItem.Product.currency"
                          :image="wishItem.Product.image1"
                          :title="wishItem.Product.title"
                          :amount="wishItem.Product.amount"
                        />
                        <AddToWishlist
                          class="mt-2"
                          addButtonTitle="Save"
                          addedButtonTitle="Saved"
                          buttonType="sm"
                          :productId="wishItem.Product.id"
                        />
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
    <MyFooter class="mt-5" />
  </div>
</template>

<script>
import TopHeader from "@/components/Common/TopHeader.vue";
import AddToCart from "@/components/MaintainProduct/AddToCart.vue";
import AddToWishlist from "@/components/MaintainProduct/AddToWishlist.vue";
import MyFooter from "@/components/Common/MyFooter.vue";
export default {
  name: "Wishlist",
  components: {
    TopHeader,
    AddToCart,
    AddToWishlist,
    MyFooter,
  },
  data() {
    return {
      userId: 0,
      myWishlist: [],
      wishlistItemCount: 0,
    };
  },
  computed: {},
  async mounted() {
    this.userId = this.$store.state.CurrentUser.userId;
    if (this.userId != 0) {
      this.myWishlist = await this.$store.dispatch("Wishlist/getWishlist");
      this.wishlistItemCount = this.myWishlist.length;
    }
    if (this.userId == 0) {
      this.$bvToast.toast("Please login for the wishlist", {
        title: "Wishlist",
        variant: "primary",
        toaster: "b-toaster-top-center",
        noCloseButton: false,
        solid: true,
      });
      return;
    }
  },
  methods: {},
};
</script>

<style scoped lang="scss"></style>
