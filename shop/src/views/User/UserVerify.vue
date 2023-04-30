<template>
  <div>
    <TopHeader />
    <b-container class="mt-5">
      <b-row>
        <b-col cols="6">
          <b-card v-if="userId == 0">
            <h5 class="text-center"><strong>Email Verification</strong></h5>
            <b-alert class="mt-4" variant="warning" show>
              <small>
                Please try to
                <b-link to="/register">Create your account</b-link>
                first.
              </small>
            </b-alert>
          </b-card>

          <b-card
            style="color: #001e5f"
            v-if="userId != 0"
            border-variant="info"
            header="Verify email"
            header-bg-variant="info"
            header-text-variant="white"
            header-class="text-center"
          >
            <b-form @submit.stop.prevent="verifyRegsToken">
              <b-form-group>
                <label for="input-verification-code">
                  Enter the code we send to <strong>{{ userEmail }}.</strong> If
                  it doesn’t appear within a few minutes, check your spam folder
                </label>
                <b-form-input
                  id="input-verification-code"
                  v-model="registerToken"
                  required
                  :state="registerTokenValidation"
                />
                <b-form-invalid-feedback :state="registerTokenValidation">
                  {{ codeVerificationMessage }}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-button type="submit" variant="success"> Submit </b-button>
              <div class="mt-4">
                you can resend the verification code if you have not received
                the email.
                <br />
                <b-button
                  class="mt-2"
                  size="sm"
                  variant="info"
                  @click="tryAgain"
                >
                  Resend Email
                </b-button>
              </div>
            </b-form>
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
import MyFooter from "@/components/Common/MyFooter.vue";
export default {
  name: "UserVerify",
  components: {
    TopHeader,
    MyFooter,
  },
  data() {
    return {
      userId: 0,
      userEmail: "",
      registerTokenValidation: null,
      codeVerificationMessage: "",
      registerToken: "",
    };
  },
  computed: {},
  async mounted() {
    this.userId = this.$store.state.CurrentUser.newUserId;
    this.userEmail = this.$store.state.CurrentUser.newUserEmail;
  },
  methods: {
    async tryAgain() {
      try {
        const user = (
          await AuthenticationService.checkRegsToken({
            email: this.userEmail,
            password: this.$store.state.CurrentUser.newUserPassword,
          })
        ).data;
        if (user.verificationStatus) {
          this.$router.push({ path: "/login" });
        } else {
          window.location.reload();
        }
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    async verifyRegsToken() {
      var user;
      try {
        user = (
          await AuthenticationService.verifyRegsToken({
            userId: this.userId,
            registerToken: this.registerToken,
          })
        ).data;
      } catch (error) {
        this.registerTokenValidation = false;
        this.codeVerificationMessage = error.response.data.error;
      }
      if (user) {
        try {
          await AuthenticationService.resetRegsToken({
            id: user.user.id,
            email: user.user.email,
            name: user.user.firstName + " " + user.user.lastName,
          });
          this.$store.dispatch("CurrentUser/setToken", user.token);
          this.$store.dispatch("CurrentUser/setUser", user.user);
          this.$store.dispatch("Wishlist/setWishlist");
          this.$store.dispatch("CurrentUser/setNewUserId", 0);
          this.$store.dispatch("CurrentUser/setNewUserEmail", "");
          this.$router.push({ path: "/" });
        } catch (error) {
          console.log(error.response.data.error);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
