<template>
  <div>
    <TopHeader />
    <ProductsNavbar :key="componentKey" />
    <b-row class="mt-4">
      <div :class="{ 'col-3': sidebar_visible, 'col-1': !sidebar_visible }">
        <ProductCategorySidebar v-if="sidebar_visible" :key="componentKey" />
      </div>
      <div
        :key="componentKey"
        :class="{ 'col-8': sidebar_visible, 'col-10': !sidebar_visible }"
      >
        <FilterComponent />
        <b-row class="mt-4">
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
                <h6 class="mt-2">
                  {{ product.amount }} {{ product.currency }}
                </h6>
                <AddToCart
                  :key="cartComponentKey"
                  class="mt-2"
                  btn_size="sm"
                  :id="product.id"
                  :curr="product.currency"
                  :image="product.image1"
                  :title="product.title"
                  :amount="product.amount"
                ></AddToCart>
                <b-button
                  v-if="admin"
                  class="mt-2"
                  @click="deleteProduct(product)"
                  size="sm"
                  variant="danger"
                >
                  <b-icon icon="trash"></b-icon>
                  Delete
                </b-button>
              </b-card>
            </b-card-group>
          </b-col>
        </b-row>
        <b-row class="mt-3 mb-5" v-if="this.apCount == 0">
          <b-col>
            <hr />
            <h3>Found Nothing...</h3>
            <hr />
          </b-col>
        </b-row>
        <b-row v-if="this.apCount != 0" class="mt-3" align-v="center">
          <b-col>
            <b-pagination
              size=""
              v-model="currentPage"
              :total-rows="apCount"
              :per-page="perPage"
              @input="paginate(currentPage)"
            ></b-pagination>
          </b-col>
          <b-col></b-col>
          <b-col>
            <h6>
              SHOWING {{ (currentPage - 1) * perPage + 1 }} TO
              {{ perPage >= apCount ? apCount : (currentPage * perPage) }} OF
              {{ apCount }} ({{ Math.ceil(apCount / perPage) }}
              PAGES)
            </h6>
          </b-col>
        </b-row>
      </div>
      <b-col></b-col>
    </b-row>
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import TopHeader from "@/components/TopHeader.vue";
import ProductsNavbar from "@/components/Products/ProductsNavbar.vue";
import ProductCategorySidebar from "@/components/Products/ProductCategorySidebar.vue";
import FilterComponent from "@/components/Products/FilterComponent.vue";
import AddToCart from "@/components/AddToCart.vue";
import Footer from "@/components/Footer.vue";
import productsService from "@/services/ProductsService.js";
export default {
  name: "Products",
  components: {
    TopHeader,
    ProductsNavbar,
    ProductCategorySidebar,
    FilterComponent,
    AddToCart,
    Footer
  },

  data() {
    return {
      route: null,
      admin: null,
      componentKey: 0,
      cartComponentKey: 0,
      categoryList: null,
      subCategoryList: null,
      subSubCategoryList: null,
      searchParameter: {
        param: {},
        query: {}
      },
      displayProduct: [],
      searchText: "",
      currentPage: 1
    };
  },
  computed: {
    sidebar_visible() {
      if (!this.route || this.route.params.subSubCategory) return false;
      else return true;
    },
    ...mapState({
      allProduct: state => state.Products.allProduct,
      apCount: state => state.Products.apCount,
      displayProducts: state => state.Products.displayProducts,
      perPage: state => state.Products.perPage
    })
  },

  async mounted() {
    this.admin = this.$store.state.admin;
    this.route = this.$store.state.route;
    await this.$store.dispatch("Products/setSearchParameter", this.route);
    this.forceRerender();
    await this.$store.dispatch("Products/setAllProduct");
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    refreshCartBtn(){
      this.cartComponentKey +=1;
    },
    async deleteProduct(product) {
      await productsService.deleteProduct(product.id);
      await this.$store.dispatch("Products/setAllBackupProduct");
      window.location.reload();
    },
    viewProduct(product) {
      this.$router.push({
        name: "product",
        params: {
          productId: product.id
        }
      });
    },
    async paginate(currentPage) {
      await this.$store.dispatch("Products/paginate", currentPage);
      this.refreshCartBtn();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
