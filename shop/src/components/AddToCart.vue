<template>
  <div class="addtocart">
    <b-button
      v-if="(!addedToCart && user) || !user"
      @click="addToCart"
      class="mt-2"
      variant="success"
      >Add to Cart
    </b-button>
    <b-button
      v-if="user && addedToCart"
      @click="remove"
      class="mt-2"
      variant="dark"
      >Added to Cart
    </b-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddToCartService from "../services/AddToCartService";
export default {
  name: "AddToCart",
  props: {
    id: Number,
    title: String,
    price: Number
  },
  computed: {
    ...mapState(["user"])
  },
  data() {
    return {
      addedToCart: false,
      productName: this.title,
      productId: this.id,
      productPrice: this.price,
      cartProductId: null
    };
  },
  async mounted() {
    if (this.user != null) {
      const cartProduct = (
        await AddToCartService.getCartProduct({
          userId: this.user.id,
          productId: this.id
        })
      ).data;
      this.addedToCart = !!cartProduct;
      if (cartProduct) this.cartProductId = cartProduct.id;
    }
  },
  methods: {
    async addToCart() {
      if (this.user != null) {
        try {
          const cartProduct = (
            await AddToCartService.addToCart({
              userId: this.user.id,
              productId: this.id
            })
          ).data;
          this.addedToCart = !!cartProduct;
          if (cartProduct) this.cartProductId = cartProduct.id;
        } catch (err) {
          console.log(err);
        }
      } else {
        this.$bvToast.toast("Please Log in to Add Product in Cart", {
          title: "Add to Cart Failed",
          variant: "info",
          toaster: "b-toaster-top-center",
          noCloseButton: true,
          solid: true
        });
      }
    },
    async remove() {
      try {
        const cartProduct = (await AddToCartService.remove(this.cartProductId))
          .data;
        this.addedToCart = !cartProduct;
        this.cartProductId = null;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
