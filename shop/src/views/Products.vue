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
                <h6 class="mt-2">
                  {{ product.amount }} {{ product.currency }}
                </h6>
                <AddToCart
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
        <b-row class="mt-3" v-if="this.apCount == 0">
          <h5>There is no product that matches the search criteria!!!</h5>
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
              {{ currentPage * perPage }} OF {{ apCount }} ({{
                Math.ceil(apCount / perPage)
              }}
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
import AddToCart from "@/components/AddToCart.vue";
import Footer from "@/components/Footer.vue";
import productsService from "@/services/ProductsService.js";
import CategoryService from "@/services/CategoryService.js";
import SubCategoryService from "@/services/SubCategoryService.js";
import SubSubCategoryService from "@/services/SubSubCategoryService.js";
export default {
  name: "Products",
  components: {
    TopHeader,
    ProductsNavbar,
    AddToCart,
    Footer,
    ProductCategorySidebar,
  },

  data() {
    return {
      route: null,
      admin: null,
      componentKey: 0,
      categoryList: null,
      subCategoryList: null,
      subSubCategoryList: null,
      searchParameter: {
        param: {},
        query: {},
      },
      displayProduct: [],
      searchText: "",
      currentPage: 1,
    };
  },
  computed: {
    sidebar_visible() {
      if (!this.route || this.route.params.subSubCategory) return false;
      else return true;
    },
    ...mapState({
      allProduct: (state) => state.Products.allProduct,
      apCount: (state) => state.Products.apCount,
      displayProducts: (state) => state.Products.displayProducts,
      perPage: (state) => state.Products.perPage,
    }),
  },

  async mounted() {
    this.admin = this.$store.state.admin;
    this.route = this.$store.state.route;

    if (this.route.params.subSubCategory) {
      try {
        const subSubCategory = (
          await SubSubCategoryService.getSubSubCategoryByName(
            this.route.params.subSubCategory
          )
        ).data;
        this.searchParameter.param.subSubCategoryId = subSubCategory.id;
      } catch (error) {
        console.log("error get sub sub cat id by name", error);
      }
    } else if (this.route.params.subCategory) {
      try {
        const subCategory = (
          await SubCategoryService.getSubCategoryByName(
            this.route.params.subCategory
          )
        ).data;
        this.searchParameter.param.subCategoryId = subCategory.id;
      } catch (error) {
        console.log("error get sub cat id by name", error);
      }
    } else if (this.route.params.category) {
      try {
        const category = (
          await CategoryService.getCategoryByName(this.route.params.category)
        ).data;
        this.searchParameter.param.categoryId = category.id;
      } catch (error) {
        console.log("error get cat id by name", error);
      }
    }
    if (this.route.query.q) {
      const str = this.route.query.q;
      this.searchParameter.query.q = str;
    }
    if (this.route.query.lo) {
      const lo = parseInt(this.route.query.lo);
      this.searchParameter.query.lo = lo;
    }
    if (this.route.query.hi) {
      const hi = parseInt(this.route.query.hi);
      this.searchParameter.query.hi = hi;
    }
    this.forceRerender();

    await this.$store.dispatch(
      "Products/setSearchParameter",
      this.searchParameter
    );
    await this.$store.dispatch("Products/setAllProduct");
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
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
