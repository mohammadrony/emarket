<template>
  <div>
    <TopHeader />
    <ProductsNavbar />
    <b-row class="mt-4">
      <div :class="{ 'col-3': sidebar_visible, 'col-1': !sidebar_visible }">
        <ProductCategorySidebar v-if="sidebar_visible" />
        <b-row class="text-right">
          <b-col />
          <b-col v-if="sidebar">
            <b-button
              class="mt-2"
              v-if="sidebar_visible"
              title="Hide list"
              @click="sidebar_visible = false"
              size="sm"
            >
              <b-icon scale="1.4" icon="x"></b-icon>
            </b-button>
            <b-button-toolbar class="mt-2" v-if="!sidebar_visible">
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
                  btn_size="sm"
                  :id="product.id"
                  :image="product.image1"
                  :title="product.title"
                  :price="product.price"
                ></AddToCart>
              </b-card>
            </b-card-group>
          </b-col>
        </b-row>
        <b-row class="my-5 py-5" v-if="this.apCount == 0">
          <h3>Nothing found from the store.!!!</h3>
        </b-row>
        <hr />
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
      </b-col>
      <b-col></b-col>
    </b-row>
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import TopHeader from "@/components/TopHeader.vue";
import ProductsNavbar from "@/components/ProductsNavbar.vue";
import AddToCart from "@/components/AddToCart.vue";
import Footer from "@/components/Footer.vue";
import ProductCategorySidebar from "@/components/ProductCategorySidebar.vue";
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
      categoryList: null,
      subCategoryList: null,
      subSubCategoryList: null,
      searchParameter: {
        param: {},
        query: {},
      },
      displayProduct: [],
      sidebar_visible: true,
      searchText: "",
      currentPage: 1,
    };
  },
  computed: {
    ...mapState({
      sidebar: function () {
        const sidebar =
          this.searchParameter.categoryId |
          this.searchParameter.subCategoryId |
          this.searchParameter.subSubCategoryId;
        return sidebar;
      },
      allProduct: (state) => state.Products.allProduct,
      apCount: (state) => state.Products.apCount,
      displayProducts: (state) => state.Products.displayProducts,
      perPage: (state) => state.Products.perPage,
    }),
  },

  async mounted() {
    const route = this.$store.state.route;
    if (route.params.subSubCategory) {
      const subSubCategory = (
        await SubSubCategoryService.getSubSubCategoryByName(
          route.params.subSubCategory
        )
      ).data;
      this.searchParameter.param.subSubCategoryId = subSubCategory.id;
    } else if (route.params.subCategory) {
      const subCategory = (
        await SubCategoryService.getSubCategoryByName(route.params.subCategory)
      ).data;
      this.searchParameter.param.subCategoryId = subCategory.id;
    } else if (route.params.category) {
      const category = (
        await CategoryService.getCategoryByName(route.params.category)
      ).data;
      this.searchParameter.param.categoryId = category.id;
    }
    if (route.query.q) {
      const str = route.query.q;
      this.searchParameter.query.q = str;
    }
    if (route.query.lo) {
      const lo = parseInt(route.query.lo);
      this.searchParameter.query.lo = lo;
    }
    if (route.query.hi) {
      const hi = parseInt(route.query.hi);
      this.searchParameter.query.hi = hi;
    }


    await this.$store.dispatch(
      "Products/setSearchParameter",
      this.searchParameter
    );
    await this.$store.dispatch("Products/setAllProduct");
  },
  methods: {
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
