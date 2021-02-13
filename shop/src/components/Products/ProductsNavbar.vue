<template>
  <div>
    <b-row>
      <b-col class="ml-2">
        <b-navbar size="sm" toggleable="md" type="primary" variant="white">
          <b-navbar-brand href="#" @click="productHome">
            <b-icon variant="primary" icon="house-door-fill"></b-icon>
            <b-icon class="ml-2" scale=".7" icon="chevron-right"></b-icon>
          </b-navbar-brand>
          <b-navbar-toggle target="nav-products-collapse">
            <b-button-toolbar>
              <b-button-group>
                <b-button variant="outline-dark" class="px-3 py-2">
                  <b-icon scale="1.6" icon="list"></b-icon>
                </b-button>
              </b-button-group>
            </b-button-toolbar>
          </b-navbar-toggle>
          <b-collapse id="nav-products-collapse" is-nav>
            <b-navbar-nav class="mr-auto">
              <b-nav-item @click="setCategory" v-if="category != null">
                {{ category.name }}
                <b-icon class="ml-2" scale=".7" icon="chevron-right"></b-icon>
              </b-nav-item>
              <b-nav-item @click="setSubCategory" v-if="subCategory != null">
                {{ subCategory.name }}
                <b-icon class="ml-2" scale=".7" icon="chevron-right"></b-icon>
              </b-nav-item>
              <b-nav-item
                @click="setSubSubCategory"
                v-if="subSubCategory != null"
              >
                {{ subSubCategory.name }}
                <b-icon class="ml-2" scale=".7" icon="chevron-right"></b-icon>
              </b-nav-item>
              <b-button
                :to="{ name: 'add-product' }"
                v-if="admin"
                class="mr-auto"
                size="md"
                variant="outline-dark"
              >
                <b-icon class="mr-2" icon="plus-square"></b-icon>
                Add New Product
              </b-button>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-form @submit.prevent="search">
                <b-form-input
                  v-model="searchText"
                  size="sm"
                  class="mr-sm-2"
                  placeholder="Search here"
                ></b-form-input>
                <b-button @click="search" variant="white">
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
      admin: null,
      searchText: null,
      category: null,
      subCategory: null,
      subSubCategory: null
    };
  },
  async mounted() {
    this.admin = this.$store.state.CurrentUser.admin;
    const route = this.$store.state.route;
    if (route.query.q) this.searchText = route.query.q;

    if (route.params.subSubCategory) {
      this.subSubCategory = (
        await SubSubCategoryService.getSubSubCategoryByName(
          route.params.subSubCategory
        )
      ).data;
    }
    if (route.params.subCategory) {
      this.subCategory = (
        await SubCategoryService.getSubCategoryByName(route.params.subCategory)
      ).data;
    }
    if (route.params.category) {
      this.category = (
        await CategoryService.getCategoryByName(route.params.category)
      ).data;
    }
  },
  methods: {
    search() {
      if (this.searchText) {
        var newRoute = this.$store.state.route.path;
        console.log(newRoute);
        if (this.searchText != "") {
          newRoute += "?q=" + this.searchText;
        }
        window.location.replace(newRoute);
      }
    },
    async productHome() {
      await this.$store.dispatch("Products/resetSearchParameter");
      window.location.replace("/products");
    },
    async setCategory() {
      const route = "/products/" + this.category.name;
      window.location.replace(route);
    },
    async setSubCategory() {
      const route =
        "/products/" + this.category.name + "/" + this.subCategory.name;
      window.location.replace(route);
    },
    async setSubSubCategory() {
      const route =
        "/products/" +
        this.category.name +
        "/" +
        this.subCategory.name +
        "/" +
        this.subSubCategory.name;
      window.location.replace(route);
    }
  }
};
</script>

<style lang="scss" scoped></style>
