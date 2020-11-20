<template>
  <div class="a-products">
    <b-container>
      <b-row align-v="center">
        <b-col>
          <h3>Products Page</h3>
          <p>
            Control your products visibility from here. Any product could
            create, read, update, delete from this page.
          </p>
        </b-col>
        <b-col>
          <img src="/img/svg/products.svg" alt="" width="300" />
        </b-col>
      </b-row>
      <hr />
    </b-container>
    <b-container class="mt-4">
      <div>
        <b-container>
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
                class=""
                size="md"
                v-model="paginate.currentPage"
                :total-rows="paginate.rows"
                :per-page="paginate.perPage"
                @input="pagination(paginate.currentPage)"
              ></b-pagination>
            </b-col>
            <b-col cols="3">
              <b-button
                @click="addProductModal"
                block
                size="md"
                class="mb-3"
                variant="primary"
              >
                Add Product
              </b-button>
            </b-col>
          </b-row>
        </b-container>

        <div class="table-responsive">
          <hr />
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

          <div v-for="product in displayProducts" :key="product.id">
            <b-row>
              <b-col>
                <img
                  class="product-image"
                  :src="product.image"
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
        <div>
          <b-pagination
            class=""
            size="lg"
            v-model="paginate.currentPage"
            :total-rows="paginate.rows"
            :per-page="paginate.perPage"
            @input="pagination(paginate.currentPage)"
          ></b-pagination>
        </div>

        <div
          class="m-4 d-flex justify-content-center"
          v-if="paginate.rows == 0"
        >
          <h3>search again.</h3>
        </div>
        <div class="m-4 d-flex justify-content-center" v-if="showSpinner">
          <b-spinner variant="primary"></b-spinner>
        </div>
      </div>

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
                <div class="mb-3">
                  <b-form-input
                    required
                    :rules="[required]"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    placeholder="Add tag"
                    v-model="properties.tags"
                  >
                  </b-form-input>
                </div>
                <b-row class="mb-3">
                  <b-col>
                    <b-form-input
                      required
                      :rules="[required]"
                      v-model="properties.catagory"
                      placeholder="Catagory"
                    >
                    </b-form-input>
                  </b-col>
                  <b-col>
                    <b-form-input
                      required
                      :rules="[required]"
                      v-model="properties.subCatagory"
                      placeholder="Sub Catagory"
                    >
                    </b-form-input>
                  </b-col>
                </b-row>

                <template>
                  <b-form-input
                    required
                    :rules="[required]"
                    v-model="properties.image"
                    placeholder="Image URL"
                  ></b-form-input>
                </template>

                <div class="form-group d-flex mt-1">
                  <img width="80px" :src="properties.image" />
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

      <!-- Delete Confirmation Modal -->
      <!-- <b-container>
                <b-modal id="deleteConfirmModal" hide-footer size="md" centered title="Are you sure?">

                <div class="justify-content-center m-6">
                    <b-button size="md" class="mr-3" variant="danger" @click="deleteConfirmed(product)">Yes, delete it!</b-button>
                    <b-button size="md" variant="outline-primary" @click="notDeleteConfirmed(product)">Cancel</b-button>
                </div>
                
                </b-modal>
            </b-container> -->
    </b-container>
  </div>
</template>
<script>
import ProductsService from "../../services/ProductsService";
import { VueEditor } from "vue2-editor";

export default {
  name: "AProducts",
  components: {
    VueEditor
  },
  data() {
    return {
      // imported from products
      // to display all product as a table and search product
      product: {},
      allProducts: null,
      displayProducts: null,
      showProducts: {},
      searchText: "",
      paginate: {
        currentPage: 1,
        perPage: 15,
        rows: 1
      },

      // this variables was in here
      // working on the modal
      showSpinner: null,
      properties: {
        title: "",
        description: "",
        price: 0,
        tags: "",
        image: "",
        catagory: "",
        subCatagory: ""
      },
      fields: ["Image", "Name", "Price (in taka)", "Edit/Delete"],
      products: {},
      mode: "",
      activeItem: "",
      error: null,
      required: value => !!value || "Required."
    };
  },

  async mounted() {
    this.showSpinner = true;
    this.allProducts = (await ProductsService.getAllProducts()).data;
    this.showProducts = this.allProducts;
    this.paginate.rows = this.showProducts.length;
    this.displayProducts = this.allProducts.slice(0, this.paginate.perPage);
    this.showSpinner = false;
  },

  methods: {
    addProductModal() {
      (this.mode = "create"), this.resetProductProperties();
      this.$bvModal.show("product-details");
    },

    async createProduct() {
      this.error = null;

      const requiredFieldsFilledIn = Object.keys(this.properties).every(
        key => !!this.properties[key]
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
          solid: true
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
        key => !!this.properties[key]
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
          solid: true
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
          solid: true
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
      this.properties.image = "";
      this.properties.catagory = "";
      this.properties.subCatagory = "";
    },
    search() {
      this.showSpinner = true;
      const values = this.allProducts.filter(val => {
        return (
          val.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
          val.description
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          // val.price.toLowerCase().includes(this.searchText.toLowerCase()) ||
          val.tags.toLowerCase().includes(this.searchText.toLowerCase()) ||
          val.catagory.toLowerCase().includes(this.searchText.toLowerCase()) ||
          val.subCatagory.toLowerCase().includes(this.searchText.toLowerCase())
        );
      });
      console.log(values);
      this.displayProducts = values;
      this.showSpinner = false;
      this.updatePagination(values, 1);
    },
    updatePagination(showProducts, currentPage) {
      this.showProducts = showProducts;
      this.paginate.rows = showProducts.length;
      this.pagination(currentPage);
    },
    pagination(currentPage) {
      this.paginate.currentPage = currentPage;
      const start = (currentPage - 1) * this.paginate.perPage;
      this.displayProducts = this.showProducts.slice(
        start,
        start + this.paginate.perPage
      );
    }
  }
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
