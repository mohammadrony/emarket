<template>
  <div>
    <ATopHeader></ATopHeader>
    <b-row>
      <b-col cols="3">
        <ProductCategorySidebar />
      </b-col>
      <b-col cols="8">
        <b-row>
          <b-col cols="5">
            <b-form-input
              size="md"
              class="mr-sm-2"
              placeholder="Search here..."
              v-model="searchText"
              @keyup.enter="search"
            >
            </b-form-input>
          </b-col>
          <b-col cols="4">
            <b-pagination
              v-if="this.apCount != 0"
              class=""
              size="md"
              v-model="currentPage"
              :total-rows="apCount"
              :per-page="perPage"
              @input="paginate(currentPage)"
            ></b-pagination>
          </b-col>
          <b-col cols="3">
            <b-button
              to="/admin/add-product"
              block
              size="md"
              class="mb-3"
              variant="primary"
            >
              Add Product
            </b-button>
          </b-col>
        </b-row>

        <div class="table-responsive">
          <hr />
          <div v-if="this.apCount != 0">
            <b-row>
              <b-col> </b-col>
              <b-col>
                <strong>Name</strong>
              </b-col>
              <b-col>
                <strong>Price</strong>
              </b-col>
              <b-col>
                <strong>Modify</strong>
              </b-col>
            </b-row>
            <hr />
          </div>

          <div v-for="product in displayProducts" :key="product.id">
            <b-row>
              <b-col>
                <img
                  class="product-image"
                  :src="product.image1"
                  alt="No Image"
                />
              </b-col>
              <b-col>
                {{ product.title }}
              </b-col>
              <b-col> {{ product.price }}৳ </b-col>
              <b-col>
                <div>
                  <b-button variant="primary" @click="editProduct(product)"
                    >Edit</b-button
                  >
                  <b-button class="ml-4" @click="deleteProduct(product)"
                    >Delete</b-button
                  >
                </div>
              </b-col>
            </b-row>
            <hr />
          </div>
        </div>
        <div class="m-4 d-flex justify-content-center" v-if="this.apCount == 0">
          <h3>Nothing found for this keyword.</h3>
        </div>
        <b-pagination
          v-if="this.apCount != 0"
          class=""
          size="lg"
          v-model="currentPage"
          :total-rows="apCount"
          :per-page="perPage"
          @input="paginate(currentPage)"
        ></b-pagination>
        <div
          class="m-4 d-flex justify-content-center"
          v-if="paginate.rows == 0"
        >
          <h3>search again.</h3>
        </div>
        <div class="m-4 d-flex justify-content-center" v-if="showSpinner">
          <b-spinner variant="primary"></b-spinner>
        </div>
      </b-col>
    </b-row>

    <!-- create or edit product modal -->
    <div>
      <b-modal
        id="product-details"
        size="xl"
        hide-footer
        title="Product Details"
      >
        <b-container>
          <b-row>
            <b-col cols="7">
              <div class="form-group">
                <b-form-input
                  required
                  :rules="[required]"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  placeholder="Products name"
                  v-model="properties.title"
                >
                </b-form-input>
              </div>
              <div class="form-group">
                <vue-editor
                  required
                  :rules="[required]"
                  v-model="properties.description"
                >
                </vue-editor>
              </div>
            </b-col>
            <b-col cols="5">
              <div class="form-group">
                <b-form-input
                  required
                  :rules="[required]"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  placeholder="Add price"
                  v-model="properties.price"
                >
                </b-form-input>
              </div>
              <b-row class="mb-3">
                <b-col>
                  <b-form-input
                    required
                    :rules="[required]"
                    v-model="properties.CategoryId"
                    placeholder="Catagory"
                  >
                  </b-form-input>
                </b-col>
                <b-col>
                  <b-form-input
                    required
                    :rules="[required]"
                    v-model="properties.SubCategoryId"
                    placeholder="Sub Catagory"
                  >
                  </b-form-input>
                </b-col>
              </b-row>

              <template>
                <b-form-file v-model="properties.imageFile" class="mt-3" plain></b-form-file>
              </template>

              <div class="form-group d-flex mt-1">
                <img width="80px" :src="properties.imageFile" />
              </div>
            </b-col>
          </b-row>
          <div class="form-group">
            <div
              class="danger-alert d-flex justify-content-center mb-3"
              v-if="error"
            >
              {{ error }}
            </div>
            <b-button
              v-if="mode == 'create'"
              @click="createProduct"
              block
              variant="primary"
            >
              Create Product
            </b-button>

            <b-button
              v-if="mode == 'edit'"
              @click="saveChanges"
              block
              variant="primary"
            >
              Apply Changes
            </b-button>
          </div>
        </b-container>
      </b-modal>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ProductsService from "@/services/ProductsService";
import ATopHeader from "@/components/Admins/ATopHeader.vue";
import ProductCategorySidebar from "@/components/Products/ProductCategorySidebar.vue";
import { VueEditor } from "vue2-editor";

export default {
  name: "AProducts",
  components: {
    ATopHeader,
    VueEditor,
    ProductCategorySidebar,
  },
  data() {
    return {
      product: {},
      allProducts: null,
      showProducts: {},
      searchText: "",
      currentPage: 1,
      showSpinner: null,
      properties: {
        title: "",
        description: "",
        price: 0,
        tags: "",
        imageFile: null,
        CategoryId: 0,
        SubCategoryId: 0,
      },
      fields: ["Image", "Name", "Price (in taka)", "Edit/Delete"],
      products: {},
      mode: "",
      activeItem: "",
      error: null,
      required: (value) => !!value || "Required.",
    };
  },
  computed: {
    ...mapState({
      allProduct: (state) => state.Products.allProduct,
      apCount: (state) => state.Products.apCount,
      displayProducts: (state) => state.Products.displayProducts,
      perPage: (state) => state.Products.perPage,
      displayProduct: (state) => state.Products.displayProduct,
    }),
  },

  async mounted() {
    this.$store.dispatch("Products/setAllProduct");
  },

  methods: {
    addProductModal() {
      (this.mode = "create"), this.resetProductProperties();
      this.$bvModal.show("product-details");
    },

    async createProduct() {
      this.error = null;

      const requiredFieldsFilledIn = Object.keys(this.properties).every(
        (key) => !!this.properties[key]
      );

      if (!requiredFieldsFilledIn) {
        this.error = "Please fill in all the required fields.";
        return;
      }

      try {
        await ProductsService.createProduct(this.properties);
        this.$bvModal.hide("product-details");
        this.$bvToast.toast("Product Added Successfully", {
          title: "Update",
          variant: "dark",
          toaster: "b-toaster-top-center",
          noCloseButton: true,
          solid: true,
        });
      } catch (err) {
        console.log(err);
      }
      this.$bvModal.hide("product-details");
    },

    editProduct(properties) {
      this.mode = "edit";
      this.properties = properties;
      this.$bvModal.show("product-details");
    },

    async saveChanges() {
      this.error = null;
      const requiredFieldsFilledIn = Object.keys(this.properties).every(
        (key) => !!this.properties[key]
      );

      if (!requiredFieldsFilledIn) {
        this.error = "Please fill in all the required fields.";
        return;
      }

      try {
        await ProductsService.updateProduct(this.properties);
        this.$bvModal.hide("product-details");
        this.$bvToast.toast("Product Updated Successfully", {
          title: "Update",
          variant: "dark",
          toaster: "b-toaster-top-center",
          noCloseButton: true,
          solid: true,
        });
      } catch (err) {
        console.log(err);
      }
      this.$bvModal.hide("product-details");
    },

    async deleteProduct(properties) {
      try {
        await ProductsService.deleteProduct(properties.id);
        this.$bvToast.toast("Product Deleted Sucessfully", {
          title: "Update",
          variant: "dark",
          toaster: "b-toaster-top-center",
          noCloseButton: true,
          solid: true,
        });
      } catch (err) {
        console.log(err);
      }
    },

    resetProductProperties() {
      this.properties.title = "";
      this.properties.description = "";
      this.properties.price = 0;
      this.properties.tags = "";
      this.properties.imageFile = null;
      this.properties.CategoryId = 0;
      this.properties.SubCategoryId = 0;
    },
    search() {
      this.$store.dispatch("Products/searchProduct", { text: this.searchText });
    },
    // setDisplayProduct(displayProduct) {
    //   this.$store.dispatch("setDisplayProduct", displayProduct)
    // },
    paginate(currentPage) {
      this.$store.dispatch("Products/paginate", currentPage);
    },
  },
};
</script>

<style lang="scss" scoped>
.danger-alert {
  color: red;
}

.product-image {
  width: 66%;
  margin: 0, auto;
}

.table-header {
  background: cornflowerblue;
  padding: 0;
  margin: 0;
}
</style>
