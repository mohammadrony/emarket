<template>
  <div class="admin-product-catagory" align="left">
    <div class="text">Categories</div>
    <div v-if="showSpinner">
      <b-spinner variant="primary"></b-spinner>
    </div>
    <ul>
      <li v-for="category in categoryList" :key="category.id">
        <a @click="categorySelect(category)">{{ category.name }}</a>
        <ul>
          <li v-for="(subCategory, index) in subCategoryList" :key="index">
            <a
              @click="subCategorySelect(subCategory)"
              v-if="category.id == subCategory.CategoryId"
              >{{ subCategory.name }}</a
            >
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CategoryService from "../services/CategoryService";
import SubCategoryService from "../services/SubCategoryService";

export default {
  name: "AdminProductCatagory",
  data() {
    return {
      showSpinner: null,
      categoryList: null,
      subCategoryList: null,
    };
  },
  computed: {
    ...mapState(["allProducts"]),
  },

  async mounted() {
    this.showSpinner = true;
    this.categoryList = (await CategoryService.getCategoryList()).data;
    this.subCategoryList = (await SubCategoryService.getSubCategoryList()).data;
    this.showSpinner = false;
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
    },
    categorySelect(category) {
      const values = this.allProducts.filter((val) => {
        return val.CategoryId == category.id;
      });
      const displayProducts = values;
      this.$store.dispatch("setDisplayProducts", displayProducts);
    },
  },
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  user-select: none;
  box-sizing: border-box;
  font-family: Poppins, sans-serif;
}
.admin-product-catagory {
  height: 100%;
  left: 0;
  background: #292121;
  .text {
    color: white;
    font-size: 20px;
    font-weight: 600;
    line-height: 40px;
    text-align: center;
    background: #1e1e1e;
    letter-spacing: 1px;
  }
  ul {
    background: #2c2323;
    height: 100%;
    width: 100%;
    list-style: none;
    ul {
      position: static;
      li {
        position: relative;
        line-height: 25px;
        border-bottom: none;
        a {
          font-size: 15px;
          color: #e6e6e6;
          padding-left: 80px;
        }
      }
    }
    li {
      line-height: 40px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      a {
        position: relative;
        color: white;
        text-decoration: none;
        font-size: 18px;
        padding-left: 40px;
        font-weight: 500;
        display: block;
        width: 100%;
        border-left: 3px solid transparent;
        &:hover {
          color: cyan;
          background: #1e1e1e;
          border-left-color: cyan;
        }
      }
    }
  }
}
</style>
