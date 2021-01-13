<template>
  <div class="addtocart">
    <b-button :size="btn_size" @click="addToCart" variant="outline-primary">
      <b-icon-cart-plus-fill />
      Add to Cart
    </b-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AddToCart",
  props: {
    btn_size: String,
    id: Number,
    title: String,
    price: Number,
    image: String,
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  data() {
    return {
      productName: this.title,
      productId: this.id,
      productPrice: this.price,
    };
  },
  mounted() {},
  methods: {
    async addToCart() {
      const cartItem = {
        productId: this.productId,
        price: this.price,
        quantity: 1,
        title: this.title,
        image: this.image,
      };
      const response = await this.$store.dispatch(
        "Products/Cart/addToCart",
        cartItem
      );

      if (response) {
        this.addedToCart = true;

        console.log("Added to cart is succeeded");
        this.$bvToast.toast("Product added to cart", {
          title: "Add to Cart",
          variant: "success",
          toaster: "b-toaster-top-center",
          noCloseButton: false,
          solid: true,
        });
        return;
      } else {
        console.log("This item is already in the cart.");
        console.log("So quantity is increased by 1.");
        this.$bvToast.toast("Cart item increased", {
          title: "Already in Cart",
          variant: "primary",
          toaster: "b-toaster-top-center",
          noCloseButton: false,
          solid: true,
        });
      }
    },
    async remove() {
      const cartItem = { productId: this.productId };
      const remove_response = await this.$store.dispatch(
        "Products/Cart/removeFromCart",
        cartItem
      );
      if (remove_response) {
        this.addedToCart = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
