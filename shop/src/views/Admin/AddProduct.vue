<template>
  <div>
    <ATopHeader />

    <b-container class="mt-4">
      <b-card>
        <b-navbar text-variant="white" variant="info">
          <b-navbar-brand style="color: #fff">Add Product</b-navbar-brand>
        </b-navbar>
        <b-form
          @reset="resetProduct"
          @submit.stop.prevent="createNewProduct"
          class="mt-3"
        >
          <b-row cols="1" cols-md="2">
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
                />
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
                    />
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
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <div>
                <b-form-group
                  id="input-group-overview"
                  label="Overview"
                  label-for="input-overview"
                >
                  <vue-editor
                    @keyup="
                      productSubTitleAlert ? (productSubTitleAlert = false) : 1
                    "
                    required
                    id="input-overview"
                    v-model="product.subtitle"
                  >
                  </vue-editor>
                </b-form-group>
              </div>
            </b-col>
            <b-col>
              <b-form-group label="Product Category">
                <b-row>
                  <b-col>
                    <b-dropdown
                      id="dropdown-category"
                      :text="selectedCategory"
                      variant="warning"
                      block
                      menu-class="w-100"
                    >
                      <b-dropdown-item
                        v-for="category in categoryList"
                        :key="category.id"
                        @click="set_category(category)"
                      >
                        {{ category.name }}
                      </b-dropdown-item>
                      <b-dropdown-form @submit.stop.prevent="createNewCateg">
                        <b-row>
                          <b-col>
                            <b-form-input
                              required
                              v-model="newCategoryName"
                              placeholder="Category Name"
                            />
                          </b-col>
                          <b-col>
                            <b-button type="submit" block variant="warning">
                              Create
                            </b-button>
                          </b-col>
                        </b-row>
                      </b-dropdown-form>
                    </b-dropdown>
                  </b-col>
                </b-row>
                <b-row class="mt-4">
                  <b-col>
                    <b-dropdown
                      id="dropdown-subCategory"
                      :text="selectedSubCategory"
                      variant="warning"
                      block
                      menu-class="w-100"
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
                      <b-dropdown-form @submit.stop.prevent="createNewSubCateg">
                        <b-row>
                          <b-col>
                            <b-form-input
                              required
                              v-model="newSubCategoryName"
                              placeholder="Category Name"
                            />
                          </b-col>
                          <b-col>
                            <b-button type="submit" block variant="warning">
                              Create
                            </b-button>
                          </b-col>
                        </b-row>
                      </b-dropdown-form>
                    </b-dropdown>
                  </b-col>
                </b-row>
                <b-row class="mt-4">
                  <b-col>
                    <b-dropdown
                      id="dropdown-subSubCategory"
                      :text="selectedSubSubCategory"
                      variant="warning"
                      block
                      menu-class="w-100"
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
                      <b-dropdown-form
                        @submit.stop.prevent="createNewSubSubCateg"
                      >
                        <b-row>
                          <b-col>
                            <b-form-input
                              required
                              v-model="newSubSubCategoryName"
                              placeholder="Category Name"
                            />
                          </b-col>
                          <b-col>
                            <b-button type="submit" block variant="warning">
                              Create
                            </b-button>
                          </b-col>
                        </b-row>
                      </b-dropdown-form>
                    </b-dropdown>
                  </b-col>
                </b-row>
              </b-form-group>
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
                  @change="selectedImage"
                />
              </b-form-group>
              <b-alert variant="warning" class="mt-2" :show="imageAlert">
                {{ errorCountImage }}
              </b-alert>
              <div id="preview">
                <b-row class="mt-2">
                  <b-col cols="3" v-for="(img, index) in dispImg" :key="index">
                    {{ index + 1 }}
                    <b-img :src="img" width="100%" />
                  </b-col>
                </b-row>
              </div>
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
                    @keyup="
                      productDescriptionAlert
                        ? (productDescriptionAlert = false)
                        : 1
                    "
                    required
                    id="input-description"
                    v-model="product.description"
                  >
                  </vue-editor>
                </b-form-group>
              </div>
            </b-col>
          </b-row>
          <b-alert variant="warning" :show="productCategoryAlert">
            {{ productCategoryMessage }}
          </b-alert>
          <b-alert variant="warning" :show="productSubTitleAlert">
            {{ productSubTitleMessage }}
          </b-alert>
          <b-alert variant="warning" :show="productDescriptionAlert">
            {{ productDescriptionMessage }}
          </b-alert>

          <b-row>
            <b-col cols="7"></b-col>
            <b-col cols="5">
              <b-row>
                <b-col>
                  <b-button type="reset" variant="danger" block>Reset</b-button>
                </b-col>
                <b-col>
                  <b-button variant="primary" block type="submit">
                    Submit
                  </b-button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-form>
      </b-card>
    </b-container>
    <MyFooter class="mt-5" />
  </div>
</template>

<script>
import ProductsService from "@/services/ProductsService.js";
import CategoryService from "@/services/CategoryService.js";
import SubCategoryService from "@/services/SubCategoryService.js";
import SubSubCategoryService from "@/services/SubSubCategoryService.js";
import ATopHeader from "@/components/Admins/ATopHeader.vue";
import MyFooter from "@/components/Common/MyFooter.vue";
import { VueEditor } from "vue2-editor";
export default {
  name: "AddProduct",
  components: {
    ATopHeader,
    VueEditor,
    MyFooter,
  },
  data() {
    return {
      images: [],
      newCategoryName: "",
      newSubCategoryName: "",
      newSubSubCategoryName: "",
      categoryList: [],
      subCategoryList: [],
      subSubCategoryList: [],
      productCategoryMessage: "Select product category.",
      productCategoryAlert: false,
      productSubTitleMessage: "Add product overview text.",
      productSubTitleAlert: false,
      productDescriptionMessage: "Add proper description for this product.",
      productDescriptionAlert: false,
      selectedCategory: "Category Name",
      selectedSubCategory: "Sub Category Name",
      selectedSubSubCategory: "Sub Sub Category Name",
      backupProduct: null,
      product: {
        code: "",
        title: "",
        amount: null,
        sales: 0,
        subtitle: "",
        rating: 0,
        peopleRated: 0,
        description: "",
        currency: "USD",
        CategoryId: 0,
        SubCategoryId: 0,
        SubSubCategoryId: 0,
      },
      errorCountImage:
        "You are not allowed to add more than 10 image for any product.",
      maximumImageCount: 10,
      imageAlert: false,
      dispImg: [],
    };
  },
  computed: {},
  async mounted() {
    this.backupProduct = this.product;
    this.categoryList = (
      await this.$store.dispatch("Category/getCategoryList")
    ).slice();

    this.subCategoryList = (
      await this.$store.dispatch("Category/getSubCategoryList")
    ).slice();

    this.subSubCategoryList = (
      await this.$store.dispatch("Category/getSubSubCategoryList")
    ).slice();
  },
  methods: {
    resetProduct() {
      this.product = this.backupProduct;
    },
    async createNewProduct() {
      if (
        this.product.CategoryId == 0 ||
        this.product.SubCategoryId == 0 ||
        this.product.SubSubCategoryId == 0
      ) {
        this.productCategoryAlert = true;
        return;
      } else if (this.product.subtitle == "") {
        this.productSubTitleAlert = true;
        return;
      } else if (this.product.description == "") {
        this.productSubTitleAlert = false;
        this.productDescriptionAlert = true;
        return;
      }
      this.product.subtitle = this.product.subtitle.replace(
        /<p><br><\/p>/g,
        ""
      );
      this.product.description = this.product.description.replace(
        /<p><br><\/p>/g,
        ""
      );
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
        const newProduct = (await ProductsService.createProduct(formData)).data;
        await this.$store.dispatch("Products/setAllBackupProducts");
        this.$router.push({ path: `/product/${newProduct.id}` });
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    async createNewCateg() {
      try {
        const newCategory = (
          await CategoryService.createCategory({ name: this.newCategoryName })
        ).data;
        this.newCategoryName = "";
        await this.$store.dispatch("Category/setCategoryList");
        this.categoryList.push(newCategory);
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    async createNewSubCateg() {
      try {
        const newSubCategory = (
          await SubCategoryService.createSubCategory({
            name: this.newSubCategoryName,
            CategoryId: this.product.CategoryId,
          })
        ).data;
        this.newSubCategoryName = "";
        await this.$store.dispatch("Category/setSubCategoryList");
        this.subCategoryList.push(newSubCategory);
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    async createNewSubSubCateg() {
      try {
        const newSubSubCategory = (
          await SubSubCategoryService.createSubSubCategory({
            name: this.newSubSubCategoryName,
            SubCategoryId: this.product.SubCategoryId,
          })
        ).data;
        this.newSubSubCategoryName = "";
        await this.$store.dispatch("Category/setSubSubCategoryList");
        this.subSubCategoryList.push(newSubSubCategory);
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
      this.productCategoryAlert = false;
      this.selectedSubSubCategory = subSubCategory.name;
      this.product.SubSubCategoryId = subSubCategory.id;
    },
    selectedImage(event) {
      this.images = event.target.files;

      if (this.images.length > this.maximumImageCount) {
        this.imageAlert = true;
      } else {
        this.imageAlert = false;
      }
      var i;

      this.dispImg = [];
      for (i = 0; i < this.images.length; i++) {
        if (i < this.maximumImageCount) {
          this.dispImg[i] = URL.createObjectURL(this.images[i]);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
