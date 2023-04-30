<template>
  <div>
    <b-row>
      <b-col class="ml-2">
        <b-navbar toggleable="lg" type="primary" variant="white">
          <b-navbar-brand href="#" to="/products">
            <b-icon variant="primary" icon="house-door-fill" />
            <b-icon class="ml-2" scale=".7" icon="chevron-right" />
          </b-navbar-brand>
          <b-navbar-toggle target="nav-products-collapse">
            <b-button-toolbar>
              <b-button-group>
                <b-button variant="outline-dark" class="px-3 py-2">
                  <b-icon scale="1.6" icon="list" />
                </b-button>
              </b-button-group>
            </b-button-toolbar>
          </b-navbar-toggle>
          <b-collapse id="nav-products-collapse" is-nav>
            <b-navbar-nav class="mr-auto">
              <b-nav-item
                class="mr-auto"
                :to="`/products/${category.name}`"
                v-if="category"
              >
                {{ category.name }}
                <b-icon class="ml-2" scale=".7" icon="chevron-right" />
              </b-nav-item>
              <b-nav-item
                class="mr-auto"
                :to="`/products/${category.name}/${subCategory.name}`"
                v-if="subCategory"
              >
                {{ subCategory.name }}
                <b-icon class="ml-2" scale=".7" icon="chevron-right" />
              </b-nav-item>
              <b-nav-item
                class="mr-auto"
                :to="`/products/${category.name}/${subCategory.name}/${subSubCategory.name}`"
                v-if="subSubCategory"
              >
                {{ subSubCategory.name }}
                <b-icon class="ml-2" scale=".7" icon="chevron-right" />
              </b-nav-item>
              <b-button
                class="mr-auto"
                to="/admin/add-product"
                v-if="admin"
                size="md"
                variant="outline-dark"
              >
                <b-icon class="mr-2" scale="0.8" icon="plus-square" />
                Add Product
              </b-button>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-form @submit.stop.prevent="search">
                <b-form-input
                  v-model="searchText"
                  size="sm"
                  placeholder="Search here"
                />
                <b-button type="submit" variant="white">
                  <b-icon icon="search"></b-icon
                ></b-button>
              </b-nav-form>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
        <hr class="m-0" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CategoryService from "@/services/CategoryService.js";
import SubCategoryService from "@/services/SubCategoryService.js";
import SubSubCategoryService from "@/services/SubSubCategoryService.js";
export default {
  name: "ProductsNavbar",
  components: {},
  data() {
    return {
      admin: false,
      searchText: "",
      category: "",
      subCategory: "",
      subSubCategory: "",
    };
  },
  async mounted() {
    this.admin = this.$store.state.CurrentUser.admin;
    if (this.$route.query.q) this.searchText = this.$route.query.q;

    if (this.$route.params.subSubCategory) {
      this.subSubCategory = (
        await SubSubCategoryService.getSubSubCategoryByName(
          this.$route.params.subSubCategory
        )
      ).data;
    }
    if (this.$route.params.subCategory) {
      this.subCategory = (
        await SubCategoryService.getSubCategoryByName(
          this.$route.params.subCategory
        )
      ).data;
    }
    if (this.$route.params.category) {
      this.category = (
        await CategoryService.getCategoryByName(this.$route.params.category)
      ).data;
    }
  },
  methods: {
    search() {
      if (this.searchText) {
        this.$router.push({
          path: `${this.$route.path}?q=${this.searchText}`,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
