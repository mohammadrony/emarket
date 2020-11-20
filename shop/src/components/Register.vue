<template>
  <div class="register">
    <b-modal
      size="lg"
      id="register-modal"
      hide-footer
      hide-header-close
      centered
      title="Sign up to Explore"
    >
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-signup"
          role="tabpanel"
          aria-labelledby="pills-signup-tab"
        >
          <div class="form-group">
            <b-form-input
              size="lg"
              class="mt-2"
              v-model="name"
              placeholder="Your Name"
            ></b-form-input>
          </div>

          <div class="form-group">
            <b-form-input
              size="lg"
              class="mt-4"
              v-model="email"
              placeholder="Email address"
            ></b-form-input>
          </div>

          <div class="form-group">
            <b-form-input
              size="lg"
              class="mt-4 mb-2"
              @keyup.enter="register"
              type="password"
              v-model="password"
              placeholder="Password"
            ></b-form-input>
            <div class="error" v-html="error" />
            <br />
            <b-button block size="lg" @click="register" variant="primary"
              >Register</b-button
            >
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";

export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: null
    };
  },

  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register({
          username: this.name,
          email: this.email,
          password: this.password,
          isAdmin: false
        });

        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);

        this.$bvModal.hide("register-modal");
        this.name = "";
        this.email = "";
        this.password = "";
        this.$bvToast.toast("New User Registered", {
          title: "Update",
          variant: "dark",
          toaster: "b-toaster-top-center",
          noCloseButton: true,
          solid: true
        });
        location.reload(true);
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.error {
  color: red;
}
</style>
