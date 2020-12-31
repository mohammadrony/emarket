<template>
  <div>
    <TopHeader />
    <b-row>
      <div :class="{ 'col-3': sidebar_visible, 'col-1': !sidebar_visible }">
        <ProductCategorySidebar v-if="sidebar_visible" />
        <b-row class="text-right">
          <b-col />
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
          <b-col>
            <b-button-toolbar> </b-button-toolbar>
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
          <!-- Text slides with image -->
          <b-carousel-slide
            class="img-fluid w-100"
            width="1024"
            height="480"
            img-src="http://localhost:8084/public/product-image/1.jpg"
          ></b-carousel-slide>

          <!-- Slides with custom text -->
          <b-carousel-slide>
            <template #img>
              <img
                class="img-fluid w-100"
                width="1024"
                height="480"
                src="http://localhost:8084/public/product-image/2.jpg"
              />
            </template>
          </b-carousel-slide>
        </b-carousel>
        <b-row class="my-5 text-center">
          <b-col>
            <img src="../../public/assets/images/img1.jpg" />
          </b-col>
          <b-col>
            <img src="../../public/assets/images/img2.jpg" />
          </b-col>
          <b-col>
            <img src="../../public/assets/images/img3.jpg" />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <img src="../../public/assets/images/banner.jpg" />
          </b-col>
        </b-row>
      </b-col>
      <b-col></b-col>
    </b-row>

    <!-- <div class="d-none d-lg-block">
      <h1>hello world</h1>
    </div>

    <b-row>
      <b-col cols="1" md="4"> ok </b-col>
      <b-col cols="10" md="4"> abc </b-col>
      <b-col cols="1" md="4"> def </b-col>
    </b-row> -->

    <!-- <b-row>
      <div :class="{ 'col-4': !myname, 'col-6': myname }">done</div>
      <b-col cols="10">ok</b-col>
    </b-row> -->

    <!-- Product Area Start -->
    <div class="product-area">
      <div class="container">
        <h3>Top Selling Products</h3>

        <div class="col-3">
          <a href="#">
            <img src="../../public/assets/images/product-img1.jpg" alt="" />
            <div class="caption">
              <big>Code : GA00006488</big>
              <h4>
                Apple Macbook Pro MQ032 14.5' Inter Core i7 5550U 8GB DDR3
              </h4>
              <button class="price">
                <i class="fas fa-dollar-sign"></i> 999
              </button>
            </div>
            <button class="productViewBtn">View Product</button>
          </a>
        </div>

        <div class="col-3">
          <a href="#">
            <img src="../../public/assets/images/product-img2.jpg" alt="" />
            <div class="caption">
              <big>Code : GA00006488</big>
              <h4>
                Apple Macbook Pro MQ032 14.5' Inter Core i7 5550U 8GB DDR3
              </h4>
              <button class="price">
                <i class="fas fa-dollar-sign"></i> 255
              </button>
            </div>
            <button class="productViewBtn">View Product</button>
          </a>
        </div>

        <div class="col-3">
          <a href="#">
            <img src="../../public/assets/images/product-img3.jpg" alt="" />
            <div class="caption">
              <big>Code : GA00006488</big>
              <h4>
                Apple Macbook Pro MQ032 14.5' Inter Core i7 5550U 8GB DDR3
              </h4>
              <button class="price">
                <i class="fas fa-dollar-sign"></i> 444
              </button>
            </div>
            <button class="productViewBtn">View Product</button>
          </a>
        </div>

        <div class="col-3">
          <a href="#">
            <img src="../../public/assets/images/product-img4.jpg" alt="" />
            <div class="caption">
              <big>Code : GA00006488</big>
              <h4>
                Apple Macbook Pro MQ032 14.5' Inter Core i7 5550U 8GB DDR3
              </h4>
              <button class="price">
                <i class="fas fa-dollar-sign"></i> 598
              </button>
            </div>
            <button class="productViewBtn">View Product</button>
          </a>
        </div>

        <div class="col-3">
          <a href="#">
            <img src="../../public/assets/images/product-img4.jpg" alt="" />
            <div class="caption">
              <big>Code : GA00006488</big>
              <h4>
                Apple Macbook Pro MQ032 14.5' Inter Core i7 5550U 8GB DDR3
              </h4>
              <button class="price">
                <i class="fas fa-dollar-sign"></i> 999
              </button>
            </div>
            <button class="productViewBtn">View Product</button>
          </a>
        </div>

        <div class="col-3">
          <a href="#">
            <img src="../../public/assets/images/product-img3.jpg" alt="" />
            <div class="caption">
              <big>Code : GA00006488</big>
              <h4>
                Apple Macbook Pro MQ032 14.5' Inter Core i7 5550U 8GB DDR3
              </h4>
              <button class="price">
                <i class="fas fa-dollar-sign"></i> 255
              </button>
            </div>
            <button class="productViewBtn">View Product</button>
          </a>
        </div>

        <div class="col-3">
          <a href="#">
            <img src="../../public/assets/images/product-img1.jpg" alt="" />
            <div class="caption">
              <big>Code : GA00006488</big>
              <h4>
                Apple Macbook Pro MQ032 14.5' Inter Core i7 5550U 8GB DDR3
              </h4>
              <button class="price">
                <i class="fas fa-dollar-sign"></i> 444
              </button>
            </div>
            <button class="productViewBtn">View Product</button>
          </a>
        </div>

        <div class="col-3">
          <a href="#">
            <img src="../../public/assets/images/product-img2.jpg" alt="" />
            <div class="caption">
              <big>Code : GA00006488</big>
              <h4>
                Apple Macbook Pro MQ032 14.5' Inter Core i7 5550U 8GB DDR3
              </h4>
              <button class="price">
                <i class="fas fa-dollar-sign"></i> 598
              </button>
            </div>
            <button class="productViewBtn">View Product</button>
          </a>
        </div>

        <h3>New 2019 Fresh Stock</h3>
        <div class="col-3">
          <a href="#">
            <img src="../../public/assets/images/product-img5.jpg" />
            <div class="caption">
              <big>Code : GA00006488</big>
              <h4>
                Apple Macbook Pro MQ032 14.5' Inter Core i7 5550U 8GB DDR3
              </h4>
              <button class="price">
                <i class="fas fa-dollar-sign"></i> 49
              </button>
            </div>
            <button class="productViewBtn">View Product</button>
          </a>
        </div>
        <div class="col-3">
          <a href="#">
            <img src="../../public/assets/images/product-img6.jpg" />
            <div class="caption">
              <big>Code : GA00006488</big>
              <h4>
                Apple Macbook Pro MQ032 14.5' Inter Core i7 5550U 8GB DDR3
              </h4>
              <button class="price">
                <i class="fas fa-dollar-sign"></i> 49
              </button>
            </div>
            <button class="productViewBtn">View Product</button>
          </a>
        </div>
        <div class="col-3">
          <a href="#">
            <img src="../../public/assets/images/product-img7.jpg" />
            <div class="caption">
              <big>Code : GA00006488</big>
              <h4>
                Apple Macbook Pro MQ032 14.5' Inter Core i7 5550U 8GB DDR3
              </h4>
              <button class="price">
                <i class="fas fa-dollar-sign"></i> 49
              </button>
            </div>
            <button class="productViewBtn">View Product</button>
          </a>
        </div>
        <div class="col-3">
          <a href="#">
            <img src="../../public/assets/images/product-img8.jpg" />
            <div class="caption">
              <big>Code : GA00006488</big>
              <h4>
                Apple Macbook Pro MQ032 14.5' Inter Core i7 5550U 8GB DDR3
              </h4>
              <button class="price">
                <i class="fas fa-dollar-sign"></i> 49
              </button>
            </div>
            <button class="productViewBtn">View Product</button>
          </a>
        </div>
      </div>
    </div>
    <!-- Product Area End -->

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
            <img src="../../public/assets/images/product-img9.jpg" />
          </div>
          <div class="item">
            <img src="../../public/assets/images/product-img10.jpg" />
          </div>
          <div class="item">
            <img src="../../public/assets/images/product-img11.jpg" />
          </div>
          <div class="item">
            <img src="../../public/assets/images/product-img12.jpg" />
          </div>
          <div class="item">
            <img src="../../public/assets/images/product-img10.jpg" />
          </div>
        </div>
      </div>
    </div>
    <!-- Greatest Offer News End -->

    <!-- Support Section start-->
    <div class="support">
      <div class="container">
        <a href="#">
          <img src="../../public/assets/images/icon1.png" />
          <h5>Fast Delivery</h5>
        </a>
        <a href="#">
          <img src="../../public/assets/images/icon2.png" />
          <h5>Support 24 Hours</h5>
        </a>
        <a href="#">
          <img src="../../public/assets/images/icon3.png" />
          <h5>Easy Payment Method</h5>
        </a>
        <a href="#">
          <img src="../../public/assets/images/icon4.png" />
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
            <big>Address Mirpur:</big><br />Adipisci cum reprehenderit
            asperiores perferendis amet.
          </p>
          <p>
            <big>Address Dhanmondi:</big><br />Ipsum repellat pariatur totam
            voluptas asperiores
          </p>
          <p>
            <big>Address Jessore:</big><br />Reprehenderit asperiores
            perferendis asperiores.
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
    <div class="productViewBox">
      <h3>Apple Macbook Pro MQ032 14.5' Inter Core i7 5550U 8GB DDR3</h3>
      <div class="productViewBox-closeBtn" @click="productViewBox - closeBtn">
        <i class="fas fa-times"></i>
      </div>
      <div class="productViewBoxImg">
        <img src="../../public/assets/images/img1.jpg" />
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
    </div>
    <!-- Product View Box / Quick Product View End -->

    <!-- <Footer /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCategorySidebar from "@/components/ProductCategorySidebar.vue";
import TopHeader from "@/components/TopHeader.vue";
// import AddToCart from "@/components/AddToCart.vue";
// import Footer from "@/components/Footer.vue";
import ProductsService from "@/services/ProductsService";
export default {
  name: "Home",
  components: {
    ProductCategorySidebar,
    TopHeader,
    // AddToCart,
    // Footer
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
      displayProducts: null,
    };
  },
  async mounted() {
    this.showSpinner = true;
    this.homeProducts = (await ProductsService.getHomeProducts()).data;
    this.displayProducts = this.homeProducts;
    this.showSpinner = false;
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    setDisplayProduct(displayProduct) {
      this.$store.dispatch("Products/setDisplayProduct", displayProduct);
      window.location.replace("/details");
    },
  },
};
</script>

<style lang="scss" scoped>
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
