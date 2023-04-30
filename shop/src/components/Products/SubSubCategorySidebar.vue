<template>
  <div>
    <ul style="list-style: none">
      <div
        v-for="subSubCategory in subSubCategoryList"
        :key="subSubCategory.id"
      >
        <li
          v-if="searchParameter.subCategoryId == subSubCategory.SubCategoryId"
          class="mb-1"
        >
          <b-row v-if="subSubCategory.mode == 0">
            <div :class="{ 'col-12': !admin, 'col-8': admin }">
              <b-link
                variant="white"
                :to="`${$route.path}/${subSubCategory.name}`"
              >
                <small>{{ subSubCategory.name }}</small>
                <b-icon
                  variant="primary"
                  icon="triangle-fill"
                  scale="0.5"
                  rotate="90"
                  shift-v="-2"
                />
              </b-link>
            </div>

            <b-col cols="4" v-if="admin">
              <b-button-toolbar>
                <b-button-group size="sm">
                  <b-button @click="subSubCategory.mode ^= 1" variant="white">
                    <b-icon
                      variant="primary"
                      v-b-tooltip.hover
                      title="Edit"
                      icon="pen"
                    />
                  </b-button>

                  <b-button
                    @click="deleteSubSubCategory(subSubCategory)"
                    variant="white"
                  >
                    <b-icon
                      variant="danger"
                      v-b-tooltip.hover
                      title="Delete"
                      icon="trash"
                    />
                  </b-button>
                </b-button-group>
              </b-button-toolbar>
            </b-col>
          </b-row>
          <b-form
            v-if="subSubCategory.mode == 1"
            @submit.stop.prevent="updateSubSubCategory(subSubCategory)"
          >
            <b-row>
              <b-col cols="8">
                <b-form-group>
                  <b-form-input
                    size="sm"
                    required
                    v-model="subSubCategory.name"
                    placeholder="Category Name"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-button-toolbar>
                  <b-button-group size="sm">
                    <b-button type="submit" variant="white">
                      <b-icon
                        variant="primary"
                        v-b-tooltip.hover
                        title="Save"
                        icon="check2"
                      />
                    </b-button>
                    <b-button @click="subSubCategory.mode ^= 1" variant="white">
                      <b-icon
                        variant="danger"
                        v-b-tooltip.hover
                        title="Cancel"
                        icon="x"
                      />
                    </b-button>
                  </b-button-group>
                </b-button-toolbar>
              </b-col>
            </b-row>
          </b-form>
        </li>
      </div>
      <div v-if="admin">
        <b-card>
          <b-form @submit.stop.prevent="createNewSubSubCateg">
            <b-form-group>
              <b-form-input
                size="sm"
                required
                v-model="newSubSubCategory"
                placeholder="Category Name"
              />
            </b-form-group>
            <b-button size="sm" type="submit" variant="warning">
              Create
            </b-button>
          </b-form>
        </b-card>
      </div>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SubSubCategoryService from "@/services/SubSubCategoryService.js";

export default {
  name: "SubSubCategorySidebar",
  data() {
    return {
      newSubSubCategory: "",
      searchParameter: {},
      subSubCategoryList: [],
    };
  },
  computed: {
    ...mapState({
      admin: (state) => state.CurrentUser.admin,
    }),
  },

  async mounted() {
    this.searchParameter = this.$store.state.Products.searchParameter;
    this.subSubCategoryList = await this.$store.dispatch(
      "Category/getSubSubCategoryList"
    );
    this.subSubCategoryList = this.subSubCategoryList.map((obj) => ({
      ...obj,
      mode: 0,
    }));
  },
  methods: {
    async createNewSubSubCateg() {
      try {
        await SubSubCategoryService.createSubSubCategory({
          name: this.newSubSubCategory,
          SubCategoryId: this.searchParameter.subCategoryId,
        });
        await this.$store.dispatch("Category/setSubSubCategoryList");
        window.location.reload();
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    async updateSubSubCategory(subSubCategory) {
      try {
        delete subSubCategory.mode;
        await SubSubCategoryService.updateSubSubCategory(subSubCategory);
        await this.$store.dispatch("Category/setSubSubCategoryList");
        window.location.reload();
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    async deleteSubSubCategory(subSubCategory) {
      try {
        await SubSubCategoryService.deleteSubSubCategory(subSubCategory.id);
        await this.$store.dispatch("Category/setSubSubCategoryList");
        window.location.reload();
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
