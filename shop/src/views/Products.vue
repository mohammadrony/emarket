<template>
  <div>
    <TopHeader></TopHeader>
    <b-row>
      <b-col cols="3">
        <ProductCategorySidebar />
      </b-col>
      <b-col cols="8">
        <b-form-input
          size="lg"
          class="mr-sm-2"
          placeholder="Search here..."
          v-model="searchText"
          @keyup.enter="search"
        ></b-form-input>
        <h1 
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
        </b-container>
        <div
          class="m-4 d-flex justify-content-center"
          v-if="this.apCount == 0"
        >
          <h3>Nothing found for this keyword.</h3>
        </div>
        <b-pagination 
          v-if="this.apCount != 0"
          class="mt-4"
          size="lg"
          v-model="currentPage"
          :total-rows="apCount"
          :per-page="perPage"
          @input="paginate(currentPage)"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TopHeader from "@/components/TopHeader.vue";
import AddToCart from "@/components/AddToCart.vue";
import ProductCategorySidebar from "@/components/ProductCategorySidebar.vue";

export default {
  name: "Products",
  components: {
    TopHeader,
    AddToCart,
    ProductCategorySidebar,
  },

  data() {
    return {
      showSpinner: null,
      searchText: "",
      currentPage: 1,

    };
  },
  computed: {
    ...mapState({
      allProduct: state => state.Products.allProduct,
      apCount: state => state.Products.apCount,
      displayProducts: state => state.Products.displayProducts,
      perPage: state => state.Products.perPage,
    }),
  },

  async mounted() {
    this.showSpinner = true;
    this.$store.dispatch("Products/setAllProduct");
    this.showSpinner = false;
  },
  methods: {
    search() {
    this.$store.dispatch("Products/searchProduct", { text: this.searchText });
    },
    viewProduct(product) {
      this.$router.push({
        name: 'product', 
        params: {
          productId: product.id
        }
      })
    },
    paginate(currentPage){
      this.$store.dispatch("Products/paginate", currentPage); 
    }
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
