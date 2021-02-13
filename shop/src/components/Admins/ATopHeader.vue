<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-brand href="/">
        <img src="http://localhost:8084/public/product-image/e-store.png" />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mr-auto">
          <b-nav-item to="/admin" class="ml-2">
            <div style="color: #fff; font-size: 18px">Dashboard</div>
          </b-nav-item>
          <b-nav-item to="/admin/users" class="ml-2">
            <div style="color: #fff; font-size: 18px">Users</div>
          </b-nav-item>
          <b-nav-item to="/admin/orders" class="ml-2">
            <div style="color: #fff; font-size: 18px">Orders</div>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
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
            <b-dropdown-item to="/admin/profile">Admin Profile</b-dropdown-item>
            <b-dropdown-item @click="logout()">Log Out</b-dropdown-item>
          </b-nav-item-dropdown>
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
export default {
  name: "ATopHeader",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    logout() {
      this.$store.dispatch("CurrentUser/setToken", null);
      this.$store.dispatch("CurrentUser/setUser", null);
      window.location.replace("/");
    }
  },
  computed: {
    ...mapState({
      user: state => state.CurrentUser.user,
      userLoggedIn: state => state.CurrentUser.userLoggedIn
    })
  }
};
</script>

<style lang="scss" scoped></style>
