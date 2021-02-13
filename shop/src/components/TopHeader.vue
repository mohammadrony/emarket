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
            <b-img :src="shopLogo" />
          </b-navbar-brand>
          <b-navbar-toggle target="nav-top-header-collapse"></b-navbar-toggle>
          <b-collapse id="nav-top-header-collapse" is-nav>
            <b-navbar-nav class="mr-auto">
              <b-dropdown
                id="dropdown-right"
                :text="searchCategoryName"
                style="background-color: #fff"
                variant="transparent"
                class="mr-auto"
              >
                <b-dropdown-item
                  variant="dark"
                  @click="set_category(category)"
                  v-for="(category,idx) in categoryList"
                  :key="idx"
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

            <!-- <b-navbar-nav class="ml-auto">
              <b-nav-item to="wishlist"
                ><div><i class="fas fa-heart"></i> Wishlist</div></b-nav-item
              >
            </b-navbar-nav> -->
            <b-navbar-nav>
              <b-nav-item class="mr-auto" to="/cart-view"
                ><div>
                  <b-icon icon="cart2"></b-icon>
                  Cart
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
                <b-dropdown-item v-if="admin" to="/admin"
                  >Admin Panel</b-dropdown-item
                >
                <b-dropdown-item to="/profile">Profile</b-dropdown-item>
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
export default {
  name: "TopHeader",
  data() {
    return {
      user: {},
      admin: false,
      shopId: 1,
      shopLogo: "",
      userLoggedIn: false,
      categoryList: [],
      searchTxt: "",
      searchCategoryId: 0,
      searchCategoryName: "All Category"
    };
  },
  async mounted() {
    this.shopLogo = await this.$store.dispatch("Shop/getShopLogo");
    this.user = this.$store.state.CurrentUser.user;
    this.admin = this.$store.state.CurrentUser.admin;
    this.userLoggedIn = this.$store.state.CurrentUser.userLoggedIn;
    this.categoryList = await this.$store.dispatch("Category/getCategoryList");
    this.categoryList.unshift({ id: 0, name: "All Category" });
  },
  computed: {},
  methods: {
    wishlist() {
      if (!this.userLoggedIn) {
        this.$bvToast.toast("Sign in to check your wishlist", {
          title: "Wishlist",
          variant: "primary",
          toaster: "b-toaster-top-center",
          noCloseButton: false,
          solid: true
        });
      } else {
        window.location.replace("/wishlist");
      }
    },
    logout() {
      this.$store.dispatch("CurrentUser/setToken", null);
      this.$store.dispatch("CurrentUser/setUser", null);
      window.location.reload();
    },
    set_category(category) {
      this.searchCategoryId = category.id;
      this.searchCategoryName = category.name;
    },
    search() {
      var newRoute = "/products";
      if (this.searchCategoryId != 0) {
        const category = this.searchCategoryName;
        newRoute += "/" + category;
      }
      if (this.searchTxt != "") {
        const text = this.searchTxt;
        newRoute += "?q=" + text;
        window.location.replace(newRoute);
      }
    }
  }
};
</script>

<style scoped lang="scss">
</style>
