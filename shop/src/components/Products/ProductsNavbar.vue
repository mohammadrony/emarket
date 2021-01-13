<template>
  <div>
    <b-row>
      <b-col class="ml-2">
        <b-navbar size="sm" toggleable="md" type="primary" variant="white">
          <b-navbar-brand href="#" @click="productHome">
            <b-icon variant="primary" icon="house-door-fill"></b-icon>
            <b-icon class="ml-2" scale=".7" icon="chevron-right"></b-icon>
          </b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
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
      route: null,
      category: null,
      subCategory: null,
      subSubCategory: null,
    };
  },
  async mounted() {
    const route = this.$store.state.route;
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
    },
  },
};
</script>

<style lang="sass" scoped>
</style>