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
            <b-img :src="companyLogo" />
          </b-navbar-brand>
          <b-navbar-toggle target="nav-top-header-collapse" />
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
                  @click="set_category({ id: 0, name: 'All Category' })"
                >
                  All Category
                </b-dropdown-item>
                <b-dropdown-item
                  variant="dark"
                  @click="set_category(category)"
                  v-for="category in categoryList"
                  :key="category.id"
                >
                  {{ category.name }}
                </b-dropdown-item>
              </b-dropdown>

              <b-nav-form class="mr-auto" v-on:submit.prevent="search">
                <b-form-input
                  class="mr-sm-2 searchField"
                  v-model="searchTxt"
                  placeholder="Search for products &amp; brands"
                />
              </b-nav-form>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
              <b-nav-item class="mr-auto" @click="wishlist">
                <div>
                  <b-icon scale="0.8" icon="suit-heart" />
                  Wishlist
                </div>
              </b-nav-item>
              <b-nav-item class="mr-auto" to="/cart-view">
                <div>
                  <b-icon icon="cart2" />
                  Cart
                </div>
              </b-nav-item>
              <b-nav-item class="mr-auto" v-if="userLoggedIn">
                <b-img height="35px" width="35px" :src="user.profileImage" />
              </b-nav-item>
              <b-nav-item-dropdown class="mr-auto" right v-if="userLoggedIn">
                <template #button-content>
                  <em v-if="user.username" style="color: #fff">
                    {{ user.username }}
                  </em>
                  <em v-if="!user.username" style="color: #fff">
                    {{ user.firstName }} {{ user.lastName }}
                  </em>
                </template>
                <b-dropdown-item v-if="admin" to="/admin">
                  Admin Panel
                </b-dropdown-item>
                <b-dropdown-item to="/profile">Profile</b-dropdown-item>
                <b-dropdown-item @click="logout()">Log Out</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-button
                class="mr-auto"
                v-if="!userLoggedIn"
                pill
                variant="success"
                to="/login"
              >
                Login &amp; Register
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
      companyLogo: "",
      userLoggedIn: false,
      categoryList: [],
      searchTxt: "",
      searchCategoryId: 0,
      searchCategoryName: "All Category",
    };
  },
  async mounted() {
    this.companyLogo = await this.$store.dispatch("Company/getCompanyLogo");
    this.user = this.$store.state.CurrentUser.user;
    this.admin = this.$store.state.CurrentUser.admin;
    this.userLoggedIn = this.$store.state.CurrentUser.userLoggedIn;
    this.categoryList = await this.$store.dispatch("Category/getCategoryList");
  },
  computed: {},
  methods: {
    wishlist() {
      if (!this.userLoggedIn) {
        this.$bvToast.toast("Please login for the wishlist", {
          title: "Wishlist",
          variant: "primary",
          toaster: "b-toaster-top-center",
          noCloseButton: false,
          solid: true,
        });
      } else {
        this.$router.push({ path: "/wishlist" });
      }
    },
    async logout() {
      this.$store.dispatch("CurrentUser/setToken", "");
      this.$store.dispatch("CurrentUser/setUser", {});
      this.$store.dispatch("Wishlist/clearWishlist");
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
      if (this.searchTxt.trim() != "") {
        const text = this.searchTxt.trim();
        newRoute += "?q=" + text;
        this.$router.push({ path: newRoute });
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
