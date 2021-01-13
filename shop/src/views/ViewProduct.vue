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
            @click="current_image = displayProduct.image1"
            :src="displayProduct.image1"
          ></b-img>
          <b-img
            height="90px"
            @click="current_image = displayProduct.image2"
            :src="displayProduct.image2"
          ></b-img>
          <b-img
            height="90px"
            @click="current_image = displayProduct.image3"
            :src="displayProduct.image3"
          ></b-img>
          <b-img
            height="90px"
            @click="current_image = displayProduct.image4"
            :src="displayProduct.image4"
          ></b-img>
          <b-img
            height="90px"
            @click="current_image = displayProduct.image4"
            :src="displayProduct.image5"
          ></b-img>
        </b-row>
      </b-col>
      <b-col cols="5">
        <div class="">
          <h3>{{ displayProduct.title }}</h3>
          <h5>
            <b>Price : </b>{{ displayProduct.price }}
            {{ displayProduct.currency }}
          </h5>
          <div v-html="displayProduct.subtitle"></div>
          <div class="d-flex mt-5">
            <div>
              <AddToCart
                :id="displayProduct.id"
                :title="displayProduct.title"
                :price="displayProduct.price"
              ></AddToCart>
            </div>
            <div class="mt-2 ml-3">
              <a href="#write_review">
                <b-icon-pen />&nbsp;<strong>Write a review</strong>
              </a>
            </div>
          </div>
          <b-row>
            <b-col cols="8">
              <b-button class="mt-3" size="lg" variant="success" block>
                <b-icon-cart-fill />
                Buy Now
              </b-button>
            </b-col>
          </b-row>
        </div>
      </b-col>
      <b-col />
    </b-row>
    <b-row>
      <div class="product-detail">
        <div class="container">
          <div class="product-detail-feature">
            <h3>Feature</h3>
            <div v-html="displayProduct.description"></div>
          </div>
        </div>
      </div>
    </b-row>

    <Review />
    <Recommendation :subSubCategoryId="displayProduct.subSubCategoryId" />
    <Footer />
  </div>
</template>

<script>
// import { mapState } from "vuex";
import ProductsService from "@/services/ProductsService.js";
import TopHeader from "@/components/TopHeader.vue";
import AddToCart from "@/components/AddToCart.vue";
import Review from "@/components/ViewProduct/Review.vue";
import Recommendation from "@/components/ViewProduct/Recommendation.vue";
import Footer from "@/components/Footer.vue";
import { mapState } from "vuex";
export default {
  name: "ViewProduct",
  components: {
    TopHeader,
    AddToCart,
    Review,
    Recommendation,
    Footer,
  },
  data() {
    return {
      current_image: null,
      displayProduct: {},
    };
  },
  methods: {},
  async mounted() {
    const productId = this.$store.state.route.params.productId;
    this.displayProduct = (await ProductsService.getProduct(productId)).data;
    this.current_image = this.displayProduct.image1;
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
};
</script>

<style scoped lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: "Open Sans", serif;
  background: #eee;
}

.content {
  width: 420px;
  margin-top: 10px;
}

.ratings {
  background-color: #fff;
  padding: 54px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 10px 10px #e0e0e0;
}

.product-rating {
  font-size: 50px;
}

.stars i {
  font-size: 18px;
  color: #28a745;
}

.rating-text {
  margin-top: 10px;
}
.btn-grey {
  background-color: #d8d8d8;
  color: #fff;
}
.rating-block {
  background-color: #fafafa;
  border: 1px solid #efefef;
  padding: 15px 15px 20px 15px;
  border-radius: 3px;
}
.bold {
  font-weight: 700;
}
.padding-bottom-7 {
  padding-bottom: 7px;
}

.review-block {
  background-color: #fafafa;
  border: 1px solid #efefef;
  padding: 15px;
  border-radius: 3px;
  margin-bottom: 15px;
}
.review-block-name {
  font-size: 12px;
  margin: 10px 0;
}
.review-block-date {
  font-size: 12px;
}
.review-block-rate {
  font-size: 13px;
  margin-bottom: 15px;
}
.review-block-title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
}
.review-block-description {
  font-size: 13px;
}
</style>
