<template>
  <div>
    <TopHeader />
    <b-container class="mt-5">
      <b-row align-h="center">
        <b-col cols="10" md="7" lg="5">
          <b-card style="color: #001e5f">
            <h4 class="font-weight-bold">Login</h4>
            <b-form @submit.stop.prevent="login" class="mt-4">
              <b-form-group
                id="input-group-email"
                label="Email"
                label-for="input-email"
              >
                <b-form-input
                  v-model="email"
                  id="input-email"
                  type="email"
                  ref="emailField"
                  :state="emailValidation"
                  required
                />
                <b-form-invalid-feedback :state="emailValidation">
                  {{ invalidEmailMessage }}
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                id="input-group-password"
                label="Password"
                label-for="input-password"
              >
                <b-form-input
                  v-model="password"
                  id="input-password"
                  type="password"
                  required
                />
              </b-form-group>
              <b-alert
                variant="primary"
                class="my-2 p-1 pl-2"
                :show="loginAlert"
              >
                {{ loginMessage }}
              </b-alert>
              <b-row>
                <b-col cols="3" />
                <b-col cols="6">
                  <b-button
                    block
                    class="p-2 mt-2"
                    type="submit"
                    variant="warning"
                  >
                    Login
                  </b-button>
                </b-col>
                <b-col cols="3" />
              </b-row>
            </b-form>
            <b-row class="mt-2">
              <b-col class="text-center">
                <small>
                  <b-link v-b-toggle.request-password-token>
                    forget your password?
                  </b-link>
                </small>
              </b-col>
            </b-row>
            <b-collapse id="request-password-token">
              <ReqPassToken />
            </b-collapse>
            <hr />
            <b-row>
              <b-col class="text-center">
                New Customer?&nbsp;
                <b-link to="/register">Create your account</b-link>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <MyFooter class="mt-5" />
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService.js";
import TopHeader from "@/components/Common/TopHeader.vue";
import ReqPassToken from "@/components/User/ReqPassToken.vue";
import MyFooter from "@/components/Common/MyFooter.vue";
export default {
  name: "Login",
  components: {
    TopHeader,
    ReqPassToken,
    MyFooter,
  },
  data() {
    return {
      email: null,
      password: null,
      emailValidation: null,
      invalidEmailMessage: "",
      loginMessage: null,
      loginAlert: false,
    };
  },
  mounted() {
    this.$refs.emailField.focus();
  },
  methods: {
    async login() {
      var user;
      try {
        user = (
          await AuthenticationService.checkRegsToken({
            email: this.email,
          })
        ).data;
      } catch (error) {
        this.emailValidation = false;
        this.invalidEmailMessage = "User not found.";
        return;
      }
      if (!user.verificationStatus) {
        this.$store.dispatch("CurrentUser/setNewUserId", user.id);
        this.$store.dispatch("CurrentUser/setNewUserEmail", this.email);
        this.$router.push({ path: "/user-verify" });
        return;
      }

      try {
        const response = (
          await AuthenticationService.login({
            email: this.email,
            password: this.password,
          })
        ).data;
        this.$store.dispatch("CurrentUser/setToken", response.token);
        this.$store.dispatch("CurrentUser/setUser", response.user);
        this.$store.dispatch("Wishlist/setWishlist");
        this.$router.push({ path: "/" });
      } catch (error) {
        this.loginAlert = true;
        this.loginMessage = error.response.data.error;
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
