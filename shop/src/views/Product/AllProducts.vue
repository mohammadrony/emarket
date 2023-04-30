<template>
  <div>
    <TopHeader />
    <ProductsNavbar />
    <b-row class="mt-4">
      <b-col cols="3">
        <CategorySidebar />
      </b-col>
      <b-col cols="8">
        <FilterComponent />
        <hr class="my-4" />
        <ProductList />
      </b-col>
      <b-col />
    </b-row>
    <MyFooter class="mt-5" />
  </div>
</template>

<script>
import TopHeader from "@/components/Common/TopHeader.vue";
import ProductsNavbar from "@/components/Products/ProductsNavbar.vue";
import CategorySidebar from "@/components/Products/CategorySidebar.vue";
import FilterComponent from "@/components/Products/FilterComponent.vue";
import ProductList from "@/components/Products/ProductList.vue";
import MyFooter from "@/components/Common/MyFooter.vue";
export default {
  name: "Products",
  components: {
    TopHeader,
    ProductsNavbar,
    CategorySidebar,
    FilterComponent,
    ProductList,
    MyFooter,
  },

  data() {
    return {};
  },
  computed: {},
  async mounted() {
    await this.$store.dispatch("Products/setSearchParameter", this.$route);
    await this.$store.dispatch("Products/setAllProducts");
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
