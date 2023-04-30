<template>
  <div>
    <TopHeader />
    <div v-if="validParam">
      <ProductsNavbar />
      <b-row class="mt-4">
        <b-col cols="3">
          <SubSubCategorySidebar />
        </b-col>
        <b-col cols="8">
          <FilterComponent />
          <hr class="my-4" />
          <ProductList />
        </b-col>
        <b-col />
      </b-row>
    </div>
    <div v-if="!validParam">
      <InvalidParameter
        paramName="category"
        pageToNavigate="Products Page"
        routerLink="/products"
      />
    </div>
    <MyFooter class="mt-5" />
  </div>
</template>

<script>
import TopHeader from "@/components/Common/TopHeader.vue";
import ProductsNavbar from "@/components/Products/ProductsNavbar.vue";
import InvalidParameter from "@/components/NotFound/InvalidParameter.vue";
import SubSubCategorySidebar from "@/components/Products/SubSubCategorySidebar.vue";
import FilterComponent from "@/components/Products/FilterComponent.vue";
import ProductList from "@/components/Products/ProductList.vue";
import MyFooter from "@/components/Common/MyFooter.vue";
export default {
  name: "Products",
  components: {
    TopHeader,
    ProductsNavbar,
    InvalidParameter,
    SubSubCategorySidebar,
    FilterComponent,
    ProductList,
    MyFooter,
  },

  data() {
    return {
      validParam: true,
    };
  },
  computed: {},
  async mounted() {
    await this.$store.dispatch("Products/setSearchParameter", this.$route);
    this.validParam = this.$store.state.Products.productsRouteValidate;
    await this.$store.dispatch("Products/setAllProducts");
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
