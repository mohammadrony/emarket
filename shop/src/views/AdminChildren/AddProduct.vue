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
                    id="input-group-price"
                    label="Price"
                    label-for="input-price"
                  >
                    <b-form-input
                      id="input-price"
                      v-model="product.price"
                      placeholder="Amount"
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
                  placeholder="Upto 5 image"
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
                  <b-col><img :src="img1" /></b-col>
                  <b-col><img :src="img2" /></b-col>
                  <b-col><img :src="img3" /></b-col>
                  <b-col><img :src="img4" /></b-col>
                  <b-col><img :src="img5" /></b-col>
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
                      <!-- <ul>
                        <li v-for="category in categoryList" :key="category.id">
                          <div class="list-item mb-2 ml-4">
                          <a style="color: #000" @click="set_category(category)" href="#">{{ category.name }}</a>
                          </div>
                        </li>
                      </ul> -->

                      <b-dropdown-item
                        v-for="category in categoryList"
                        :key="category.id"
                        @click="set_category(category)"
                      >
                        <a>{{ category.name }}</a>
                      </b-dropdown-item>
                      <!-- <b-button-toolbar>
                          <b-button-group>
                            <b-button>
                              <b-icon icon="pen"></b-icon>
                            </b-button>
                          </b-button-group>
                        </b-button-toolbar> -->
                    </b-dropdown>
                  </b-col>
                  <b-col cols="1"><h6 class="mt-2">or</h6></b-col>
                  <b-col cols="6">
                    <b-form-group>
                      <b-form-input
                        id="input-category"
                        v-model="newCategory"
                        placeholder="Add New Category"
                        @keyup.enter="addNewCategory"
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
                    <b-form-group>
                      <b-form-input
                        id="input-sub-category"
                        v-model="newSubCategory"
                        :disabled="!product.CategoryId"
                        placeholder="Add New Sub Category"
                        @keyup.enter="addNewSubCategory"
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
                    <b-form-group>
                      <b-form-input
                        id="input-sub-sub-category"
                        v-model="newSubSubCategory"
                        :disabled="!product.SubCategoryId"
                        placeholder="Add New Sub Sub Category"
                        @keyup.enter="addNewSubSubCategory"
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
      categoryList: null,
      subCategoryList: null,
      subSubCategoryList: null,
      selectedCategory: "Category",
      selectedSubCategory: "Sub Category",
      selectedSubSubCategory: "Sub Sub Category",
      newCategory: null,
      newSubCategory: null,
      newSubSubCategory: null,
      product: {
        code: null,
        title: null,
        price: null,
        subtitle: null,
        description: null,
        currency: "USD",
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null,
        CategoryId: null,
        SubCategoryId: null,
        SubSubCategoryId: null,
      },
      errorCountImage: "Only First 5 image will be recorded.",
      imageAlert: null,
      errorFieldRequired: "Please fill in all required field.",
      allFieldRequired: null,
      img1: null,
      img2: null,
      img3: null,
      img4: null,
      img5: null,
    };
  },
  async mounted() {
    this.categoryList = (await CategoryService.getCategoryList()).data;
    this.subCategoryList = (await SubCategoryService.getSubCategoryList()).data;
    this.subSubCategoryList = (
      await SubSubCategoryService.getSubSubCategoryList()
    ).data;
  },
  methods: {
    async createNewProduct() {
      // this.error = null;
      // const requiredFieldsFilledIn = Object.keys(this.properties).every(
      //   (key) => !!this.properties[key]
      // );
      // if (!requiredFieldsFilledIn) {
      //   this.error = "Please fill in all the required fields.";
      //   return;
      // }

      try {
        const response = (
          await ProductsService.createProduct({ image1: this.product.image1 })
        ).data;
        console.log(response);
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
    addNewCategory() {
      if (this.newCategory) {
        console.log("have to work");
      }
    },
    addNewSubCategory() {
      if (this.newSubCategory) {
        console.log("have to work");
      }
    },
    addNewSubSubCategory() {
      if (this.newSubSubCategory) {
        console.log("have to work");
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
      if (event.target.files.length > 5) {
        this.imageAlert = true;
      } else {
        this.imageAlert = false;
      }
      // console.log(event.target.files)
      this.img1 = URL.createObjectURL(event.target.files[0]);
      this.product.image1 = event.target.files[0];
      // if (event.target.files[1]) {
      //   this.product.image2 = event.target.files[1];
      //   this.img2 = URL.createObjectURL(event.target.files[1]);
      // }
      // if (event.target.files[2]) {
      //   this.product.image3 = event.target.files[2];
      //   this.img3 = URL.createObjectURL(event.target.files[2]);
      // }
      // if (event.target.files[3]) {
      //   this.product.image4 = event.target.files[3];
      //   this.img4 = URL.createObjectURL(event.target.files[3]);
      // }
      // if (event.target.files[4]) {
      //   this.product.image5 = event.target.files[4];
      //   this.img5 = URL.createObjectURL(event.target.files[4]);
      // }
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