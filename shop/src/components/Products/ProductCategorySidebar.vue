<template>
  <div class="productCategories">
    <!-- category list start -->
    <ul v-if="this.sidebarList == 'category'">
      <li v-for="category in categoryList" :key="category.id" class="mt-2">
        <b-row>
          <div :class="{ 'col-12': !admin, 'col-7': admin }">
            <a
              v-if="category.mode == 0"
              variant="white"
              block
              @click="categorySelect(category)"
            >
              <small>{{ category.name }}</small>
              <b-icon
                variant="primary"
                icon="triangle-fill"
                scale="0.5"
                rotate="90"
              ></b-icon>
            </a>
            <b-form-group @submit.prevent="updateCategory(category)">
              <b-form-input
                v-if="category.mode == 1 && admin"
                size="sm"
                v-model="category.name"
                placeholder="Category Name"
              ></b-form-input>
            </b-form-group>
          </div>
          <b-col v-if="admin" cols="5">
            <b-button-toolbar v-if="category.mode == 0">
              <b-button-group size="sm">
                <b-button
                  @click="category.mode = category.mode ^ 1"
                  variant="white"
                  ><b-icon
                    variant="primary"
                    v-b-tooltip.hover
                    title="Edit"
                    icon="pen"
                  ></b-icon
                ></b-button>

                <b-button @click="deleteCategory(category)" variant="white"
                  ><b-icon
                    variant="danger"
                    v-b-tooltip.hover
                    title="Delete"
                    icon="trash"
                  ></b-icon
                ></b-button>
              </b-button-group>
            </b-button-toolbar>
            <b-button-toolbar v-if="category.mode == 1">
              <b-button-group size="sm">
                <b-button @click="updateCategory(category)" variant="white"
                  ><b-icon
                    variant="primary"
                    v-b-tooltip.hover
                    title="Save"
                    icon="check2"
                  ></b-icon
                ></b-button>

                <b-button
                  @click="category.mode = category.mode ^ 1"
                  variant="white"
                  ><b-icon
                    variant="danger"
                    v-b-tooltip.hover
                    title="Cancel"
                    icon="x"
                  ></b-icon
                ></b-button>
              </b-button-group>
            </b-button-toolbar>
          </b-col>
        </b-row>
      </li>
      <li>
        <b-row v-if="admin">
          <b-col cols="11">
            <b-form class="mt-2">
              <b-form-group @submit.prevent="createNewCateg">
                <b-form-input
                  v-model="newCategory"
                  placeholder="Create new category"
                >
                </b-form-input>
              </b-form-group>
              <b-button @click="createNewCateg" variant="primary"
                >Create</b-button
              >
            </b-form>
          </b-col>
        </b-row>
      </li>
    </ul>
    <!-- category list end -->

    <!-- sub category list start -->
    <ul v-if="this.sidebarList == 'subCategory'">
      <div
        v-for="subCategory in subCategoryList"
        :key="subCategory.id"
        class="mt-2"
      >
        <li
          v-if="searchParameter.categoryId == subCategory.CategoryId"
          class="mt-2"
        >
          <b-row>
            <div :class="{ 'col-12': !admin, 'col-7': admin }">
              <a
                v-if="subCategory.mode == 0"
                variant="white"
                block
                @click="subCategorySelect(subCategory)"
              >
                <small>{{ subCategory.name }}</small>
                <b-icon
                  variant="primary"
                  icon="triangle-fill"
                  scale="0.5"
                  rotate="90"
                ></b-icon>
              </a>
              <b-form-group @submit.prevent="updateSubCategory(subCategory)">
                <b-form-input
                  v-if="subCategory.mode == 1 && admin"
                  size="sm"
                  v-model="subCategory.name"
                  placeholder="Category Name"
                ></b-form-input>
              </b-form-group>
            </div>
            <b-col v-if="admin" cols="5">
              <b-button-toolbar v-if="subCategory.mode == 0">
                <b-button-group size="sm">
                  <b-button
                    @click="subCategory.mode = subCategory.mode ^ 1"
                    variant="white"
                    ><b-icon
                      variant="primary"
                      v-b-tooltip.hover
                      title="Edit"
                      icon="pen"
                    ></b-icon
                  ></b-button>

                  <b-button
                    @click="deleteSubCategory(subCategory)"
                    variant="white"
                    ><b-icon
                      variant="danger"
                      v-b-tooltip.hover
                      title="Delete"
                      icon="trash"
                    ></b-icon
                  ></b-button>
                </b-button-group>
              </b-button-toolbar>
              <b-button-toolbar v-if="subCategory.mode == 1">
                <b-button-group size="sm">
                  <b-button
                    @click="updateSubCategory(subCategory)"
                    variant="white"
                    ><b-icon
                      variant="primary"
                      v-b-tooltip.hover
                      title="Save"
                      icon="check2"
                    ></b-icon
                  ></b-button>

                  <b-button
                    @click="subCategory.mode = subCategory.mode ^ 1"
                    variant="white"
                    ><b-icon
                      variant="danger"
                      v-b-tooltip.hover
                      title="Cancel"
                      icon="x"
                    ></b-icon
                  ></b-button>
                </b-button-group>
              </b-button-toolbar>
            </b-col>
          </b-row>
        </li>
      </div>
      <b-row v-if="admin">
        <b-col cols="11">
          <b-form class="mt-2">
            <b-form-group @submit.prevent="createNewSubCateg">
              <b-form-input
                v-model="newSubCategory"
                placeholder="Create new category"
              >
              </b-form-input>
            </b-form-group>
            <b-button @click="createNewSubCateg" variant="primary"
              >Create</b-button
            >
          </b-form>
        </b-col>
      </b-row>
    </ul>
    <!-- sub category list end -->

    <!-- sub sub category list start -->
    <ul v-if="this.sidebarList == 'subSubCategory'">
      <div
        v-for="subSubCategory in subSubCategoryList"
        :key="subSubCategory.id"
        class="mt-2"
      >
        <li
          v-if="searchParameter.subCategoryId == subSubCategory.SubCategoryId"
          class="mt-2"
        >
          <b-row>
            <div :class="{ 'col-12': !admin, 'col-7': admin }">
              <a
                v-if="subSubCategory.mode == 0"
                variant="white"
                block
                @click="subSubCategorySelect(subSubCategory)"
              >
                <small>{{ subSubCategory.name }}</small>
                <b-icon
                  variant="primary"
                  icon="triangle-fill"
                  scale="0.5"
                  rotate="90"
                ></b-icon>
              </a>
              <b-form-group
                @submit.prevent="updateSubSubCategory(subSubCategory)"
              >
                <b-form-input
                  v-if="subSubCategory.mode == 1 && admin"
                  size="sm"
                  v-model="subSubCategory.name"
                  placeholder="Category Name"
                ></b-form-input>
              </b-form-group>
            </div>
            <b-col v-if="admin" cols="5">
              <b-button-toolbar v-if="subSubCategory.mode == 0">
                <b-button-group size="sm">
                  <b-button
                    @click="subSubCategory.mode = subSubCategory.mode ^ 1"
                    variant="white"
                    ><b-icon
                      variant="primary"
                      v-b-tooltip.hover
                      title="Edit"
                      icon="pen"
                    ></b-icon
                  ></b-button>

                  <b-button
                    @click="deleteSubSubCategory(subSubCategory)"
                    variant="white"
                    ><b-icon
                      variant="danger"
                      v-b-tooltip.hover
                      title="Delete"
                      icon="trash"
                    ></b-icon
                  ></b-button>
                </b-button-group>
              </b-button-toolbar>
              <b-button-toolbar v-if="subSubCategory.mode == 1">
                <b-button-group size="sm">
                  <b-button
                    @click="updateSubSubCategory(subSubCategory)"
                    variant="white"
                    ><b-icon
                      variant="primary"
                      v-b-tooltip.hover
                      title="Save"
                      icon="check2"
                    ></b-icon
                  ></b-button>

                  <b-button
                    @click="subSubCategory.mode = subSubCategory.mode ^ 1"
                    variant="white"
                    ><b-icon
                      variant="danger"
                      v-b-tooltip.hover
                      title="Cancel"
                      icon="x"
                    ></b-icon
                  ></b-button>
                </b-button-group>
              </b-button-toolbar>
            </b-col>
          </b-row>
        </li>
      </div>
      <b-row v-if="admin">
        <b-col cols="11">
          <b-form class="mt-2">
            <b-form-group @submit.prevent="createNewSubSubCateg">
              <b-form-input
                v-model="newSubSubCategory"
                placeholder="Create new category"
              >
              </b-form-input>
            </b-form-group>
            <b-button @click="createNewSubSubCateg" variant="primary"
              >Create</b-button
            >
          </b-form>
        </b-col>
      </b-row>
    </ul>
    <!-- sub sub category list end -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import CategoryService from "@/services/CategoryService.js";
import SubCategoryService from "@/services/SubCategoryService.js";
import SubSubCategoryService from "@/services/SubSubCategoryService.js";

export default {
  name: "ProductCategorySidebar",
  data() {
    return {
      newCategory: null,
      newSubCategory: null,
      newSubSubCategory: null,
      sidebarList: null,
      categoryList: this.$store.state.Products.Category.categoryList,
      subCategoryList: this.$store.state.Products.Category.subCategoryList,
      subSubCategoryList: this.$store.state.Products.Category
        .subSubCategoryList,
    };
  },
  computed: {
    ...mapState({
      admin: (state) => state.admin,
      searchParameter: (state) => state.Products.searchParameter,
    }),
  },

  async mounted() {
    if (this.searchParameter.subSubCategoryId != 0) {
      this.sidebarList = "none";
    } else if (this.searchParameter.subCategoryId != 0) {
      this.subSubCategoryList = (
        await SubSubCategoryService.getSubSubCategoryList()
      ).data;
      this.sidebarList = "subSubCategory";
      this.subSubCategoryList = this.subSubCategoryList.map((obj) => ({
        ...obj,
        mode: 0,
      }));
    } else if (this.searchParameter.categoryId != 0) {
      this.subCategoryList = (
        await SubCategoryService.getSubCategoryList()
      ).data;
      this.sidebarList = "subCategory";
      this.subCategoryList = this.subCategoryList.map((obj) => ({
        ...obj,
        mode: 0,
      }));
    } else {
      this.categoryList = (await CategoryService.getCategoryList()).data;
      this.sidebarList = "category";
      this.categoryList = this.categoryList.map((obj) => ({
        ...obj,
        mode: 0,
      }));
    }
  },
  methods: {
    categorySelect(category) {
      const route = "/products/" + category.name;
      window.location.replace(route);
    },
    subCategorySelect(subCategory) {
      const category = this.categoryList.find(
        (obj) => obj.id == subCategory.CategoryId
      );
      const route = "/products/" + category.name + "/" + subCategory.name;
      window.location.replace(route);
    },
    subSubCategorySelect(subSubCategory) {
      const subCategory = this.subCategoryList.find(
        (obj) => obj.id == subSubCategory.SubCategoryId
      );
      const category = this.categoryList.find(
        (obj) => obj.id == subCategory.CategoryId
      );
      const route =
        "/products/" +
        category.name +
        "/" +
        subCategory.name +
        "/" +
        subSubCategory.name;
      window.location.replace(route);
    },

    async createNewCateg() {
      try {
        const newCategory = (
          await CategoryService.createCategory({ name: this.newCategory })
        ).data;
        console.log("new category", newCategory);
        this.categoryList = await this.$store.dispatch(
          "Products/Category/setFullCategoryList"
        );
        window.location.reload();
      } catch (err) {
        console.log("error create categ", err);
      }
    },
    async createNewSubCateg() {
      if (this.searchParameter.categoryId != 0) {
        try {
          const newSubCategory = (
            await SubCategoryService.createSubCategory({
              name: this.newSubCategory,
              CategoryId: this.searchParameter.categoryId,
            })
          ).data;

          console.log("new sub category", newSubCategory);
          this.categoryList = await this.$store.dispatch(
            "Products/Category/setFullCategoryList"
          );
          window.location.reload();
        } catch (err) {
          console.log("error create sub categ", err);
        }
      } else {
        console.log("error create sub categ", this.searchParameter.categoryId);
      }
    },
    async createNewSubSubCateg() {
      if (this.searchParameter.subCategoryId) {
        try {
          const newSubSubCategory = (
            await SubSubCategoryService.createSubSubCategory({
              name: this.newSubCategory,
              SubCategoryId: this.searchParameter.subCategoryId,
            })
          ).data;
          console.log("new sub sub category", newSubSubCategory);
          this.categoryList = await this.$store.dispatch(
            "Products/Category/setFullCategoryList"
          );
          window.location.reload();
        } catch (err) {
          console.log("error create sub sub categ", err);
        }
      } else {
        console.log(
          "error create sub sub categ",
          this.searchParameter.subCategoryId
        );
      }
    },
    async updateCategory(category) {
      const index = this.categoryList.findIndex(
        (categ) => categ.id === category.id
      );
      this.categoryList[index].mode ^= 1;
      const newCategory = this.categoryList[index];
      delete newCategory.mode;
      try {
        await CategoryService.updateCategory(newCategory);
        this.categoryList = await this.$store.dispatch(
          "Products/Category/setFullCategoryList"
        );
        window.location.reload();
      } catch (error) {
        console.log("error update categ", error);
      }
    },
    async updateSubCategory(subCategory) {
      const index = this.subCategoryList.findIndex(
        (subCateg) => subCateg.id === subCategory.id
      );
      this.subCategoryList[index].mode ^= 1;
      const newSubCategory = this.subCategoryList[index];
      delete newSubCategory.mode;
      try {
        await SubCategoryService.updateSubCategory(newSubCategory);
        this.categoryList = await this.$store.dispatch(
          "Products/Category/setFullCategoryList"
        );
        window.location.reload();
      } catch (error) {
        console.log("error update sub categ", error);
      }
    },
    async updateSubSubCategory(subSubCategory) {
      const index = this.subSubCategoryList.findIndex(
        (subSubCateg) => subSubCateg.id === subSubCategory.id
      );
      this.subSubCategoryList[index].mode ^= 1;
      const newSubSubCategory = this.subSubCategoryList[index];
      delete newSubSubCategory.mode;
      try {
        await SubSubCategoryService.updateSubSubCategory(newSubSubCategory);
        this.categoryList = await this.$store.dispatch(
          "Products/Category/setFullCategoryList"
        );
        window.location.reload();
      } catch (error) {
        console.log("error update sub sub categ", error);
      }
    },
    async deleteCategory(category) {
      try {
        await CategoryService.deleteCategory(category.id);
        this.categoryList = await this.$store.dispatch(
          "Products/Category/setFullCategoryList"
        );
        window.location.reload();
      } catch (error) {
        console.log("error delete categ", error);
      }
    },
    async deleteSubCategory(subCategory) {
      try {
        await SubCategoryService.deleteSubCategory(subCategory.id);
        this.categoryList = await this.$store.dispatch(
          "Products/Category/setFullCategoryList"
        );
        window.location.reload();
      } catch (error) {
        console.log("error delete sub categ", error);
      }
    },
    async deleteSubSubCategory(subSubCategory) {
      try {
        await SubSubCategoryService.deleteSubSubCategory(subSubCategory.id);
        this.categoryList = await this.$store.dispatch(
          "Products/Category/setFullCategoryList"
        );
        window.location.reload();
      } catch (error) {
        console.log("error delete sub sub categ", error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.productCategories {
  // overflow-block: hidden;
  float: left;
  padding: 10px 0px 10px 7px;
}
.productCategories ul li {
  list-style: none;
}
.productCategories ul li a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}
.productCategories ul li a:hover {
  font-weight: 500;
  cursor: pointer;
}

</style>
