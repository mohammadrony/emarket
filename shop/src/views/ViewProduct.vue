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
          <b-img height="90px" @click="current_image=displayProduct.image1" :src="displayProduct.image1"></b-img>
          <b-img height="90px" @click="current_image=displayProduct.image2" :src="displayProduct.image2"></b-img>
          <b-img height="90px" @click="current_image=displayProduct.image3" :src="displayProduct.image3"></b-img>
          <b-img height="90px" @click="current_image=displayProduct.image4" :src="displayProduct.image4"></b-img>
          <b-img height="90px" @click="current_image=displayProduct.image4" :src="displayProduct.image5"></b-img>
          <!-- <b-img
            class="mr-2"
            v-for="image in images"
            :key="image.id"
            height="80px"
            :src="image.link"
            @click="image_change(image)"
          ></b-img> -->
        </b-row>
      </b-col>
      <b-col cols="5">
        <div class="product-detail-right">
          <h3>
            {{displayProduct.title}} <br /><small
              >{{displayProduct.code}}</small
            >
          </h3>
          <h5><b>Price : </b>{{displayProduct.price}} {{displayProduct.currency}}</h5>
          <div v-html="displayProduct.subtitle"></div>
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
      </b-col>
      <b-col />
    </b-row>
    <b-row>
      <!-- Product Detail Page Start -->
      <div class="product-detail">
        <div class="container">
          <div class="product-detail-left">
            <!-- <div class="sp-loading">
            <img src="http://localhost:8084/public/product-image/sp-loading.gif" />
            Loading Images
          </div> -->
          </div>

          <div class="product-detail-feature">
            <h3>Feature</h3>
            <!-- <p>Brand : Apple</p>
          <p>Bluetooth : Yes</p>
          <p>Wifi : Yes</p>
          <p>Webcam : Yes</p>
          <p>Weight : 1.37kg</p>
          <p>Dimensions : 304x212x14.9mm</p>
          <p>Speakers : Yes</p>
          <p>Microphone : Yes</p>
          <p>Laptop Processor Code : 7360U</p>
          <p>Laptop Processor Code : 2</p>
          <p>Laptop Catch Size : 4M</p>
          <p>Laptop Processor : Intel Core i7</p>
          <p>Laptop Processor Frequency : 3.6 GHz</p>
          <p>Laptop OS : MacOS sierra</p>
          <p>Laptop Series : Macbook Pro</p>
          <p>Laptop Purpose : Work, Multimedia</p>
          <p>Laptop Keyboard Backlight : Yes</p>
          <p>Laptop Hard Drive Capacity : 128GB</p>
          <p>Laptop Hard Drive Type : SSD</p>
          <p>Laptop RAM : 8GB</p>
          <p>Laptop Screen Size : 13.3 inch</p>
          <p>Laptop Screen Resolution : 2560x1600</p>
          <p>Laptop LED Backlight : Yes</p>
          <p>Matrix Type of Laptop Screen : IPS</p>
          <p>Laptop Screen Cover : Glossy</p>
          <p>Widescreen Laptop Screen : Yes</p>
          <p>Video Card Manufacturer : Inter Iris Plus Graphics</p>
          <p>Notebook Graphics Card Type : Inter</p> -->
            <div v-html="displayProduct.description"></div>
          </div>
        </div>
      </div>
    </b-row>

    <!-- Product Detail Page End -->
    <b-row align-v="center">
      <b-col></b-col>
      <b-col cols="3">
        <div class="d-flex justify-content-left">
          <div class="content text-center">
            <div class="ratings">
              <span class="product-rating">4.6</span><span>/5</span>
              <div class="stars">
                <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                <i class="fa fa-star"></i> <i class="fa fa-star"></i>
              </div>
              <div class="rating-text">
                <span>46 ratings & 15 reviews</span>
              </div>
            </div>
          </div>
        </div>
      </b-col>
      <b-col cols="3" class="justify-content-center">
        5<b-progress variant="success" value="75" class="mb-3"></b-progress>
        4<b-progress variant="warning" value="60" class="mb-3"></b-progress>
        3<b-progress variant="primary" value="50" class="mb-3"></b-progress>
        2<b-progress variant="info" value="40" class="mb-3"></b-progress>
        1<b-progress variant="danger" value="30" class="mb-3"></b-progress>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <div class="container">
          <div class="row">
            <div class="col-sm-7">
              <hr />
              <div class="review-block">
                <div class="row">
                  <div class="col-sm-3">
                    <img
                      src="http://dummyimage.com/60x60/666/ffffff&text=No+Image"
                      class="img-rounded"
                    />
                    <div class="review-block-name">
                      <a href="#">nktailor</a>
                    </div>
                    <div class="review-block-date">
                      December 29, 2020<br />2 day ago
                    </div>
                  </div>
                  <div class="col-sm-9">
                    <b-form-rating
                      readonly
                      value="4"
                      variant="primary"
                      class="mb-2"
                    ></b-form-rating>

                    <div class="review-block-title">this was nice in buy</div>
                    <div class="review-block-description">
                      this was nice in buy. this was nice in buy. this was nice
                      in buy. this was nice in buy this was nice in buy this was
                      nice in buy this was nice in buy this was nice in buy
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <img
                      src="http://dummyimage.com/60x60/666/ffffff&text=No+Image"
                      class="img-rounded"
                    />
                    <div class="review-block-name">
                      <a href="#">nktailor</a>
                    </div>
                    <div class="review-block-date">
                      December 29, 2020<br />2 day ago
                    </div>
                  </div>
                  <div class="col-sm-9">
                    <b-form-rating
                      readonly
                      value="5"
                      variant="primary"
                      class="mb-2"
                    ></b-form-rating>
                    <div class="review-block-title">this was nice in buy</div>
                    <div class="review-block-description">
                      this was nice in buy. this was nice in buy. this was nice
                      in buy. this was nice in buy this was nice in buy this was
                      nice in buy this was nice in buy this was nice in buy
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <img
                      src="http://dummyimage.com/60x60/666/ffffff&text=No+Image"
                      class="img-rounded"
                    />
                    <div class="review-block-name">
                      <a href="#">nktailor</a>
                    </div>
                    <div class="review-block-date">
                      December 29, 2020<br />2 day ago
                    </div>
                  </div>
                  <div class="col-sm-9">
                    <b-form-rating
                      readonly
                      value="5"
                      variant="primary"
                      class="mb-2"
                    ></b-form-rating>

                    <div class="review-block-title">this was nice in buy</div>
                    <div class="review-block-description">
                      this was nice in buy. this was nice in buy. this was nice
                      in buy. this was nice in buy this was nice in buy this was
                      nice in buy this was nice in buy this was nice in buy
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /container -->
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
import { mapState } from "vuex";
import TopHeader from "@/components/TopHeader.vue";
export default {
  name: "ProductDetails",
  components: {
    TopHeader,
  },
  data() {
    return {
      current_image: null,
    //   // images: {
    //   //   link1: "http://localhost:8084/public/product-image/1_tb.jpg",
    //   //   link2: "http://localhost:8084/public/product-image/2_tb.jpg",
    //   //   link3: "http://localhost:8084/public/product-image/3_tb.jpg",
    //   // },
    //   images: [
    //     {
    //       id: 1,
    //       link: "http://localhost:8084/public/product-image/1_tb.jpg",
    //     },
    //     {
    //       id: 2,
    //       link: "http://localhost:8084/public/product-image/2_tb.jpg",
    //     },
    //     {
    //       id: 3,
    //       link: "http://localhost:8084/public/product-image/3_tb.jpg",
    //     },
    //   ],
    //   feature:
    //     "<div><div><h3> Software </h3></div><div ><div >OS</div><div >Android 9.0 (Pie); One UI</div></div><div ><h3> Hardware </h3></div><div ><div >Design</div></div><div ><div >weight</div><div >168 gm</div></div><div ><div >screen</div><div >6.3inch PLS TFT capacitive touchscreen, 16M colors, 97.4 cm2 (~84.9% screen-to-body ratio)</div></div><div ><div >dimension</div><div >155.3 x 73.9 x 7.9 mm</div></div><div ><div >protection</div><div >Corning Gorilla Glass (unspecified)</div></div><div ><div >resolution</div><div >1080 x 2340 pixels, 19.5:9 ratio (~409 ppi density)</div></div><div ><div >Memory</div></div><div ><div >expandable</div><div >1024 GB</div></div><div ><div >RAM</div><div >6 GB</div></div><div ><div >ROM</div><div >128 GB</div></div><div ><div >Processor</div></div><div ><div >number of cores</div><div >8 core</div></div><div ><div >SoC</div><div >Qualcomm SDM675 Snapdragon 675 (11 nm)</div></div><div ><div >CPU</div><div >Octa-core (2x2.0 GHz Kryo 460 Gold &amp; 6x1.7 GHz Kryo 460 Silver)</div></div><div ><div >GPU</div><div >Adreno 612</div></div><div ><div >Camera</div></div><div ><div >secondary</div><div >16 MP, f/2.0, HDR</div></div><div ><div >video</div><div >2160p@30fps, 1080p@30fps</div></div><div ><div >feature</div><div >LED flash, panorama, HDR</div></div><div ><div >primary</div><div >Triple: <br>32 MP, f/1.7, 0.8m, PDAF <br>8 MP, f/2.2, 12mm (ultrawide), 1.12m, PDAF<br>5 MP, f/2.2, depth sensor<br></div></div><div ><div >Battery</div></div><div ><div >capacity</div><div >3500mAh Li-Polymer (non-removable)</div></div><div ><div ><h3>Connectivity</h3></div></div><div ><div >Wi-Fi</div><div >Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct, hotspot</div></div><div ><div >internet</div><div >2G/3G/4G</div></div><div ><div >USB</div><div >2.0, Type-C 1.0 reversible connector</div></div><div ><div >bluetooth</div><div >5.0, A2DP, LE</div></div><div ><div >Audio</div></div><div ><div >radio</div><div >FM Radio</div></div><div ><div >Others</div></div><div ><div ><h3>sensors</h3></div><div >Fingerprint (rear-mounted), accelerometer, gyro, proximity, compass</div></div><div ><div >general</div><div >Hybrid Dual SIM (Nano-SIM, dual stand-by)</div></div><div > Manufacturer </div><div ><div >first arrival</div><div >June, 2019</div></div><div ><div >Manufactured By</div><div >Samsung</div></div><div ><div >availability</div><div >available</div></div></div>",
    //   sub_title:
    //     "<h5><b>Brand : </b> Apple</h5><h5><b>Warranty : </b> 12 Months</h5><h5><b>Delivery of the city : </b> Free</h5><h5><b>Payment : </b> COD, Visa, Mastercard, Debit, Credit, Installation</h5><h5><b>Availability : </b> in Stock</h5>",
    //   oldfeature:
    //     "<p>Brand : Apple</p><p>Bluetooth : Yes</p><p>Wifi : Yes</p><p>Webcam : Yes</p><p>Weight : 1.37kg</p><p>Dimensions : 304x212x14.9mm</p><p>Speakers : Yes</p><p>Microphone : Yes</p><p>Laptop Processor Code : 7360U</p><p>Laptop Processor Code : 2</p><p>Laptop Catch Size : 4M</p><p>Laptop Processor : Intel Core i7</p><p>Laptop Processor Frequency : 3.6 GHz</p><p>Laptop OS : MacOS sierra</p><p>Laptop Series : Macbook Pro</p><p>Laptop Purpose : Work, Multimedia</p><p>Laptop Keyboard Backlight : Yes</p><p>Laptop Hard Drive Capacity : 128GB</p><p>Laptop Hard Drive Type : SSD</p><p>Laptop RAM : 8GB</p><p>Laptop Screen Size : 13.3 inch</p><p>Laptop Screen Resolution : 2560x1600</p><p>Laptop LED Backlight : Yes</p><p>Matrix Type of Laptop Screen : IPS</p><p>Laptop Screen Cover : Glossy</p><p>Widescreen Laptop Screen : Yes</p><p>Video Card Manufacturer : Inter Iris Plus Graphics</p><p>Notebook Graphics Card Type : Inter</p>",
    };
  },
  methods: {
    image_change(image) {
      this.current_image = image.link;
    },
  },
  mounted() {
    const productId = this.$store.state.route.params.productId;
    this.$store.dispatch("Products/setDisplayProduct", productId);
    this.current_image = this.displayProduct.image1; 
  },
  computed: {
    ...mapState({
      displayProduct: (state) => state.Products.displayProduct,
      
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
