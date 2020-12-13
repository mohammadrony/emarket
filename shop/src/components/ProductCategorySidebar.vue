<template>
  <div class="productCategories">
    <ul>
      <li v-for="category in categoryList" :key="category.id">
        <a href="#">{{ category.name }}<i class="fas fa-caret-right"></i></a>
        <div class="megamenu">
          <ul v-for="subCategory in subCategoryList" :key="subCategory.id">
            <h3 v-if="category.id == subCategory.CategoryId">
              {{ subCategory.name }}
              <i class="fas fa-caret-right"></i>
            </h3>
            <li
              v-for="subSubCategory in subSubCategoryList"
              :key="subSubCategory.id"
            >
              <a
                href="#"
                v-if="
                  subCategory.id == subSubCategory.SubCategoryId &&
                  subCategory.CategoryId == category.id
                "
              >
                {{ subSubCategory.name }}
              </a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CategoryService from "../services/CategoryService";
import SubCategoryService from "../services/SubCategoryService";
import SubSubCategoryService from "../services/SubSubCategoryService";

export default {
  name: "AdminProductCatagory",
  data() {
    return {
      categoryList: null,
      subCategoryList: null,
      subSubCategoryList: null,
    };
  },
  computed: {
    ...mapState(["allProducts"]),
  },

  async mounted() {
    this.categoryList = (await CategoryService.getCategoryList()).data;
    this.subCategoryList = (await SubCategoryService.getSubCategoryList()).data;
    this.subSubCategoryList = (
      await SubSubCategoryService.getSubSubCategoryList()
    ).data;
  },
  methods: {
    subCategorySelect(subCategory) {
      const values = this.allProducts.filter((val) => {
        return (
          val.CategoryId == subCategory.CategoryId &&
          val.SubCategoryId == subCategory.id
        );
      });
      const displayProducts = values;
      this.$store.dispatch("setDisplayProducts", displayProducts);
      window.location.replace("/products");
    },
    subSubCategorySelect(subSubCategory) {
      const values = this.allProducts.filter((val) => {
        return val.SubSubCategoryId == subSubCategory.id;
      });
      const displayProducts = values;
      this.$store.dispatch("setDisplayProducts", displayProducts);
      window.location.replace("/products");
    },
  },
};
</script>

<style scoped lang="scss">
</style>
