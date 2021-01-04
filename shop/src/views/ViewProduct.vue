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
          <br>
          <span class="product-rating">4.6</span><span>/5</span>
          <b-row>
            <b-col cols=2></b-col>
            <b-col cols=8>

          <b-form-rating
            readonly
            value="4.6"
            variant="primary"
            class="mb-2"
          ></b-form-rating>
            </b-col>
            <b-col cols=2></b-col>
          </b-row>
          <h6 class="mt-2">46 ratings & 15 reviews</h6>
          <br>
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
    <!-- Popular Store Start -->
    <div class="popularStores">
      <div class="container">
        <h3>Popular Stores</h3>
        <b-row>
          <div class="popularStoresInner">
            <a href="#">Dolorsite</a>
            <a href="#">Nostrum</a>
            <a href="#">Dignissimos</a>
            <a href="#">Temporibus</a>
            <a href="#">Distinction</a>
            <a href="#">Voluptam</a>
            <a href="#">Similique</a>
            <a href="#">Placeat</a>
            <a href="#">Dismiss</a>
          </div>
        </b-row>
      </div>
    </div>
    <!-- Popular Store End -->

    <!-- Greatest Offer News Start -->
    <div class="news">
      <div class="container">
        <h3>Greatest Offer News</h3>
        <div class="owl-carousel">
          <div class="item">
            <img
              src="http://localhost:8084/public/product-image/product-img9.jpg"
            />
          </div>
          <div class="item">
            <img
              src="http://localhost:8084/public/product-image/product-img10.jpg"
            />
          </div>
          <div class="item">
            <img
              src="http://localhost:8084/public/product-image/product-img11.jpg"
            />
          </div>
          <div class="item">
            <img
              src="http://localhost:8084/public/product-image/product-img12.jpg"
            />
          </div>
          <div class="item">
            <img
              src="http://localhost:8084/public/product-image/product-img10.jpg"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Greatest Offer News End -->

    <!-- Support Section start-->
    <div class="support">
      <div class="container">
        <a href="#">
          <img src="http://localhost:8084/public/product-image/icon1.png" />
          <h5>Fast Delivery</h5>
        </a>
        <a href="#">
          <img src="http://localhost:8084/public/product-image/icon2.png" />
          <h5>Support 24 Hours</h5>
        </a>
        <a href="#">
          <img src="http://localhost:8084/public/product-image/icon3.png" />
          <h5>Easy Payment Method</h5>
        </a>
        <a href="#">
          <img src="http://localhost:8084/public/product-image/icon4.png" />
          <h5>Sell on e-store</h5>
        </a>
      </div>
    </div>
    <!-- Support Section end-->

    <!-- Other Information start -->
    <div class="otherInfo">
      <div class="container">
        <h3 class="otherInfoHandle">
          Consectetur adipisicing elit exercitationem
        </h3>
        <div class="otherInfoBody">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
            exercitationem, iste necessitatibus ex ea quaerat itaque numquam
            neque ad velit, aspernatur sunt culpa placeat iusto dolore
            molestias, porro ab perspiciatis.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
            voluptatibus perspiciatis, dolor inventore dicta ut pariatur
            cupiditate blanditiis deleniti necessitatibus suscipit magnam,
            reiciendis tenetur ratione, doloribus vero hic minima asperiores.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum
            repellat pariatur totam voluptas quos asperiores cupiditate,
            nesciunt quis unde doloremque nostrum beatae ex, ut. Adipisci cum
            reprehenderit asperiores perferendis amet.
          </p>
        </div>
      </div>
    </div>
    <!-- Other Information end -->

    <!-- Footer Start -->
    <div class="footer">
      <div class="container">
        <div class="col-3">
          <p>
            <big>Address UK:</big><br />Adipisci cum reprehenderit asperiores
            perferendis amet.
          </p>
          <p>
            <big>Address US:</big><br />Ipsum repellat pariatur totam voluptas
            asperiores
          </p>
          <p>
            <big>Address UAE:</big><br />Reprehenderit asperiores perferendis
            asperiores.
          </p>
        </div>
        <div class="col-3">
          <ul>
            <li><a href="#">Contact Anywhere</a></li>
            <li><a href="#">Easy payment Method</a></li>
            <li><a href="#">Fast Shipping</a></li>
            <li><a href="#">Our New Brand</a></li>
            <li><a href="#">Catalog</a></li>
          </ul>
        </div>
        <div class="col-3">
          <ul>
            <li><a href="#">About us</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">Corpoprative Clients</a></li>
            <li><a href="#">Our Partner</a></li>
            <li><a href="#">Terms of use</a></li>
            <li><a href="#">Advertise with us</a></li>
            <li><a href="#">Compare bank</a></li>
          </ul>
        </div>
        <div class="col-3">
          <ul>
            <li><a href="#">Warranty</a></li>
            <li><a href="#">Check in</a></li>
            <li><a href="#">How to place order</a></li>
            <li><a href="#">Exchange and return</a></li>
            <li><a href="#">Installation</a></li>
            <li><a href="#">Quality of services</a></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Footer End -->

    <div class="copyright">
      <div class="container">
        <h5>&copy; 2020 e-store.com</h5>
      </div>
    </div>

    <!-- Product View Box / Quick Product View Start -->
    <!-- <div class="productViewBox">
      <h3>Apple Macbook Pro MQ032 14.5' Inter Core i7 5550U 8GB DDR3</h3>
      <div class="productViewBox-closeBtn"><i class="fas fa-times"></i></div>
      <div class="productViewBoxImg">
        <img src="http://localhost:8084/public/product-image/img1.jpg" />
      </div>
      <div class="productViewBoxDetail">
        <h5><b>Price : </b> <i class="fas fa-dollar-sign"></i> 598</h5>
        <h5><b>Brand : </b> Apple</h5>
        <h5><b>Warranty : </b> 12 Months</h5>
        <h5><b>Delivery of the city : </b> Free</h5>
        <h5>
          <b>Payment : </b> COD, Visa, Mastercard, Debit, Credit, Installation
        </h5>
        <h5><b>Availability : </b> in Stock</h5>
        <h5><b>Product Code : </b> GA000006488</h5>
        <a href="#" class="addtocart"
          ><i class="fas fa-heart"></i> Add to Cart</a
        >
        <a href="#" class="writereview"
          ><i class="fas fa-pen"></i> Write a review</a
        >
        <a href="#" class="buynow"
          ><i class="fas fa-shopping-cart"></i> Buy Now</a
        >
      </div>
    </div> -->
    <!-- Product View Box / Quick Product View End -->
  </div>
</template>

<script>
// import { mapState } from "vuex";
import ProductService from "@/services/ProductsService.js";
import TopHeader from "@/components/TopHeader.vue";
import AddToCart from "@/components/AddToCart.vue";
import { mapState } from "vuex";
export default {
  name: "ProductDetails",
  components: {
    TopHeader,
    AddToCart,
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
