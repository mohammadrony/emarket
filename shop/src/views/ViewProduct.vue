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
              <a href="#">
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

    <b-row align-v="center">
      <b-col></b-col>
      <b-col cols="3" class="text-center">
        <b-card>
          <br />
          <span class="product-rating">4.6</span><span>/5</span>
          <b-row>
            <b-col cols="2"></b-col>
            <b-col cols="8">
              <b-form-rating
                readonly
                value="4.6"
                variant="primary"
                class="mb-2"
              ></b-form-rating>
            </b-col>
            <b-col cols="2"></b-col>
          </b-row>
          <h6 class="mt-2">46 ratings & 15 reviews</h6>
          <br />
        </b-card>
      </b-col>
      <b-col cols="3" class="justify-content-center">
        <b-progress variant="success" value="75" class="mb-3"></b-progress>
        <b-progress variant="warning" value="60" class="mb-3"></b-progress>
        <b-progress variant="primary" value="50" class="mb-3"></b-progress>
        <b-progress variant="info" value="40" class="mb-3"></b-progress>
        <b-progress variant="danger" value="30" class="mb-3"></b-progress>
      </b-col>
      <b-col></b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col></b-col>
      <b-col cols="5">
        <b-card class="mb-3" bg-variant="white" text-variant="dark">
          <b-row>
            <b-col cols="3">
              <b-img
                src="http://localhost:8084/public/user-image/default-man.png"
                height="60px"
                width="60px"
              ></b-img>
              <br />
              <b-link class="mt-2">John Doe</b-link>
              <br />
              <b-text size="sm">December 29, 2020</b-text>
            </b-col>
            <b-col cols="9">
              <b-row>
                <b-col cols="7">
                  <b-form-rating
                    readonly
                    value="4"
                    variant="primary"
                    class="mb-2"
                  ></b-form-rating>
                </b-col>
              </b-row>
              <div>
                this was nice in buy. this was nice in buy. this was nice in
                buy. this was nice in buy this was nice in buy this was nice in
                buy this was nice in buy this was nice in buy
              </div>
            </b-col>
          </b-row>
        </b-card>
        <b-card class="mb-3" bg-variant="white" text-variant="dark">
          <b-row>
            <b-col cols="3">
              <b-img
                src="http://localhost:8084/public/user-image/default-man.png"
                height="60px"
                width="60px"
              ></b-img>
              <br />
              <b-link class="mt-2">John Doe</b-link>
              <br />
              <b-text size="sm">December 29, 2020</b-text>
            </b-col>
            <b-col cols="9">
              <b-row>
                <b-col cols="7">
                  <b-form-rating
                    readonly
                    value="4"
                    variant="primary"
                    class="mb-2"
                  ></b-form-rating>
                </b-col>
              </b-row>
              <div>
                this was nice in buy. this was nice in buy. this was nice in
                buy. this was nice in buy this was nice in buy this was nice in
                buy this was nice in buy this was nice in buy
              </div>
            </b-col>
          </b-row>
        </b-card>
        <b-card class="mb-3" bg-variant="white" text-variant="dark">
          <b-row>
            <b-col cols="3">
              <b-img
                src="http://localhost:8084/public/user-image/default-man.png"
                height="60px"
                width="60px"
              ></b-img>
              <br />
              <b-link class="mt-2">John Doe</b-link>
              <br />
              <b-text size="sm">December 29, 2020</b-text>
            </b-col>
            <b-col cols="9">
              <b-row>
                <b-col cols="7">
                  <b-form-rating
                    readonly
                    value="4"
                    variant="primary"
                    class="mb-2"
                  ></b-form-rating>
                </b-col>
              </b-row>
              <div>
                this was nice in buy. this was nice in buy. this was nice in
                buy. this was nice in buy this was nice in buy this was nice in
                buy this was nice in buy this was nice in buy
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col cols="5">
        <b-card>
          <div class="mt-2 ml-3">
            <a variant="primary">
              <b-icon-pen />&nbsp;<strong>Write a review</strong>
            </a>
          </div>
          <h6></h6>
          <b-row>
            <b-col cols="5">
              <b-form-rating
                value="2"
                variant="primary"
                class="my-4"
              ></b-form-rating>
            </b-col>
          </b-row>
          <b-form-textarea
            placeholder="your comment here"
            rows="3"
            max-rows="8"
          ></b-form-textarea>
          <b-button class="mt-4" variant="primary">Submit</b-button>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>

    <b-container>
      <b-row id="top-sell" class="mt-5">
        <b-col>
          <h3>You May Also Like</h3>
          <hr />
          <b-row class="mt-3">
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
          </b-row>
          <h3 id="new-items" class="mt-5">New 2020 Fresh Stock</h3>
          <hr />
          <b-row class="mt-3">
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
            <b-col>
              <b-card>
                <b-card-img
                  class="mb-3"
                  src="http://localhost:8084/public/product-image/1_big.jpg"
                ></b-card-img>
                <b-link to="/products/2"
                  ><h5>Mac Laptop Next Generation</h5></b-link
                >
                <h6>344 ৳</h6>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <Footer class="mt-4 pt-4"/>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import ProductService from "@/services/ProductsService.js";
import TopHeader from "@/components/TopHeader.vue";
import AddToCart from "@/components/AddToCart.vue";
import Footer from "@/components/Footer.vue";
import { mapState } from "vuex";
export default {
  name: "ProductDetails",
  components: {
    TopHeader,
    AddToCart,
    Footer,
  },
  data() {
    return {
      current_image: null,
      displayProduct: null,
    };
  },
  methods: {},
  async mounted() {
    const productId = this.$store.state.route.params.productId;
    this.displayProduct = (await ProductService.getProduct(productId)).data;
    this.current_image = this.displayProduct.image1;
  },
  computed: {
    ...mapState(["user"]),
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
