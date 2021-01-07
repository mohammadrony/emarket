<template>
  <!-- <div class="mb-4" id="nav">
    <b-navbar toggleable="sm" type="dark" variant="info">
      <b-navbar-brand to="/">{{ shop.name }}</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/products">Products</b-nav-item>
          <b-nav-item to="/about">About Us</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-button to="/login" v-if="!userLoggedIn" variant="outline-light"
            >Log in</b-button
          >

          <div class="cart-icon">
            <b-button
              to="/my-cart"
              v-if="userLoggedIn"
              font-scale="1.5"
              class="mr-2"
              variant="info"
            >
              <b-icon-cart2></b-icon-cart2>
            </b-button>
          </div>
          <b-nav-item-dropdown v-if="userLoggedIn" right>
            <template #button-content>
              <em v-if="user.username">{{ user.username }}</em>
              <em v-if="!user.username"
                >{{ user.firstName }} {{ user.lastName }}</em
              >
            </template>
            <b-dropdown-item variant="info" to="/user-profile"
              >Profile</b-dropdown-item
            >
            <b-dropdown-item variant="info" @click="logout()"
              >Log Out</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div> -->
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-brand href="/">
        <img src="../../public/assets/images/e-store.png" />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mr-auto">
          <b-dropdown
            id="dropdown-right"
            :text="search_category"
            variant="success"
            class="ml-4"
          >
            <b-dropdown-item
              variant="dark"
              @click="set_category(category)"
              v-for="category in categoryList"
              :key="category.id"
              >{{ category.name }}</b-dropdown-item
            >
          </b-dropdown>

          <b-nav-form>
            <b-form-input
              class="mr-sm-2 searchField"
              v-model="searchText"
              @keyup.enter="search"
              placeholder="Search for products & brands"
            ></b-form-input>
          </b-nav-form>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="userLoggedIn">
          <b-nav-item to="/wishlist"
            ><div style="color: #000">
              <i class="fas fa-heart"></i> Wishlist
            </div></b-nav-item
          >
          <b-nav-item to="/cart-view"
            ><div style="color: #000">
              <i class="fas fa-shopping-cart"></i> Cart
            </div></b-nav-item
          >
          <b-nav-item>
            <b-img height="35px" width="35px" :src="user.profileImage"></b-img>
          </b-nav-item>
          <b-nav-item-dropdown right>
            <template #button-content>
              <em v-if="user.username" style="color: #fff">{{
                user.username
              }}</em>
              <em v-if="!user.username" style="color: #fff"
                >{{ user.firstName }} {{ user.lastName }}</em
              >
            </template>
            <b-dropdown-item @click="userProfile()">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout()">Log Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!userLoggedIn">
          <b-button pill variant="success" to="/login">
            Login & Register
          </b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="row mb">
      <b-row>
        <b-icon icon="list" scale="2" v-b-toggle.categoryList></b-icon>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CategoryService from "../services/CategoryService";
export default {
  name: "TopHeader",
  data() {
    return {
      searchText: null,
      search_category_id: 0,
      search_category: "All Category",
      categoryList: null,
    };
  },
  async mounted() {
    this.categoryList = (await CategoryService.getCategoryList()).data;
    this.categoryList.unshift({ id: 0, name: "All Categories" });
  },
  computed: {
    ...mapState(["user", "userLoggedIn", "shop"]),
  },

  methods: {
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
      this.$store.dispatch("Products/searchProduct", { text: this.searchText });
      window.location.replace("/products");

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
