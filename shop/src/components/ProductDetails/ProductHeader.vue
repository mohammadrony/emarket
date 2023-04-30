<template>
  <div>
    <b-navbar size="sm" toggleable="md" type="primary" variant="white">
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
          <b-nav-item :to="`/products/${categoryName}`">
            {{ categoryName }}
            <b-icon class="ml-2" scale=".7" icon="chevron-right" />
          </b-nav-item>
          <b-nav-item :to="`/products/${categoryName}/${subCategoryName}`">
            {{ subCategoryName }}
            <b-icon class="ml-2" scale=".7" icon="chevron-right" />
          </b-nav-item>
          <b-nav-item
            :to="`/products/${categoryName}/${subCategoryName}/${subSubCategoryName}`"
          >
            {{ subSubCategoryName }}
            <b-icon class="ml-2" scale=".7" icon="chevron-right" />
          </b-nav-item>
          <b-nav-item to="#">
            {{ productName }}
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-button v-if="admin" @click="deleteProduct" variant="danger">
            <b-icon icon="trash" />
            Delete Item
          </b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <hr class="m-0" />
  </div>
</template>

<script>
import WishlistService from "@/services/WishlistService.js";
import ProductsService from "@/services/ProductsService.js";
export default {
  name: "ProductHeader",
  data() {
    return {
      admin: false,
      productId: 0,
      categoryName: "",
      subCategoryName: "",
      subSubCategoryName: "",
    };
  },
  props: {
    productName: String,
    categoryId: Number,
    subCategoryId: Number,
    subSubCategoryId: Number,
  },
  components: {},
  computed: {},
  async mounted() {
    this.admin = this.$store.state.CurrentUser.admin;
    this.productId = this.$route.params.productId;
    if (this.categoryId && this.subCategoryId && this.subSubCategoryId) {
      this.categoryName = await this.$store.dispatch(
        "Category/getCategoryName",
        this.categoryId
      );
      this.subCategoryName = await this.$store.dispatch(
        "Category/getSubCategoryName",
        this.subCategoryId
      );
      this.subSubCategoryName = await this.$store.dispatch(
        "Category/getSubSubCategoryName",
        this.subSubCategoryId
      );
    }
  },
  methods: {
    async deleteProduct() {
      await WishlistService.deleteWishItemByProduct(this.productId);
      await ProductsService.deleteProduct(this.productId);
      await this.$store.dispatch("Products/setAllBackupProducts");
      await this.$store.dispatch("Wishlist/setWishlist");
      this.$router.push({ path: "/products" });
    },
  },
};
</script>

<style lang="scss" scoped></style>
