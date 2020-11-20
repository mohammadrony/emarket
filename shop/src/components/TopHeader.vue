<template>
  <div id="nav">
    <b-navbar toggleable="sm" type="dark" variant="info">
      <b-navbar-brand to="/">{{ shop.name }}</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/products">Products</b-nav-item>
          <b-nav-item to="/about">About Us</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-form @submit.prevent>
            <b-button
              v-if="!$store.state.userLoggedIn"
              type="submit"
              v-b-modal.login-modal
              variant="outline-dark"
              >Log in</b-button
            >

            <b-button
              v-if="!$store.state.userLoggedIn"
              class="ml-2"
              type="submit"
              v-b-modal.register-modal
              variant="dark"
              >Register</b-button
            >

            <div class="cart-icon">
              <b-icon-cart2
                v-b-modal.cart-products-modal
                v-if="$store.state.userLoggedIn"
                font-scale="1.5"
                class="mr-2"
              ></b-icon-cart2>
            </div>
            <b-nav-item-dropdown v-if="$store.state.userLoggedIn" right>
              <template #button-content>
                <em>{{ $store.state.user.username }}</em>
              </template>
              <b-dropdown-item variant="info" to="/user-profile"
                >Profile</b-dropdown-item
              >
              <b-dropdown-item variant="info" @click="logout()"
                >Log Out</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>

      <Login />
      <Register />
      <CartModal />
    </b-navbar>
  </div>
</template>

<script>
import Login from "./Login";
import Register from "./Register";
import CartModal from "./CartModal";
import store from "../store";

export default {
  name: "TopHeader",
  components: { Login, Register, CartModal },
  data() {
    return {
      shop: store.state.shop
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      // location.reload(true);
    }
  }
};
</script>

<style scoped lang="scss">
#nav {
  padding: 0;
  padding-bottom: 40px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #ffffff;
    }
  }
}

.cart-icon:hover {
  cursor: pointer;
  color: navy;
}
</style>
