<template>
  <div>
    <b-row>
      <b-col>
        <b-navbar
          class="py-3"
          toggleable="lg"
          type="dark"
          style="background-color: #00283a"
        >
          <b-navbar-brand href="/">
            <img src="../../public/assets/images/e-store.png" />
          </b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="mr-auto">
              <b-dropdown
                id="dropdown-right"
                :text="search_category"
                style="background-color: #fff"
                variant="transparent"
                class="mr-auto"
              >
                <b-dropdown-item
                  variant="dark"
                  @click="set_category(category)"
                  v-for="category in categoryList"
                  :key="category.id"
                  >{{ category.name }}</b-dropdown-item
                >
              </b-dropdown>

              <b-nav-form v-on:submit.prevent="search">
                <b-form-input
                  class="mr-sm-2 searchField"
                  v-model="searchTxt"
                  placeholder="Search for products & brands"
                ></b-form-input>
              </b-nav-form>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
              <b-nav-item to="wishlist"
                ><div><i class="fas fa-heart"></i> Wishlist</div></b-nav-item
              >
            </b-navbar-nav>
            <b-navbar-nav>
              <b-nav-item class="mr-auto" to="/cart-view"
                ><div>
                  <i class="fas fa-shopping-cart"></i> Cart
                </div></b-nav-item
              >
            </b-navbar-nav>
            <b-navbar-nav v-if="userLoggedIn">
              <b-nav-item>
                <b-img
                  height="35px"
                  width="35px"
                  :src="user.profileImage"
                ></b-img>
              </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav v-if="userLoggedIn">
              <b-nav-item-dropdown right>
                <template #button-content>
                  <em v-if="user.username" style="color: #fff">{{
                    user.username
                  }}</em>
                  <em v-if="!user.username" style="color: #fff"
                    >{{ user.firstName }} {{ user.lastName }}</em
                  >
                </template>
                <b-dropdown-item v-if="user.isAdmin" to="/admin"
                  >Admin Panel</b-dropdown-item
                >
                <b-dropdown-item @click="userProfile()"
                  >Profile</b-dropdown-item
                >
                <b-dropdown-item @click="logout()">Log Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>

            <b-navbar-nav v-if="!userLoggedIn">
              <b-button pill variant="success" to="/login">
                Login & Register
              </b-button>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </b-col>
    </b-row>
    <hr class="m-0" style="background-color: #000" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CategoryService from "@/services/CategoryService.js";
export default {
  name: "TopHeader",
  data() {
    return {
      shop: null,
      cList: false,
      categoryList: null,
      searchTxt: "",
      search_category_id: 0,
      search_category: "All Category",
    };
  },
  async mounted() {
    this.shop = this.$store.state.shop;
    if (this.cList == false) {
      this.categoryList = await this.$store.dispatch(
        "Products/Category/setFullCategoryList"
      );
      if (this.categoryList) this.cList = true;
    }
    this.categoryList = (await CategoryService.getCategoryList()).data;
    const defaultCategory = { id: 0, name: "All Category" };
    this.categoryList.unshift(defaultCategory);
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      userLoggedIn: (state) => state.userLoggedIn,
    }),
  },

  methods: {
    wishlist() {
      if (!this.userLoggedIn) {
        this.$bvToast.toast("Sign in to check your wishlist", {
          title: "Wishlist",
          variant: "primary",
          toaster: "b-toaster-top-center",
          noCloseButton: false,
          solid: true,
        });
      } else {
        window.location.replace("/wishlist");
      }
    },
    userProfile() {
      this.$router.push({
        name: "profile",
        params: {
          userId: this.user.id,
        },
      });
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      window.location.replace("/");
    },
    set_category(category) {
      this.search_category_id = category.id;
      this.search_category = category.name;
    },
    search() {
      this.$store.dispatch("/Products/setSearchText", this.searchTxt);
      var route = "/products";
      if (this.search_category_id != 0) {
        const category = this.search_category;
        route += "/" + category;
      }
      if (this.searchTxt != "") {
        const text = this.searchTxt;
        route += "?q=" + text;
        window.location.replace(route);
      }
    },
  },
};
</script>

<style scoped lang="scss">
#nav {
  padding: 0;
  margin: 0;
  a.router-link-exact-active {
    color: #ffffff;
  }
}
.cart-icon:hover {
  cursor: pointer;
  color: navy;
}
</style>
