<template>
  <div>
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
          @keyup="search"
        ></b-form-input>
        <h1 class="mt-3 product-page-title">Find Your Desire</h1>
        <div v-if="showSpinner">
          <b-spinner variant="primary"></b-spinner>
        </div>
        <b-container v-for="(doc, index) in displayProducts" :key="index">
          <b-row class="item-background mt-4" align-v="center">
            <b-col
              ><h3>{{ index + 1 }}</h3></b-col
            >
            <b-col cols="2">
              <b-img
                left
                rounded
                :src="doc.image"
                style="width: 10rem"
                alt="image not added"
              ></b-img>
            </b-col>
            <b-col class="mt-4" cols="6">
              <h4>{{ doc.title }}</h4>
              <p v-html="doc.description"></p>
            </b-col>
            <b-col cols="3">
              <h6>Price: {{ doc.price }}৳</h6>
              <AddToCart
                :id="doc.id"
                :title="doc.title"
                :price="doc.price"
              ></AddToCart>
              <b-button class="m-2" @click="showModal(doc)" variant="info"
                >Details</b-button
              >
            </b-col>
          </b-row>
        </b-container>
        <div
          class="m-4 d-flex justify-content-center"
          v-if="this.paginate.rows == 0"
        >
          <h3>Nothing found for this keyword.</h3>
        </div>
        <b-pagination
          class="mt-4"
          size="lg"
          v-model="paginate.currentPage"
          :total-rows="paginate.rows"
          :per-page="paginate.perPage"
          @input="pagination(paginate.currentPage)"
        ></b-pagination>

        <ProductDetails :product="product" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddToCart from "@/components/AddToCart.vue";
import ProductDetails from "@/components/Modal/ProductDetails.vue";
import ProductCategorySidebar from "@/components/ProductCategorySidebar.vue";
import ProductsService from "../services/ProductsService";

export default {
  name: "Products",
  components: {
    AddToCart,
    ProductDetails,
    ProductCategorySidebar,
  },

  data() {
    return {
      showSpinner: null,
      product: {},
      allProducts: null,
      showProducts: {},
      searchText: "",
      paginate: {
        currentPage: 1,
        perPage: 10,
        rows: 1,
      },
    };
  },
  computed: {
    ...mapState(["displayProducts"])
  },

  async mounted() {
    this.showSpinner = true;
    this.allProducts = (await ProductsService.getAllProducts()).data;
    this.showProducts = this.allProducts;
    this.paginate.rows = this.showProducts.length;
    const displayProducts = this.allProducts.slice(0, this.paginate.perPage);
    this.$store.dispatch("setAllProducts", this.allProducts)
    this.$store.dispatch("setDisplayProducts", displayProducts)
    this.showSpinner = false;
  },
  methods: {
    search() {
      this.showSpinner = true;
      const values = this.allProducts.filter((val) => {
        return (
          val.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
          val.description
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          val.tags.toLowerCase().includes(this.searchText.toLowerCase())
        );
      });
      const displayProducts = values;
      this.$store.dispatch("setDisplayProducts", displayProducts)

      this.showSpinner = false;
      this.updatePagination(values, 1);
    },
    updatePagination(showProducts, currentPage) {
      this.showProducts = showProducts;
      this.paginate.rows = showProducts.length;
      this.pagination(currentPage);
    },
    showModal(doc) {
      this.product = doc;
      this.$bvModal.show("productDetails");
    },
    pagination(currentPage) {
      this.paginate.currentPage = currentPage;
      const start = (currentPage - 1) * this.paginate.perPage;
      const displayProducts = this.showProducts.slice(
        start,
        start + this.paginate.perPage
      );
      this.$store.dispatch("setDisplayProducts", displayProducts)

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
</style>
