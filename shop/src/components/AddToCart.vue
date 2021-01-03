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
import CartService from "@/services/CartService";
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
      productPrice: this.price
    };
  },
  async mounted() {
    if (this.user != null) {
      const cartProduct = (
        await CartService.getCartProduct({
          productId: this.id
        })
      ).data;
      this.addedToCart = !!cartProduct;
    }
  },
  methods: {
    async addToCart() {
      if (this.user != null) {
        try {
          const cartProduct = (
            await CartService.addToCart({
              userId: this.user.id,
              productId: this.id,
              quantity: 1
            })
          ).data;
          this.addedToCart = !!cartProduct;
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
      console.log(this.id)
      try {
        const cartProduct = (await CartService.remove(this.id))
          .data;
        this.addedToCart = !cartProduct;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
