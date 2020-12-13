<template>
  <div>
    <!-- <TopHeader></TopHeader> -->
    <!-- <b-container class="first-element">
      <b-row align-v="center">
        <b-col md="6" class="left-align">
          <h3>Website Title</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Reiciendis, earum!
          </p>
          <b-button to="/" variant="info" class="m-3">Link</b-button>
          <b-button to="/products" variant="outline-info">
            Our Products
          </b-button>
        </b-col>
        <b-col md="6">
          <img src="/img/svg/graphic.svg" width="400" />
        </b-col>
      </b-row>
    </b-container>

    <b-container class="mt-5 home-products">
      <div v-if="showSpinner" class="spinner">
        <b-spinner variant="primary"></b-spinner>
      </div>
      <b-row>
        <b-col v-for="product in displayProducts" :key="product.id">
          <b-card img-top tag="article" style="max-width: 21rem" class="mb-2">
            <b-card-img
              class="card-image"
              :src="product.image"
              alt="Image Field"
            ></b-card-img>

            <h4 class="m-3">{{ product.title }}</h4>
            <b-row>
              <b-col></b-col>
              <b-col>Price: {{ product.price }}</b-col>
            </b-row>

            <b-row>
              <b-col cols="4">
                <b-button class="m-2" @click="setDisplayProduct(doc)" variant="info"
                  >Details</b-button
                >
              </b-col>
              <b-col cols="2" />
              <b-col cols="6">
                <AddToCart
                  :id="product.id"
                  :title="product.title"
                  :price="product.price"
                ></AddToCart>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="mt-4" align-h="center">
        <b-button variant="primary" size="lg" to="products"
          >More Products</b-button
        >
      </b-row>
    </b-container>
    
    <b-container class="first-element mt-5">
      <b-row align-v="center">
        <b-col md="6">
          <img src="/img/pro/CSE_KU_logo.png" width="400" />
        </b-col>
        <b-col md="6" class="left-align">
          <h3>Developers</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
            voluptas.
          </p>
          <b-button to="/about" variant="success" size="lg">
            About Us
          </b-button>
        </b-col>
      </b-row>
    </b-container> -->
    <div class="topbar">
      <div class="container">
        <div class="topleft">
          <ul>
            <li>
              <a href="#">EN <i class="fas fa-caret-down"></i></a>
              <ul>
                <li><a href="#">RU</a></li>
                <li><a href="#">EN</a></li>
                <li><a href="#">FR</a></li>
                <li><a href="#">AU</a></li>
              </ul>
            </li>
            <li>
              <a href="#">USD <i class="fas fa-caret-down"></i></a>
              <ul>
                <li><a href="#">AUS</a></li>
                <li><a href="#">YEN</a></li>
                <li><a href="#">INR</a></li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="topcenter">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Company Profile</a></li>
            <li><a href="#">Payment Accept</a></li>
            <li><a href="#">Delivery</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div class="topright">
          <ul>
            <li>
              <a href="#"><i class="fas fa-phone"></i> +000(546)454545</a>
            </li>
            <li>
              <a href="#"
                ><i class="fas fa-user"></i> My Profile
                <i class="fas fa-caret-down"></i
              ></a>
              <ul class="myprofile-dropdown">
                <li><a href="#">My Order</a></li>
                <li><a href="#">My Wishlist</a></li>
                <li><a href="#">Pending Request</a></li>
                <li><a href="#">Delivered Order</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="header">
      <div class="container">
        <div class="logo">
          <img src="../../public/assets/images/logo.png" />
        </div>
        <div class="searchbar">
          <form>
            <input
              type="search"
              class="searchField"
              placeholder="Search for products & brands"
            />
          </form>
        </div>
        <div class="headerright">
          <ul>
            <li>
              <a href="#"><i class="fas fa-heart"></i> Wishlist</a>
            </li>
            <li>
              <a href="#"><i class="fas fa-shopping-cart"></i> Cart</a>
            </li>
            <li><b-button size="sm" variant="info" to="/login" class="signBtn">Login & Register</b-button></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="productContent">
      <div class="container">
        <ProductCategorySidebar />

        <carousel
          class="productSlider"
          :perPage="topCarousel.perPage"
          :autoplay="topCarousel.autoplay"
          :autoplayTimeout="topCarousel.autoplayTimeout"
          :autoplayHoverPause="topCarousel.autoplayHoverPause"
          :centerMode="topCarousel.centerMode"
          :speed="topCarousel.speed"
          :loop="topCarousel.loop"
        >
          <slide>
            <img src="../../public/assets/images/1.jpg" />
          </slide>
          <slide>
            <img src="../../public/assets/images/2.jpg" />
          </slide>
        </carousel>

        <div class="offer-card">
          <img src="../../public/assets/images/img1.jpg" />
        </div>
        <div class="offer-card">
          <img src="../../public/assets/images/img2.jpg" />
        </div>
        <div class="offer-card">
          <img src="../../public/assets/images/img3.jpg" />
        </div>
      </div>
    </div>

    <!-- Banner Start -->
    <div class="banner">
      <div class="container">
        <img src="../../public/assets/images/banner.jpg" alt="Banner" />
      </div>
    </div>
    <!-- Banner End -->

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
            <button class="productViewBtn">
              View Product
            </button>
          </a>
        </div>
      </div>
    </div>
    <!-- Product Area End -->

    <!-- Popular Store Start -->
    <div class="popularStores">
      <div class="container">
        <h3>Popular Stores</h3>
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
        <h5>&copy; 2019 eshopstore.com | Creator by johnsom</h5>
      </div>
    </div>

    <!-- Product View Box / Quick Product View Start -->
    <div class="productViewBox">
      <h3>Apple Macbook Pro MQ032 14.5' Inter Core i7 5550U 8GB DDR3</h3>
      <div class="productViewBox-closeBtn" @click="productViewBox-closeBtn">
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
// import TopHeader from "@/components/TopHeader.vue";
// import AddToCart from "@/components/AddToCart.vue";
// import Footer from "@/components/Footer.vue";
import ProductsService from "@/services/ProductsService";
export default {
  name: "Home",
  components: {
    ProductCategorySidebar,
    // TopHeader,
    // AddToCart,
    // Footer
  },
  data() {
    return {
      topCarousel:{
        perPage:  1,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: false,
        centerMode: true,
        speed: 1000,
        loop: true
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
