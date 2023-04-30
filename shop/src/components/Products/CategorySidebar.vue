<template>
  <div>
    <ul style="list-style: none">
      <li v-for="category in categoryList" :key="category.id" class="mb-1">
        <b-row v-if="category.mode == 0">
          <div :class="{ 'col-12': !admin, 'col-8': admin }">
            <b-link variant="white" :to="`/products/${category.name}`">
              <small>{{ category.name }}</small>
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
                <b-button @click="category.mode ^= 1" variant="white">
                  <b-icon
                    variant="primary"
                    v-b-tooltip.hover
                    title="Edit"
                    icon="pen"
                  />
                </b-button>

                <b-button @click="deleteCategory(category)" variant="white">
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
          v-if="category.mode == 1"
          @submit.stop.prevent="updateCategory(category)"
        >
          <b-row>
            <b-col cols="8">
              <b-form-group>
                <b-form-input
                  size="sm"
                  required
                  v-model="category.name"
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
                  <b-button @click="category.mode ^= 1" variant="white">
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
      <div v-if="admin">
        <b-card>
          <b-form @submit.stop.prevent="createNewCateg">
            <b-form-group>
              <b-form-input
                size="sm"
                required
                v-model="newCategory"
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
import CategoryService from "@/services/CategoryService.js";

export default {
  name: "CategorySidebar",
  data() {
    return {
      newCategory: "",
      categoryList: [],
    };
  },
  computed: {
    ...mapState({
      admin: (state) => state.CurrentUser.admin,
    }),
  },

  async mounted() {
    this.categoryList = await this.$store.dispatch("Category/getCategoryList");
    this.categoryList = this.categoryList.map((obj) => ({
      ...obj,
      mode: 0,
    }));
  },
  methods: {
    async createNewCateg() {
      try {
        await CategoryService.createCategory({ name: this.newCategory });
        await this.$store.dispatch("Category/setCategoryList");
        window.location.reload();
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    async updateCategory(category) {
      try {
        delete category.mode;
        await CategoryService.updateCategory(category);
        await this.$store.dispatch("Category/setCategoryList");
        window.location.reload();
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    async deleteCategory(category) {
      try {
        await CategoryService.deleteCategory(category.id);
        await this.$store.dispatch("Category/setCategoryList");
        window.location.reload();
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
