<template>
  <div>
    <TopHeader />
    <b-container>
      <b-row class="mt-5" align-h="center">
        <b-col cols="5">
          <b-card style="color: #001e5f">
            <h4 style="font-weight: bold">Login</h4>
            <b-form class="mt-4">
              <b-form-group
                style="font-weight: bold"
                id="input-group-email"
                label="Email"
                label-for="input-email"
              >
                <b-form-input
                  v-model="email"
                  id="input-email"
                  type="email"
                  @keyup="error = null"
                  @keyup.enter="login"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                style="font-weight: bold"
                id="input-group-password"
                label="Password"
                label-for="input-password"
              >
                <b-form-input
                  v-model="password"
                  id="input-password"
                  type="password"
                  @keyup="error = null"
                  @keyup.enter="login"
                  required
                ></b-form-input>
              </b-form-group>
              <h6 style="color: #f00">
                {{ error }}
              </h6>
              <b-row>
                <b-col cols="3"></b-col>
                <b-col cols="6">
                  <b-button
                    style="font-weight: bold"
                    block
                    class="p-2 mt-2"
                    @click="login"
                    variant="warning"
                    >Login</b-button
                  >
                </b-col>
                <b-col cols="3"></b-col>
              </b-row>
            </b-form>
            <b-row class="mt-2">
              <b-col class="text-center">
                <small
                  ><b-link v-b-toggle.collapse-requestToken
                    >forget your password?</b-link
                  ></small
                >
              </b-col>
            </b-row>
            <b-collapse
              class="p-2 mt-2"
              id="collapse-requestToken"
              style="background-color: #f4f6f8"
            >
              <b-form v-if="!mailSent" @submit.prevent="requestToken">
                <b-form-group
                  @submit.prevent="requestToken"
                  style="font-weight: bold"
                  label="Enter your email address"
                  label-for="input-email-for-token"
                >
                  <b-form-input
                    v-model="emailResetPassword"
                    id="input-email-for-token"
                    type="email"
                    required
                  ></b-form-input>
                </b-form-group>
                <a>we will send you a link to reset your password.</a><br />
                <b-alert variant="danger" class="mt-2" :show="tokenAlert">
                  {{ tokenAlertMessage }}
                </b-alert>
                <b-button
                  class="mt-3"
                  variant="outline-info"
                  @click="requestToken"
                >
                  <strong>Submit</strong>
                </b-button>
              </b-form>
              <div class="px-2" v-if="mailSent">
                <strong>Reset password</strong>
                <div class="mt-2">

                  Check your email for a link to reset your password. If it
                  doesn’t appear within a few minutes, check your spam folder.
              </div>
                </div>
            </b-collapse>
            <hr />
            <b-row>
              <b-col class="text-center">
                <a>New Customer?</a
                ><a href="/register">&nbsp;Create your account</a>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <Footer class="mt-5" />
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import TopHeader from "@/components/TopHeader.vue";
import Footer from "@/components/Footer.vue";
import store from "@/store";

export default {
  name: "Login",
  components: {
    TopHeader,
    Footer,
  },
  data() {
    return {
      shop: store.state.shop,
      email: null,
      password: null,
      emailResetPassword: null,
      tokenAlert: null,
      mailSent: false,
      tokenAlertMessage: null,
      error: null,
    };
  },
  methods: {
    async requestToken() {
      try {
        const user = await AuthenticationService.validUser(
          this.emailResetPassword
        );
        if (user.data.id) {
          try {
            const token = await AuthenticationService.requestToken({
              email: this.emailResetPassword,
            });
            if (token.data) {
              this.tokenAlert = false;
              this.mailSent = true;
            }
          } catch (error) {
            console.log(error.response.data.error);
            this.tokenAlert = true;
            this.tokenAlertMessage = error.response.data.error;
          }
        }
      } catch (error) {
        console.log(error.response.data.error);
        this.tokenAlert = true;
        this.tokenAlertMessage = error.response.data.error;
      }
    },
    async login() {
      try {
        if (!this.email || !this.password) {
          this.error = "Provide login information.";
          return;
        }
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        window.location.replace("/");
      } catch (error) {
        console.log(error.response.data.error);
        this.error = error.response.data.error;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.error {
  color: red;
}
.abbr:hover,
.abbr:active {
  color: #4caf50;
  color: #19689c;
}
.abbr:active,
.abbr:hover {
  outline-width: 0;
}
.logo {
  font-family: fontawesome;
  text-decoration: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 30px;
  letter-spacing: 3px;
  color: #000000;
  display: block;
  top: 17px;
}
// a {
//     color: inherit;
// }
.abbr {
  background-color: transparent;
}
#layoutAuthentication {
  background-color: rgb(255, 255, 255);
}
</style>
