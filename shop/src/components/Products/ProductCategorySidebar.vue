<template>
  <div>
    <div v-if="sidebarList == 'category'">
      <CategorySidebar />
    </div>
    <div v-if="sidebarList == 'subCategory'">
      <SubCategorySidebar />
    </div>
    <div v-if="sidebarList == 'subSubCategory'">
      <SubSubCategorySidebar />
    </div>
  </div>
</template>

<script>
import CategorySidebar from "@/components/Products/CategorySidebar.vue";
import SubCategorySidebar from "@/components/Products/SubCategorySidebar.vue";
import SubSubCategorySidebar from "@/components/Products/SubSubCategorySidebar.vue";
export default {
  name: "ProductCategorySidebar",
  components: {
    CategorySidebar,
    SubCategorySidebar,
    SubSubCategorySidebar
  },
  data() {
    return {
      sidebarList: "",
      searchParameter: {}
    };
  },
  computed: {},

  async mounted() {
    this.searchParameter = this.$store.state.Products.searchParameter;
    if (this.searchParameter.subSubCategoryId != 0) {
      this.sidebarList = "none";
    } else if (this.searchParameter.subCategoryId != 0) {
      this.sidebarList = "subSubCategory";
    } else if (this.searchParameter.categoryId != 0) {
      this.sidebarList = "subCategory";
    } else {
      this.sidebarList = "category";
    }
  }
};
</script>

<style scoped lang="scss">
</style>
