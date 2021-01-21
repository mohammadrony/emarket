<template>
  <div>
    <TopHeader />
    <b-container>
      <b-row class="m-5">
        <b-col cols="6">
          <b-card v-if="!tokenValidate">
            <h5 class="text-center"><strong>Reset your password</strong></h5>
            <b-alert v-if="tokenList" class="mt-4" variant="warning" show>
              <small>
                It looks like you clicked on an invalid password reset link.
                Please try again.
              </small>
            </b-alert>
            <div class="p-2 mt-2" style="background-color: #f4f6f8">
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
                <div>
                  Check your email for a link to reset your password. If it
                  doesn’t appear within a few minutes, check your spam folder.
                  <b-button
                    class="text-center mt-3 mb-2"
                    to="/login"
                    variant="outline-info"
                    >Return to Log in</b-button
                  >
                </div>
              </div>
            </div>
          </b-card>

          <b-card v-if="tokenValidate" style="color: #001e5f">
            <h4 style="font-weight: bold">Change password for {{ email }}</h4>
            <b-form class="mt-4">
              <b-form-group
                style="font-weight: bold"
                id="input-group-password"
                label="New password"
                label-for="input-password"
              >
                <b-form-input
                  v-model="newPassword"
                  id="input-password"
                  type="password"
                  @keyup="error = null"
                  @keyup.enter="passwordReset"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                style="font-weight: bold"
                id="input-group-2-password"
                label="Confirm password"
                label-for="input-2-password"
              >
                <b-form-input
                  v-model="confirmPassword"
                  id="input-2-password"
                  type="password"
                  @keyup="error = null"
                  @keyup.enter="passwordReset"
                  required
                ></b-form-input>
              </b-form-group>
              <h6 style="color: #f00">
                {{ error }}
              </h6>
              <b-row>
                <b-col cols="6">
                  <b-button
                    style="font-weight: bold"
                    block
                    class="p-2 mt-2"
                    @click="passwordReset"
                    variant="warning"
                    >Submit</b-button
                  >
                </b-col>
                <b-col cols="3"></b-col>
                <b-col cols="3"></b-col>
              </b-row>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import Footer from "@/components/Footer.vue";
import AuthenticationService from "@/services/AuthenticationService.js";
import store from "@/store";

export default {
  name: "ResetPassword",
  components: {
    TopHeader,
    Footer,
  },
  data() {
    return {
      shop: store.state.shop,
      tokenList: false,
      error: null,
      userId: null,
      emailResetPassword: null,
      tokenAlert: null,
      mailSent: false,
      name: null,
      tokenAlertMessage: null,
      email: null,
      newPassword: null,
      confirmPassword: null,
      tokenValidate: false,
    };
  },
  async mounted() {
    const token = this.$store.state.route.params.token;
    if (token) {
      try {
        this.tokenList = true;
        this.tokenValidate = true;
        const user = (await AuthenticationService.verifyToken(token)).data;
        if (user.resetPasswordToken === token) {
          this.tokenValidate = true;
          this.userId = user.id;
          this.name = user.firstName + " " + user.lastName;
          this.email = user.email;
        }
        console.log("token", token);
      } catch (error) {
        this.tokenValidate = false;
        console.log(error.response.data.error);
      }
    } else {
      this.tokenList = false;
      console.log(this.tokenList);
    }
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
    async passwordReset() {
      console.log(
        this.newPassword,
        this.confirmPassword,
        this.newPassword.length
      );
      if (this.newPassword != this.confirmPassword) {
        this.error = "Password didn't match!";
      } else if (this.newPassword.length < 8) {
        this.error = "Password must have at least 8 character.";
      } else if (this.newPassword.length > 32) {
        this.error = "Password could not have over 32 character.";
      } else {
        try {
          await AuthenticationService.resetPassword({
            id: this.userId,
            email: this.email,
            name: this.name,
            password: this.newPassword,
          }).data;
        } catch (error) {
          console.log("error reset pass", error.response.data.error);
        }
        try {
          const response = await AuthenticationService.login({
            email: this.email,
            password: this.newPassword,
          });
          this.$store.dispatch("setToken", response.data.token);
          this.$store.dispatch("setUser", response.data.user);
          window.location.replace("/");
        } catch (error) {
          console.log(error.response.data.error);
        }
      }
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
#layoutAuthentication_footer {
  margin-top: 120px;
}
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
