<template>
  <div class="mb-4" id="nav">
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
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TopHeader",
  data() {
    return {};
  },
  computed: {
    ...mapState(["user", "userLoggedIn", "shop"]),
  },

  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      window.location.replace("/login");
      location.reload(true);
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
