<template>
  <div>
    <ATopHeader />
    <b-container>
      <b-card>
        <b-navbar text-variant="white" variant="info">
          <b-navbar-brand style="color: #fff">Add Product</b-navbar-brand>
        </b-navbar>
        <b-form
          @reset="resetProduct"
          @submit.stop.prevent="createNewProduct"
          class="mt-3"
        >
          <b-row>
            <b-col>
              <b-form-group
                id="input-group-title"
                label="Product Title"
                label-for="input-title"
              >
                <b-form-input
                  id="input-title"
                  v-model="product.title"
                  placeholder="Enter Product Name"
                  required
                >
                </b-form-input>
              </b-form-group>
              <b-row>
                <b-col>
                  <b-form-group
                    id="input-group-amount"
                    label="Price"
                    label-for="input-amount"
                  >
                    <b-form-input
                      id="input-amount"
                      v-model="product.amount"
                      placeholder="Price"
                      required
                    >
                    </b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    id="input-group-currency"
                    label="Currency"
                    label-for="input-currency"
                  >
                    <b-form-input
                      id="input-currency"
                      v-model="product.currency"
                      readonly
                      required
                    >
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-form-group
                id="input-group-subtitle"
                label="Short Overview"
                label-for="input-subtitle"
              >
                <b-form-textarea
                  id="input-subtitle"
                  v-model="product.subtitle"
                  placeholder="Short Overview"
                  rows="6"
                  max-rows="10"
                  required
                >
                </b-form-textarea>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-images"
                label="Product Images"
                label-for="input-images"
              >
                <b-form-file
                  id="input-images"
                  placeholder="Upto 10 image"
                  required
                  multiple
                  @change="onFileChange"
                />
              </b-form-group>
              <b-alert variant="warning" class="mt-2" :show="imageAlert">{{
                errorCountImage
              }}</b-alert>
              <div id="preview">
                <b-row class="mt-2">
                  <b-col cols="3" v-for="(img, index) in dispImg" :key="index"
                    >{{ index + 1 }} <b-img :src="img"
                  /></b-col>
                </b-row>
              </div>
              <b-form-group class="mt-2" label="Product Category">
                <b-row class="mt-2">
                  <b-col>
                    <b-dropdown
                      id="dropdown-category"
                      :text="selectedCategory"
                      variant="info"
                      block
                      menu-class="w-100"
                    >
                      <b-dropdown-item
                        v-for="category in categoryList"
                        :key="category.id"
                        @click="set_category(category)"
                      >
                        <a>{{ category.name }}</a>
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-col>
                </b-row>
                <b-row class="mt-4">
                  <b-col>
                    <b-dropdown
                      id="dropdown-subCategory"
                      :text="selectedSubCategory"
                      variant="info"
                      block
                      :disabled="product.CategoryId == 0"
                    >
                      <div
                        v-for="subCategory in subCategoryList"
                        :key="subCategory.id"
                      >
                        <b-dropdown-item
                          v-if="product.CategoryId == subCategory.CategoryId"
                          @click="set_subCategory(subCategory)"
                        >
                          {{ subCategory.name }}
                        </b-dropdown-item>
                      </div>
                    </b-dropdown>
                  </b-col>
                </b-row>
                <b-row class="mt-4">
                  <b-col>
                    <b-dropdown
                      id="dropdown-subSubCategory"
                      :text="selectedSubSubCategory"
                      variant="info"
                      block
                      :disabled="product.SubCategoryId == 0"
                    >
                      <div
                        v-for="subSubCategory in subSubCategoryList"
                        :key="subSubCategory.id"
                      >
                        <b-dropdown-item
                          v-if="
                            product.SubCategoryId ==
                              subSubCategory.SubCategoryId
                          "
                          @click="set_subSubCategory(subSubCategory)"
                        >
                          {{ subSubCategory.name }}
                        </b-dropdown-item>
                      </div>
                    </b-dropdown>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col>
              <div>
                <b-form-group
                  id="input-group-description"
                  label="Description"
                  label-for="input-description"
                >
                  <vue-editor
                    id="input-description"
                    v-model="product.description"
                  >
                  </vue-editor>
                </b-form-group>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-form-group>
              <b-alert variant="danger" class="ml-3" :show="allFieldRequired">{{
                errorFieldRequired
              }}</b-alert>
            </b-form-group>
          </b-row>
          <b-row>
            <b-col cols="7"></b-col>
            <b-col cols="5">
              <b-row>
                <b-col>
                  <b-button type="reset" variant="danger" block>Reset</b-button>
                </b-col>
                <b-col>
                  <b-button variant="primary" block type="submit"
                    >Submit</b-button
                  >
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-form>
      </b-card>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import ProductsService from "@/services/ProductsService";
import ATopHeader from "@/components/Admins/ATopHeader.vue";
import Footer from "@/components/Footer.vue";
import { VueEditor } from "vue2-editor";
export default {
  name: "AddProduct",
  components: {
    ATopHeader,
    VueEditor,
    Footer
  },
  data() {
    return {
      images: [],
      categoryList: [],
      subCategoryList: [],
      subSubCategoryList: [],
      selectedCategory: "Category",
      selectedSubCategory: "Sub Category",
      selectedSubSubCategory: "Sub Sub Category",
      backupProduct: null,
      product: {
        code: "",
        title: "",
        amount: null,
        subtitle: "",
        description: "",
        currency: "USD",
        CategoryId: 0,
        SubCategoryId: 0,
        SubSubCategoryId: 0
      },
      errorCountImage:
        "You are not allowed to add more than 10 image for this product.",
      maximumImageCount: 10,
      imageAlert: null,
      errorFieldRequired: "Please fill in all required field.",
      allFieldRequired: null,
      dispImg: []
    };
  },
  computed: {},
  async mounted() {
    this.backupProduct = this.product;
    this.categoryList = await this.$store.dispatch("Category/getCategoryList");
    this.subCategoryList = await this.$store.dispatch(
      "Category/getSubCategoryList"
    );
    this.subSubCategoryList = await this.$store.dispatch(
      "Category/getSubCategoryList"
    );
  },
  methods: {
    resetProduct() {
      this.product = this.backupProduct;
    },
    async createNewProduct() {
      var formData = new FormData();
      var fieldName;
      for (fieldName in this.product) {
        formData.append(fieldName, this.product[fieldName]);
      }
      var i;
      for (i = 0; i < this.images.length; i++) {
        if (i < this.maximumImageCount)
          formData.append("imageField", this.images[i]);
      }
      try {
        await ProductsService.createProduct(formData);
        const newProduct = (
          await this.$store.dispatch("Products/setAllBackupProduct")
        ).data;
        window.location.replace("/products/" + newProduct.id);
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    set_category(category) {
      this.selectedCategory = category.name;
      this.selectedSubCategory = "Sub Category";
      this.selectedSubSubCategory = "Sub Sub Category";
      (this.product.SubCategoryId = 0),
        (this.product.SubSubCategoryId = 0),
        (this.product.CategoryId = category.id);
    },
    set_subCategory(subCategory) {
      this.selectedSubCategory = subCategory.name;
      this.selectedSubSubCategory = "Sub Sub Category";
      this.product.SubCategoryId = subCategory.id;
      this.product.SubSubCategoryId = 0;
    },
    set_subSubCategory(subSubCategory) {
      this.selectedSubSubCategory = subSubCategory.name;
      this.product.SubSubCategoryId = subSubCategory.id;
    },
    onFileChange(event) {
      this.images = event.target.files;

      if (this.images.length > this.maximumImageCount) {
        this.imageAlert = true;
      } else {
        this.imageAlert = false;
      }
      var i;

      for (i = 0; i < this.images.length; i++) {
        if (i < this.maximumImageCount)
          this.dispImg[i] = URL.createObjectURL(this.images[i]);
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
