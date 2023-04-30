<template>
  <div>
    <TopHeader />
    <b-container class="mt-5">
      <b-row class="ml-5">
        <b-col cols="10" md="8" lg="6">
          <b-card v-if="!tokenValidate">
            <h5 class="text-center"><strong>Reset your password</strong></h5>
            <b-alert class="mt-4" variant="warning" show>
              <small>
                It looks like you clicked on an invalid password reset link.
                <br />
                <b-link to="/login">
                  Login here
                  <b-icon icon="arrow-right" />
                </b-link>
              </small>
            </b-alert>
          </b-card>

          <b-card v-if="tokenValidate" style="color: #001e5f">
            <h4 class="font-weight-bold">Change password for {{ email }}</h4>
            <b-form @submit.stop.prevent="passwordReset" class="mt-4">
              <b-form-group
                class="font-weight-bold"
                id="input-group-password"
                label="New password"
                label-for="input-password"
              >
                <b-form-input
                  v-model="newPassword"
                  id="input-password"
                  type="password"
                  required
                  :state="newPasswordValidation"
                />
                <b-form-invalid-feedback
                  v-if="newPassword"
                  :state="newPasswordValidation"
                >
                  Your password could be 8-32 character long, contain letters,
                  numbers and must not contain space.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                class="font-weight-bold"
                id="input-group-2-password"
                label="Confirm password"
                label-for="input-2-password"
              >
                <b-form-input
                  v-model="confirmPassword"
                  id="input-2-password"
                  type="password"
                  required
                  :state="confirmPasswordValidation"
                />
                <b-form-invalid-feedback
                  v-if="confirmPassword"
                  :state="confirmPasswordValidation"
                >
                  Password didn't match
                </b-form-invalid-feedback>
              </b-form-group>
              <b-row>
                <b-col cols="6">
                  <b-button
                    class="p-2 mt-2 font-weight-bold"
                    block
                    type="submit"
                    variant="warning"
                  >
                    Submit
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <MyFooter class="mt-5" />
  </div>
</template>

<script>
import TopHeader from "@/components/Common/TopHeader.vue";
import MyFooter from "@/components/Common/MyFooter.vue";
import AuthenticationService from "@/services/AuthenticationService.js";
export default {
  name: "ResetPassword",
  components: {
    TopHeader,
    MyFooter,
  },
  data() {
    return {
      userId: null,
      emailResetPassword: null,
      mailSent: false,
      name: null,
      email: null,
      newPassword: null,
      formatPassword: /^[a-zA-z0-9]{8,32}$/,
      confirmPassword: null,
      tokenValidate: true,
    };
  },
  computed: {
    newPasswordValidation() {
      if (this.newPassword == null) return null;
      else if (!this.formatPassword.test(this.newPassword)) return false;
      else return true;
    },
    confirmPasswordValidation() {
      if (this.confirmPassword == null) return null;
      else if (
        this.confirmPassword != this.newPassword ||
        !this.formatPassword.test(this.confirmPassword)
      )
        return false;
      else return true;
    },
  },
  async mounted() {
    const token = this.$route.params.token;
    try {
      const user = (await AuthenticationService.verifyPasswordToken(token))
        .data;
      this.userId = user.id;
      this.name = user.firstName + " " + user.lastName;
      this.email = user.email;
    } catch (error) {
      this.tokenValidate = false;
      console.log(error.response.data.error);
    }
  },
  methods: {
    async passwordReset() {
      if (!this.newPasswordValidation || !this.confirmPasswordValidation)
        return;
      try {
        await AuthenticationService.resetPassword({
          id: this.userId,
          email: this.email,
          name: this.name,
          password: this.newPassword,
        });
      } catch (error) {
        console.log(error.response.data.error);
      }
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.newPassword,
        });
        this.$store.dispatch("CurrentUser/setToken", response.data.token);
        this.$store.dispatch("CurrentUser/setUser", response.data.user);
        this.$store.dispatch("Wishlist/setWishlist");
        this.$router.push({ path: "/" });
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
  },
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
