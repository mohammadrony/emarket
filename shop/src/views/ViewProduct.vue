<template>
  <div class="product-details">
    <TopHeader />
    <b-row class="mt-5">
      <b-col />
      <b-col cols="5">
        <b-row align-h="center">
          <img
            class="mb-2"
            height="400px"
            :src="current_image"
            alt="Image Not Found"
          />
        </b-row>
        <b-row>
          <b-img
            height="90px"
            @click="changeImage(displayProduct.image1)"
            :src="displayProduct.image1"
          ></b-img>
          <b-img
            height="90px"
            @click="changeImage(displayProduct.image2)"
            :src="displayProduct.image2"
          ></b-img>
          <b-img
            height="90px"
            @click="changeImage(displayProduct.image3)"
            :src="displayProduct.image3"
          ></b-img>
          <b-img
            height="90px"
            @click="changeImage(displayProduct.image4)"
            :src="displayProduct.image4"
          ></b-img>
          <b-img
            height="90px"
            @click="changeImage(displayProduct.image5)"
            :src="displayProduct.image5"
          ></b-img>
          <b-img
            height="90px"
            @click="changeImage(displayProduct.image6)"
            :src="displayProduct.image6"
          ></b-img>
          <b-img
            height="90px"
            @click="changeImage(displayProduct.image7)"
            :src="displayProduct.image7"
          ></b-img>
          <b-img
            height="90px"
            @click="changeImage(displayProduct.image8)"
            :src="displayProduct.image8"
          ></b-img>
          <b-img
            height="90px"
            @click="changeImage(displayProduct.image9)"
            :src="displayProduct.image9"
          ></b-img>
          <b-img
            height="90px"
            @click="changeImage(displayProduct.image10)"
            :src="displayProduct.image10"
          ></b-img>
        </b-row>
      </b-col>
      <b-col cols="5">
        <div class="">
          <h3>{{ displayProduct.title }}</h3>
          <h5>
            <b>Price : </b>{{ displayProduct.amount }}
            {{ displayProduct.currency }}
          </h5>
          <div v-html="displayProduct.subtitle"></div>
          <div class="d-flex mt-5">
            <div>
              <AddToCart
                btn_size="sm"
                :id="displayProduct.id"
                :curr="displayProduct.currency"
                :image="displayProduct.image1"
                :title="displayProduct.title"
                :amount="displayProduct.amount"
              ></AddToCart>
            </div>
            <div class="mt-2 ml-3">
              <a href="#review_section">
                <b-icon-pen />&nbsp;<strong>Write a review</strong>
              </a>
            </div>
          </div>
          <b-row>
            <b-col cols="8">
              <b-button
                @click="buyNow"
                class="mt-3"
                size="lg"
                variant="success"
                block
              >
                <b-icon-cart-fill />
                Buy Now
              </b-button>
            </b-col>
          </b-row>
        </div>
      </b-col>
      <b-col />
    </b-row>
    <b-container class="mt-5 p-4" style="background-color: #eeeeee">
      <div class="product-detail-feature">
        <h3>Feature</h3>
        <div v-html="displayProduct.description"></div>
      </div>
    </b-container>
    <Review class="mt-3" />
    <Footer />
  </div>
</template>

<script>
// import { mapState } from "vuex";
import ProductsService from "@/services/ProductsService.js";
import TopHeader from "@/components/TopHeader.vue";
import AddToCart from "@/components/AddToCart.vue";
import Review from "@/components/ViewProduct/Review.vue";
import Footer from "@/components/Footer.vue";
import { mapState } from "vuex";
export default {
  name: "ViewProduct",
  components: {
    TopHeader,
    AddToCart,
    Review,
    Footer
  },
  data() {
    return {
      current_image: null,
      displayProduct: {}
    };
  },
  methods: {
    changeImage(image) {
      this.current_image = image;
    },
    async buyNow() {
      const buyProduct = {
        productId: this.productId,
        amount: this.amount,
        currency: this.currency,
        quantity: 1,
        title: this.title,
        image: this.image
      };
      await this.$store.dispatch("Cart/addToCart", buyProduct);
      window.location.replace("/checkout");
    }
  },
  async mounted() {
    const productId = parseInt(this.$store.state.route.params.productId);
    try {
      this.displayProduct = (await ProductsService.getProduct(productId)).data;
      this.current_image = this.displayProduct.image1;
    } catch (error) {
      console.log(error.response.data.error);
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  }
};
</script>

<style scoped lang="scss">
</style>
