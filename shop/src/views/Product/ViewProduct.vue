<template>
  <div class="product-details">
    <TopHeader />
    <ProductHeader
      :key="componentKey"
      :pName="displayProduct.title"
      :categId="displayProduct.CategoryId"
      :subCategId="displayProduct.SubCategoryId"
      :subSubCategId="displayProduct.SubSubCategoryId"
    />
    <b-container class="mt-5">
      <b-row align-h="center">
        <b-col cols="5">
          <b-row align-h="center">
            <b-img
              class="mb-2"
              fluid
              :src="current_image"
              alt="Image Not Found"
            />
          </b-row>
          <b-row class="justify-content-left">
            <b-img
              class="mr-1 mb-1"
              height="90px"
              @click="changeImage(displayProduct.image1)"
              :src="displayProduct.image1"
            />
            <b-img
              class="mr-1 mb-1"
              height="90px"
              @click="changeImage(displayProduct.image2)"
              :src="displayProduct.image2"
            />
            <b-img
              class="mr-1 mb-1"
              height="90px"
              @click="changeImage(displayProduct.image3)"
              :src="displayProduct.image3"
            />
            <b-img
              class="mr-1 mb-1"
              height="90px"
              @click="changeImage(displayProduct.image4)"
              :src="displayProduct.image4"
            />
            <b-img
              class="mr-1 mb-1"
              height="90px"
              @click="changeImage(displayProduct.image5)"
              :src="displayProduct.image5"
            />
            <b-img
              class="mr-1 mb-1"
              height="90px"
              @click="changeImage(displayProduct.image6)"
              :src="displayProduct.image6"
            />
            <b-img
              class="mr-1 mb-1"
              height="90px"
              @click="changeImage(displayProduct.image7)"
              :src="displayProduct.image7"
            />
            <b-img
              class="mr-1 mb-1"
              height="90px"
              @click="changeImage(displayProduct.image8)"
              :src="displayProduct.image8"
            />
            <b-img
              class="mr-1 mb-1"
              height="90px"
              @click="changeImage(displayProduct.image9)"
              :src="displayProduct.image9"
            />
            <b-img
              class="mr-1 mb-1"
              height="90px"
              @click="changeImage(displayProduct.image10)"
              :src="displayProduct.image10"
            />
          </b-row>
        </b-col>
        <b-col cols="5">
          <div>
            <h3>
              {{ displayProduct.title }}
            </h3>

            <h5>
              <b>Price : </b>{{ displayProduct.amount }}
              {{ displayProduct.currency }}
            </h5>
            <div v-html="displayProduct.subtitle"></div>
            <div class="d-flex mt-5">
              <div>
                <AddToCart
                  buttonType="sm"
                  :id="displayProduct.id"
                  :currency="displayProduct.currency"
                  :image="displayProduct.image1"
                  :title="displayProduct.title"
                  :amount="displayProduct.amount"
                />
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
      </b-row>
      <div class="mt-5 p-4" style="background-color: #eeeeee">
        <div class="product-detail-feature">
          <h3>Feature</h3>
          <div v-html="displayProduct.description"></div>
        </div>
      </div>
    </b-container>
    <Review class="mt-3" />
    <Recommendation
      class="mt-5"
      :key="recommendationKey"
      :subSubCatId="displayProduct.SubSubCategoryId"
    />
    <Footer class="mt-5" />
  </div>
</template>

<script>
import ProductsService from "@/services/ProductsService.js";
import TopHeader from "@/components/Common/TopHeader.vue";
import ProductHeader from "@/components/ViewProduct/ProductHeader.vue";
import AddToCart from "@/components/MaintainProduct/AddToCart.vue";
import Review from "@/components/ViewProduct/Review.vue";
import Recommendation from "@/components/ViewProduct/Recommendation.vue";
import Footer from "@/components/Common/Footer.vue";
export default {
  name: "ViewProduct",
  components: {
    TopHeader,
    ProductHeader,
    AddToCart,
    Review,
    Recommendation,
    Footer
  },
  data() {
    return {
      current_image: "",
      user: {},
      componentKey: 0,
      recommendationKey: 2,
      displayProduct: {}
    };
  },
  async mounted() {
    this.user = this.$store.state.CurrentUser.user;
    const productId = parseInt(this.$store.state.route.params.productId);
    try {
      this.displayProduct = (await ProductsService.getProduct(productId)).data;
      this.forceRerender();
      this.current_image = this.displayProduct.image1;
    } catch (error) {
      console.log(error.response.data.error);
    }
  },
  computed: {},
  methods: {
    forceRerender() {
      this.componentKey += 1;
      this.recommendationKey += 1;
    },
    changeImage(image) {
      this.current_image = image;
    },
    async buyNow() {
      const buyProduct = {
        productId: this.displayProduct.id,
        amount: this.displayProduct.amount,
        currency: this.displayProduct.amount,
        quantity: 1,
        title: this.displayProduct.title,
        image: this.displayProduct.image
      };
      await this.$store.dispatch("Cart/addToCart", buyProduct);
      window.location.replace("/checkout");
    }
  }
};
</script>

<style scoped lang="scss"></style>
