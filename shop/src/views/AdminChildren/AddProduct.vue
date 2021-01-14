<template>
  <div>
    <ATopHeader />
    <b-container>
      <b-card>
        <b-navbar text-variant="white" variant="info">
          <b-navbar-brand style="color: #fff">Add Product</b-navbar-brand>
        </b-navbar>
        <b-form class="mt-3">
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
                  <b-col cols="5">
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
                  <b-col cols="1"><h6 class="mt-2">or</h6></b-col>
                  <b-col cols="6">
                    <b-form-group @submit.prevent="addNewCategory">
                      <b-form-input
                        id="input-category"
                        v-model="newCategory"
                        placeholder="Add New Category"
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row class="mt-4">
                  <b-col cols="5">
                    <b-dropdown
                      id="dropdown-subCategory"
                      :text="selectedSubCategory"
                      variant="info"
                      block
                      :disabled="!product.CategoryId"
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
                  <b-col cols="1"><h6 class="mt-2">or</h6></b-col>
                  <b-col cols="6">
                    <b-form-group @submit.prevent="addNewSubCategory">
                      <b-form-input
                        id="input-sub-category"
                        v-model="newSubCategory"
                        :disabled="!product.CategoryId"
                        placeholder="Add New Sub Category"
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row class="mt-4">
                  <b-col cols="5">
                    <b-dropdown
                      id="dropdown-subSubCategory"
                      :text="selectedSubSubCategory"
                      variant="info"
                      block
                      :disabled="!product.SubCategoryId"
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
                  <b-col cols="1"><h6 class="mt-2">or</h6></b-col>
                  <b-col cols="6">
                    <b-form-group @submit.prevent="addNewSubSubCategory">
                      <b-form-input
                        id="input-sub-sub-category"
                        v-model="newSubSubCategory"
                        :disabled="!product.SubCategoryId"
                        placeholder="Add New Sub Sub Category"
                      >
                      </b-form-input>
                    </b-form-group>
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
                  <b-button variant="danger" block>Reset</b-button>
                </b-col>
                <b-col>
                  <b-button variant="primary" block @click="createNewProduct"
                    >Submit</b-button
                  >
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import ProductsService from "@/services/ProductsService";
import CategoryService from "@/services/CategoryService";
import SubCategoryService from "@/services/SubCategoryService";
import SubSubCategoryService from "@/services/SubSubCategoryService";
import ATopHeader from "@/components/Admins/ATopHeader.vue";
import { VueEditor } from "vue2-editor";
export default {
  name: "AddProduct",
  components: {
    ATopHeader,
    VueEditor,
  },
  data() {
    return {
      images: [],
      categoryList: null,
      subCategoryList: null,
      subSubCategoryList: null,
      selectedCategory: "Category",
      selectedSubCategory: "Sub Category",
      selectedSubSubCategory: "Sub Sub Category",
      newCategory: null,
      newSubCategory: null,
      newSubSubCategory: null,
      backupProduct: null,
      product: {
        code: null,
        title: null,
        amount: null,
        subtitle: null,
        description: null,
        currency: "USD",
        CategoryId: null,
        SubCategoryId: null,
        SubSubCategoryId: null,
      },
      errorCountImage:
        "You are not allowed to add more than 10 image for this product.",
      max_input_img: 10,
      imageAlert: null,
      errorFieldRequired: "Please fill in all required field.",
      allFieldRequired: null,
      dispImg: [],
    };
  },
  async mounted() {
    this.backupProduct = this.product;
    this.categoryList = (await CategoryService.getCategoryList()).data;
    this.subCategoryList = (await SubCategoryService.getSubCategoryList()).data;
    this.subSubCategoryList = (
      await SubSubCategoryService.getSubSubCategoryList()
    ).data;
  },
  methods: {
    reset() {
      this.product = this.backupProduct
    },
    async createNewProduct() {
      var formData = new FormData();
      var fieldName;
      for (fieldName in this.product) {
        formData.append(fieldName, this.product[fieldName]);
        console.log(fieldName, this.product[fieldName]);
      }
      var i;
      for (i = 0; i < this.images.length; i++) {
        if (i < this.max_input_img)
          formData.append("imageField", this.images[i]);
      }
      try {
        const response = (await ProductsService.createProduct(formData)).data;
        await this.$store.dispatch("Products/setAllBackupProduct")
        console.log(response);
        window.location.reload();
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
    },

    async addNewCategory() {
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
    async addNewSubCategory() {
      try {
        const newSubCategory = (
          await SubCategoryService.createSubCategory({
            name: this.newSubCategory,
            CategoryId: this.product.CategoryId,
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
    },
    async addNewSubSubCategory() {
      try {
        const newSubSubCategory = (
          await SubSubCategoryService.createSubSubCategory({
            name: this.newSubCategory,
            SubCategoryId: this.product.SubCategoryId,
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
    },

    set_category(category) {
      this.selectedCategory = category.name;
      this.selectedSubCategory = "Sub Category";
      this.selectedSubSubCategory = "Sub Sub Category";
      (this.product.SubCategoryId = null),
        (this.product.SubSubCategoryId = null),
        (this.product.CategoryId = category.id);
    },
    set_subCategory(subCategory) {
      this.selectedSubCategory = subCategory.name;
      this.selectedSubSubCategory = "Sub Sub Category";
      this.product.SubCategoryId = subCategory.id;
      this.product.SubSubCategoryId = null;
    },
    set_subSubCategory(subSubCategory) {
      this.selectedSubSubCategory = subSubCategory.name;
      this.product.SubSubCategoryId = subSubCategory.id;
    },
    onFileChange() {
      this.images = event.target.files;

      if (this.images.length > this.max_input_img) {
        this.imageAlert = true;
      } else {
        this.imageAlert = false;
      }
      var i;

      for (i = 0; i < this.images.length; i++) {
        if (i < this.max_input_img)
          this.dispImg[i] = URL.createObjectURL(this.images[i]);
      }
    },
  },
  computed: {},
};
</script>

<style scoped>
.list-item {
  padding-left: 20px;
}
.list-item:hover {
  background-color: #bbb;
}
.list-item:active {
  background-color: #23a;
}
</style>