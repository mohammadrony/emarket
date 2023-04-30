<template>
  <div>
    <TopHeader />
    <div v-if="validParam">
      <ProductHeader
        :key="componentKey"
        :productName="displayProduct.title"
        :categoryId="displayProduct.CategoryId"
        :subCategoryId="displayProduct.SubCategoryId"
        :subSubCategoryId="displayProduct.SubSubCategoryId"
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

              <div v-html="displayProduct.subtitle" />
              <div class="mt-4">
                <b-row align-v="center">
                  <b-col cols="7">
                    <b-form-rating
                      :precision="
                        Math.round(displayProduct.rating) ==
                        displayProduct.rating
                          ? 0
                          : 1
                      "
                      readonly
                      show-value-max
                      show-value
                      :value="displayProduct.rating"
                      variant="primary"
                    />
                  </b-col>
                </b-row>
              </div>
              <div class="d-flex justify-content-left mt-3">
                <AddToCart
                  buttonType="sm"
                  :key="cartComponentKey"
                  addButtonTitle="Add To Cart"
                  addedButtonTitle="In Cart"
                  :productId="displayProduct.id"
                  :rating="displayProduct.rating"
                  :currency="displayProduct.currency"
                  :image="displayProduct.image1"
                  :title="displayProduct.title"
                  :amount="displayProduct.amount"
                />
                <AddToWishlist
                  class="ml-3"
                  :key="wishlistKey"
                  addButtonTitle="Save"
                  addedButtonTitle="Saved"
                  buttonType="sm"
                  :productId="displayProduct.id"
                />
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
          <div>
            <h3>Feature</h3>
            <div v-html="displayProduct.description" />
          </div>
        </div>
        <Review class="mt-3" />
        <Recommendation
          class="mt-5"
          :key="recommendationKey"
          :subSubCategoryId="displayProduct.SubSubCategoryId"
        />
      </b-container>
    </div>
    <div v-if="!validParam">
      <InvalidParameter
        paramName="product"
        pageToNavigate="Products Page"
        routerLink="/products"
      />
    </div>
    <MyFooter class="mt-5" />
  </div>
</template>

<script>
import ProductsService from "@/services/ProductsService.js";
import TopHeader from "@/components/Common/TopHeader.vue";
import ProductHeader from "@/components/ProductDetails/ProductHeader.vue";
import AddToCart from "@/components/MaintainProduct/AddToCart.vue";
import InvalidParameter from "@/components/NotFound/InvalidParameter.vue";
import AddToWishlist from "@/components/MaintainProduct/AddToWishlist.vue";
import Review from "@/components/ProductDetails/Review.vue";
import Recommendation from "@/components/ProductDetails/Recommendation.vue";
import MyFooter from "@/components/Common/MyFooter.vue";
export default {
  name: "ProductDetails",
  components: {
    TopHeader,
    ProductHeader,
    AddToCart,
    InvalidParameter,
    AddToWishlist,
    Review,
    Recommendation,
    MyFooter,
  },
  data() {
    return {
      current_image: "",
      user: {},
      componentKey: 0,
      wishlistKey: 6,
      validParam: true,
      cartComponentKey: 4,
      recommendationKey: 2,
      displayProduct: {},
    };
  },
  async mounted() {
    this.user = this.$store.state.CurrentUser.user;
    const productId = parseInt(this.$route.params.productId);
    try {
      this.displayProduct = (await ProductsService.getProduct(productId)).data;
      this.validParam = Object.keys(this.displayProduct).length != 0;
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
      this.wishlistKey += 1;
      this.cartComponentKey += 1;
      this.recommendationKey += 1;
    },
    changeImage(image) {
      this.current_image = image;
    },
    async buyNow() {
      const buyProduct = {
        productId: this.displayProduct.id,
        title: this.displayProduct.title,
        image: this.displayProduct.image1,
        rating: this.displayProduct.rating,
        currency: this.displayProduct.currency,
        amount: this.displayProduct.amount,
        quantity: 1,
      };
      await this.$store.dispatch("Cart/addToCart", buyProduct);
      this.$router.push({ path: "/checkout" });
    },
  },
};
</script>

<style scoped lang="scss"></style>
