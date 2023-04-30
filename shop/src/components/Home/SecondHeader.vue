<template>
  <div style="background-color: #17a2b8">
    <b-row align-v="center" class="text-center">
      <b-col>
        <b-button
          class="ml-4"
          variant="transparent"
          v-b-toggle.categorycollapse
        >
          <b-icon variant="white" icon="chevron-double-down" />
        </b-button>
      </b-col>
      <b-col cols="10">
        <b-row>
          <b-col
            cols="2"
            v-for="category in categoryListRow1"
            :key="category.id"
          >
            <b-dropdown
              size="sm"
              split
              @click="categorySelect(category)"
              id="dropdown-category"
              :text="category.name"
              variant="info"
              block
            >
              <div v-for="subCategory in subCategoryList" :key="subCategory.id">
                <b-dropdown
                  class="mx-2"
                  v-if="category.id == subCategory.CategoryId"
                  size="sm"
                  id="dropdown-2"
                  variant="transparent"
                  dropright
                  :text="subCategory.name"
                >
                  <b-dropdown-item @click="subCategorySelect(subCategory)">
                    <b-icon icon="cursor-fill" scale="0.5" />
                    All {{ subCategory.name }}
                  </b-dropdown-item>
                  <div
                    v-for="subSubCategory in subSubCategoryList"
                    :key="subSubCategory.id"
                  >
                    <b-dropdown-item
                      @click="subSubCategorySelect(subSubCategory)"
                      style="margin-right: 20px"
                      v-if="
                        subCategory.id == subSubCategory.SubCategoryId &&
                        subCategory.CategoryId == category.id
                      "
                      href="#"
                    >
                      <b-icon icon="cursor-fill" scale="0.5" />
                      {{ subSubCategory.name }}
                    </b-dropdown-item>
                  </div>
                </b-dropdown>
              </div>
            </b-dropdown>
          </b-col>
        </b-row>
      </b-col>

      <b-col>
        <b-button variant="transparent" v-b-toggle.categorycollapse>
          <b-icon variant="white" icon="chevron-double-down" />
        </b-button>
      </b-col>
    </b-row>
    <b-container>
      <b-collapse visible id="categorycollapse">
        <b-row class="pb-2">
          <b-col
            cols="2"
            v-for="category in categoryListRow2"
            :key="category.id"
          >
            <b-dropdown
              class="mb-1"
              size="sm"
              @click="categorySelect(category)"
              split
              id="dropdown-category"
              :text="category.name"
              variant="info"
              block
            >
              <div v-for="subCategory in subCategoryList" :key="subCategory.id">
                <b-dropdown
                  v-if="category.id == subCategory.CategoryId"
                  size="sm"
                  id="dropdown-2"
                  variant="transparent"
                  dropright
                  :text="subCategory.name"
                >
                  <b-dropdown-item @click="subCategorySelect(subCategory)">
                    <b-icon icon="cursor-fill" scale="0.5" />
                    All {{ subCategory.name }}
                  </b-dropdown-item>
                  <div
                    v-for="subSubCategory in subSubCategoryList"
                    :key="subSubCategory.id"
                  >
                    <b-dropdown-item
                      @click="subSubCategorySelect(subSubCategory)"
                      style="margin-right: 20px"
                      v-if="
                        subCategory.id == subSubCategory.SubCategoryId &&
                        subCategory.CategoryId == category.id
                      "
                      href="#"
                    >
                      <b-icon icon="cursor-fill" scale="0.5" />
                      {{ subSubCategory.name }}
                    </b-dropdown-item>
                  </div>
                </b-dropdown>
              </div>
            </b-dropdown>
          </b-col>
        </b-row>
      </b-collapse>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "SecondHeader",
  components: {},
  data() {
    return {
      categoryList: [],
      categoryeachRow: 6,
      categoryListRow1: [],
      categoryListRow2: [],
      subCategoryList: [],
      subSubCategoryList: [],
    };
  },
  computed: {},
  async mounted() {
    this.categoryList = await this.$store.dispatch("Category/getCategoryList");
    this.categoryListRow1 = this.categoryList.slice(0, this.categoryeachRow);
    this.categoryListRow2 = this.categoryList.slice(
      this.categoryeachRow,
      this.categoryList.length
    );
    this.subCategoryList = await this.$store.dispatch(
      "Category/getSubCategoryList"
    );
    this.subSubCategoryList = await this.$store.dispatch(
      "Category/getSubSubCategoryList"
    );

    this.$root.$on("bv::dropdown::show", (bvEvent) => {
      if (bvEvent.componentId === "dropdown-2") {
        this.isDropdown2Visible = true;
      }
    });
    this.$root.$on("bv::dropdown::hide", (bvEvent) => {
      if (bvEvent.componentId === "dropdown-2") {
        this.isDropdown2Visible = false;
      }
      if (this.isDropdown2Visible) {
        bvEvent.preventDefault();
      }
    });
  },
  methods: {
    categorySelect(category) {
      this.$router.push({ path: `/products/${category.name}` });
    },
    subCategorySelect(subCategory) {
      const category = this.categoryList.find(
        (obj) => obj.id == subCategory.CategoryId
      );
      this.$router.push({
        path: `/products/${category.name}/${subCategory.name}`,
      });
    },
    subSubCategorySelect(subSubCategory) {
      const subCategory = this.subCategoryList.find(
        (obj) => obj.id == subSubCategory.SubCategoryId
      );
      const category = this.categoryList.find(
        (obj) => obj.id == subCategory.CategoryId
      );
      this.$router.push({
        path: `/products/${category.name}/${subCategory.name}/${subSubCategory.name}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
