<template>
  <div class="">
    <b-container>
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

      <b-modal
        id="productDetails"
        size="lg"
        hide-footer
        hide-header
        hide-header-close
      >
        <div>
          <carousel :perPage="1">
            <slide>
              <b-img
                :src="product.image"
                class="details-image"
                width="765"
              ></b-img>
            </slide>
          </carousel>
          <b-container>
            <b-row class="mt-2 d-flex justify-content-between" align-v="center">
              <h2>{{ product.title }}</h2>
              <h6>Price: {{ product.price }} taka</h6>
            </b-row>
            <b-row class="mt-2">
              <b-badge variant="dark">{{ product.tags }}</b-badge>
            </b-row>
          </b-container>
          <hr />
          <div class="mt-2">
            <h6>Description</h6>
            <hr />
            <p v-html="product.description"></p>
          </div>
        </div>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import AddToCart from "@/components/AddToCart.vue";
import ProductsService from "../services/ProductsService";

export default {
  name: "Products",
  components: {
    AddToCart
  },

  data() {
    return {
      showSpinner: null,
      product: {},
      allProducts: null,
      displayProducts: null,
      showProducts: {},
      searchText: "",
      paginate: {
        currentPage: 1,
        perPage: 10,
        rows: 1
      }
    };
  },

  async mounted() {
    this.showSpinner = true;
    this.allProducts = (await ProductsService.getAllProducts()).data;
    this.showProducts = this.allProducts;
    this.paginate.rows = this.showProducts.length;
    this.displayProducts = this.allProducts.slice(0, this.paginate.perPage);
    this.showSpinner = false;
    this.$store.dispatch("setCartProducts", this.displayProducts);
  },
  methods: {
    search() {
      this.showSpinner = true;
      const values = this.allProducts.filter(val => {
        return (
          val.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
          val.description
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          // val.price.toLowerCase().includes(this.searchText.toLowerCase()) ||
          val.tags.toLowerCase().includes(this.searchText.toLowerCase()) ||
          val.catagory.toLowerCase().includes(this.searchText.toLowerCase()) ||
          val.subCatagory.toLowerCase().includes(this.searchText.toLowerCase())
        );
      });
      this.displayProducts = values;
      this.showSpinner = false;
      this.updatePagination(values, 1);
    },
    updatePagination(showProducts, currentPage) {
      this.showProducts = showProducts;
      this.paginate.rows = showProducts.length;
      this.pagination(currentPage);
    },
    showModal(doc) {
      console.log(doc);
      this.product = doc;
      this.$bvModal.show("productDetails");
    },
    pagination(currentPage) {
      this.paginate.currentPage = currentPage;
      const start = (currentPage - 1) * this.paginate.perPage;
      this.displayProducts = this.showProducts.slice(
        start,
        start + this.paginate.perPage
      );
    }
  }
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
