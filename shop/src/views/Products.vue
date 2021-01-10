<template>
  <div>
    <TopHeader></TopHeader>

    <!-- <b-col cols="8"> -->
    <!-- <b-form-input
      size="lg"
      class="mr-sm-2"
      placeholder="Search here..."
      v-model="searchText"
      @keyup.enter="search"
    ></b-form-input> -->
    <!-- <h1 
          v-if="this.apCount != 0"
          class="mt-3 product-page-title"
        >
          Find
        </h1>
        <div v-if="showSpinner">
          <b-spinner class="m-5" variant="primary"></b-spinner>
        </div>
        <b-container v-for="(product, index) in displayProducts" :key="index">
          <b-row class="item-background mt-4" align-v="center">
            <b-col cols="3">
              <b-img
                left
                rounded
                :src="product.image"
                class="product-image"
                @click="showModal(product)"
                alt="image not added"
              ></b-img>
            </b-col>
            <b-col cols="2">
              <h4>{{ product.title }}</h4>
            </b-col>
            <b-col cols="4">
              <p v-html="product.description"></p>
            </b-col>
            <b-col cols="1">
              <h6>{{ product.price }}৳</h6>
            </b-col>
            <b-col>
              <AddToCart
                :id="product.id"
                :title="product.title"
                :price="product.price"
              ></AddToCart>
              <b-button 
                class="m-2" 
                @click="viewProduct(product)" 
                variant="info"
                >
                Details
              </b-button
              >
            </b-col>
          </b-row>
        </b-container> -->
    <b-button variant="info" @click="loadSomething">Submit</b-button>
    <b-row>
      <div :class="{ 'col-3': sidebar_visible, 'col-1': !sidebar_visible }">
        <ProductCategorySidebar v-if="sidebar_visible" />
        <b-row class="text-right">
          <b-col />
          <b-col>
            <b-button
              v-if="sidebar_visible"
              title="Hide list"
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
          <b-col />
        </b-row>
      </div>
      <b-col :class="{ 'col-8': sidebar_visible, 'col-10': !sidebar_visible }">
        <b-row>
          <b-col
            cols="4"
            v-for="(product, index) in displayProducts"
            :key="index"
          >
            <b-card-group deck>
              <b-card img-top style="max-width: 25rem" class="mb-4">
                <b-card-img
                  :src="product.image1"
                  style="max-width: 25rem; max-height: 25rem"
                  alt="Image Not Found"
                ></b-card-img>
                <a href="" @click="viewProduct(product)">{{ product.title }}</a>
                <br />
                <h6 class="mt-2">{{ product.price }} ৳</h6>
                <AddToCart
                  class="mt-4"
                  size="sm"
                  :id="product.id"
                  :title="product.title"
                  :price="product.price"
                ></AddToCart>
                <!-- <b-button
                class="mt-4"
                @click="viewProduct(product)"
                href="#"
                block
                variant="warning"
                >View Details</b-button
              > -->
              </b-card>
            </b-card-group>
          </b-col>
        </b-row>

        <!-- <div class="product-area">
          <div class="">
            <div
              class="col-3"
              v-for="(product, index) in displayProducts"
              :key="index"
            >
              <a href="#">
                <img height="" :src="product.image1" alt="" />
                <div class="caption">
                  <big>{{ product.title }}</big>
                  <h4>Code : {{ product.code }}</h4>
                  <button class="price">{{ product.price }} ৳</button>
                </div>
                <button class="productViewBtn">View Product</button>
              </a>
            </div>
          </div>
        </div> -->
        <hr>
        <b-row class="mt-3" align-v="center">
          <b-col>
            <b-pagination
              v-if="this.apCount != 0"
              size=""
              v-model="currentPage"
              :total-rows="apCount"
              :per-page="perPage"
              @input="paginate(currentPage)"
            ></b-pagination>
          </b-col>
          <b-col></b-col>
          <b-col>
            <h6>SHOWING {{(currentPage-1)*perPage+1}} TO {{currentPage*perPage}} OF {{apCount}} ({{Math.ceil(apCount/perPage)}} PAGES)</h6>
          </b-col>
        </b-row>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-container v-if="this.apCount == 0">
      <h3>Nothing Found!!!</h3>
    </b-container>
    <div class="m-4 d-flex justify-content-center" v-if="this.apCount == 0">
      <h3>Nothing found for this keyword.</h3>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import TopHeader from "@/components/TopHeader.vue";
import AddToCart from "@/components/AddToCart.vue";
import Footer from "@/components/Footer.vue";
import ProductCategorySidebar from "@/components/ProductCategorySidebar.vue";

export default {
  name: "Products",
  components: {
    TopHeader,
    AddToCart,
    Footer,
    ProductCategorySidebar,
  },

  data() {
    return {
      displayProduct: [],
      sidebar_visible: true,
      // showSpinner: null,
      searchText: "",
      currentPage: 1,
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
    await this.$store.dispatch("Products/setAllProduct");
    await this.$store.dispatch("Products/resetSearchParameter");
    // this.showSpinner = true;
    // this.showSpinner = false;
    // var start = 0,
    //   limit = 5;
    // for (start = 0; start < this.displayProducts.length; start += limit) {
    //   this.displayProduct.push(
    //     this.displayProducts.slice(start, start + limit)
    //   );
    // }
  },
  methods: {
    ok() {
      console.log("hello there");
    },
    // search() {
    //   this.$store.dispatch("Products/searchProduct", { text: this.searchText });
    // },
    loadSomething() {
      // this.$store.dispatch("Products/getAllBackupProduct");
      console.log(this.$store.state.Products.displayProducts);
    },
    viewProduct(product) {
      this.$router.push({
        name: "product",
        params: {
          productId: product.id,
        },
      });
    },
    paginate(currentPage) {
      this.$store.dispatch("Products/paginate", currentPage);
    },
  },
};
</script>

<style lang="scss" scoped>
.item-background {
  background-color: rgb(190, 243, 240);
}
.product-page-title {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.details-image {
  max-height: 30rem;
}
.product-image {
  height: 10rem;
  width: 10rem;
}
</style>
