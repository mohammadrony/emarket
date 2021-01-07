<template>
  <div>
    <TopHeader />
    <b-row>
      <div :class="{ 'col-3': sidebar_visible, 'col-1': !sidebar_visible }">
        <ProductCategorySidebar v-if="sidebar_visible" />
        <b-row class="text-right">
          <b-col>
            <b-button
              title="Hide list"
              v-if="sidebar_visible"
              @click="sidebar_visible = false"
              size="sm"
            >
              <b-icon scale="1.4" icon="x"></b-icon>
            </b-button>
            <b-button-toolbar v-if="!sidebar_visible">
              <b-button-group class="ml-4">
                <b-button
                  @click="sidebar_visible = true"
                  title="Show Categories"
                >
                  <b-icon scale="1.4" icon="list"></b-icon>
                </b-button>
              </b-button-group>
            </b-button-toolbar>
          </b-col>
        </b-row>
      </div>
      <b-col :class="{ 'col-8': sidebar_visible, 'col-10': !sidebar_visible }">
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <b-carousel-slide
            caption="A New Online Shop Experience."
            text="Hello"
          >
            <template #img>
              <img
                class="img-fluid w-100"
                src="http://localhost:8084/public/display-images/home_slider_1.jpg"
              />
            </template>
          </b-carousel-slide>
          <b-carousel-slide>
            <template #img>
              <img
                class="img-fluid w-100"
                src="http://localhost:8084/public/display-images/home_slider_0.jpg"
              />
            </template>
          </b-carousel-slide>
        </b-carousel>
        <b-row class="mt-5">
          <b-col>
            <b-img
              @click="advertise"
              src="http://localhost:8084/public/display-images/mac-mini.png"
            ></b-img>
          </b-col>
          <b-col>
            <b-img
              @click="advertise"
              src="http://localhost:8084/public/display-images/ipad-2020.jpeg"
            ></b-img>
          </b-col>
          <b-col>
            <b-img
              @click="advertise"
              src="http://localhost:8084/public/display-images/razer-opus.jpeg"
            ></b-img>
          </b-col>
          <b-col>
            <b-img
              @click="advertise"
              src="http://localhost:8084/public/display-images/p120.jpeg"
            ></b-img>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col>
            <b-img
              @click="banner"
              src="http://localhost:8084/public/display-images/smart-watches.jpeg"
            ></b-img>
          </b-col>
          <b-col>
            <b-img
              @click="banner"
              src="http://localhost:8084/public/display-images/lenovo-yoga.jpeg"
            ></b-img>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-container>
      <b-row id="top-sell" class="mt-5">
        <b-col>
          <h3>Top Selling Products</h3>
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
      <b-row class="mt-4">
        <b-col>
          <hr />
          <b-row id="customer-support" align-v="center">
            <b-col class="text-center">
              <b-card class="m-4">
                <b-img
                  height="125"
                  src="http://localhost:8084/public/display-icons/fast-delivery-icon.png"
                ></b-img>
                <br />
                <h5 class="mt-1">
                  <a style="text-decoration: none" href="#customer-support"
                    >Fast Delivery</a
                  >
                </h5>
              </b-card>
            </b-col>

            <b-col class="text-center">
              <b-card class="m-4">
                <b-img
                  height="125"
                  src="http://localhost:8084/public/display-icons/card-payment-icon.png"
                ></b-img>
                <br />
                <h5 class="mt-1">
                  <a style="text-decoration: none" href="#customer-support"
                    >Easy Payment</a
                  >
                </h5>
              </b-card>
            </b-col>

            <b-col class="text-center">
              <b-card class="m-4">
                <b-img
                  height="125"
                  src="http://localhost:8084/public/display-icons/online-support-icon.png"
                ></b-img>
                <br />
                <h5 class="mt-1">
                  <a style="text-decoration: none" href="#customer-support"
                    >Support 24 Hours</a
                  >
                </h5>
              </b-card>
            </b-col>
          </b-row>
          <hr />
          <b-row id="newsletter" class="pt-4">
            <b-col class="text-center">
              <p style="font-size: 34px">Subscribe to our newsletter</p>
              <p>
                Get the latest news on sublime electronics by just subscribing
                here.
              </p>
              <b-row>
                <b-col cols="3"></b-col>
                <b-col cols="6">
                  <b-form-input
                    class="mt-4"
                    size="lg"
                    placeholder="Email Address"
                  ></b-form-input>
                </b-col>
                <b-col cols="3"></b-col>
              </b-row>
              <b-button
                class="mt-5 px-5"
                size="lg"
                variant="outline-info"
                href="#newsletter"
                >Subscribe</b-button
              >
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <Footer class="pt-4 mt-4" />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import ProductCategorySidebar from "@/components/ProductCategorySidebar.vue";
import TopHeader from "@/components/TopHeader.vue";
import Footer from "@/components/Footer.vue";
// import AddToCart from "@/components/AddToCart.vue";
// import ProductsService from "@/services/ProductsService";
export default {
  name: "Home",
  components: {
    ProductCategorySidebar,
    TopHeader,
    Footer,
    // AddToCart,
  },
  data() {
    return {
      sidebar_visible: true,
      slide: 0,
      sliding: null,
      topCarousel: {
        perPage: 1,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: false,
        centerMode: true,
        speed: 1000,
        loop: true,
      },
      showSpinner: null,
      product: {},
      homeProducts: null,
      displayProduct: [],
    };
  },
  computed: {
    ...mapState({
      allProduct: (state) => state.Products.allProduct,
      apCount: (state) => state.Products.apCount,
      displayProducts: (state) => state.Products.displayProducts,
      perPage: (state) => state.Products.perPage,
    }),
  },
  async mounted() {
    // this.showSpinner = true;
    // this.homeProducts = (await ProductsService.getHomeProducts()).data;
    // this.displayProducts = this.homeProducts;
    // this.showSpinner = false;
    var start = 0,
      limit = 5;
    for (start = 0; start < this.displayProducts.length; start += limit) {
      this.displayProduct.push(
        this.displayProducts.slice(start, start + limit)
      );
    }
  },
  methods: {
    advertise() {
      window.location.replace("/products");
    },
    banner() {
      window.location.replace("/product/4");
    },
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    viewProduct(product) {
      this.$router.push({
        name: "product",
        params: {
          productId: product.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.avds_background {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.left-align {
  text-align: left;
}
.first-element {
  background-color: #bebdbd;
}
.spinner {
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: rgba(235, 131, 235, 0.2);
}
.home-products {
  background-color: white;
}
.card-image {
  max-width: 20rem;
  min-height: 20rem;
}
.details-image {
  max-height: 30rem;
}
</style>
