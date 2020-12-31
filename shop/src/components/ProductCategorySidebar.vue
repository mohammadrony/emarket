<template>
  <div class="productCategories">
    <ul>
      <li v-for="category in categoryList" :key="category.id" class="mt-2">
        <a
          variant="white"
          block
          :class="category.visible ? null : 'collapsed'"
          :aria-expanded="category.visible ? 'true' : 'false'"
          aria-controls="collapsedSubCategory"
          @click="category.visible = !category.visible"
        >
          {{ category.name }}
          <b-icon v-if="category.visible" variant="primary" icon="triangle-fill" scale="0.5" rotate="180"></b-icon>
          <b-icon v-if="!category.visible" variant="primary" icon="triangle-fill" scale="0.5" rotate="90"></b-icon>
        </a>
        <b-collapse id="collapsedSubCategory" v-model="category.visible">
          <ul>
            <li v-for="subCategory in subCategoryList" :key="subCategory.id">
              <a v-if="category.id == subCategory.CategoryId">
                <b-dropdown
                  id="dropdown-dropright"
                  dropdown
                  :text="subCategory.name"
                  variant="white"
                  block
                  size="sm"
                >
                  <div
                    v-for="subSubCategory in subSubCategoryList"
                    :key="subSubCategory.id"
                  >
                    <b-dropdown-item
                      class="pl-3"
                      style="margin-right: 20px"
                      v-if="
                        subCategory.id == subSubCategory.SubCategoryId &&
                        subCategory.CategoryId == category.id
                      "
                      href="#"
                    >
                      <b-icon icon="cursor-fill" scale="0.5"></b-icon>
                      {{ subSubCategory.name }}
                    </b-dropdown-item>
                  </div>
                </b-dropdown>
              </a>
            </li>
          </ul>
        </b-collapse>
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
  name: "ProductCategorySidebar",
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
.productCategories{
  max-height: 800px;
  overflow-inline: hidden;
	float: left;
	padding: 10px 0px 50px 50px;
}
.productCategories ul li a{
	display: inline-block;
	text-decoration: none;
	color: #333;
	font-weight: 500;
}
.productCategories ul li a:hover{
	font-weight: 500;
	cursor: pointer;
}
.productCategories ul li ul li a{
	color: #333;
	font-size: 15px;
	font-weight: 500;
}
</style>
