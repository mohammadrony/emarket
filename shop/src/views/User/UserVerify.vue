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

          <b-card v-if="userId != 0" style="color: #001e5f">
            <b-card
              border-variant="info"
              header="Verify email"
              header-bg-variant="info"
              header-text-variant="white"
              header-class="text-center"
            >
              <b-form @submit.stop.prevent="verifyRegsToken">
                <label for="input-verification-code">
                  Enter the code we send to <strong>{{ userEmail }}.</strong>
                  If it doesn’t appear within a few minutes, check your spam
                  folder.
                </label>
                <b-form-input
                  id="input-verification-code"
                  placeholder="your 8 character code"
                  v-model="registerToken"
                  required
                  :state="registerTokenValidation"
                />
                <b-button class="mt-3" type="submit" variant="success">
                  Submit
                </b-button>
              </b-form>
            </b-card>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <Footer class="mt-5" />
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService.js";
import TopHeader from "@/components/Common/TopHeader.vue";
import Footer from "@/components/Common/Footer.vue";
export default {
  name: "UserVerify",
  components: {
    TopHeader,
    Footer
  },
  data() {
    return {
      userId: 0,
      userEmail: "",
      tokenFormat: /^[a-zA-Z0-9]{8,16}$/,
      registerToken: ""
    };
  },
  computed: {
    registerTokenValidation() {
      if (!this.registerToken) return null;
      else if (!this.tokenFormat.test(this.registerToken)) return false;
      else return true;
    }
  },
  async mounted() {
    this.userId = this.$store.state.CurrentUser.newUserId;
    this.userEmail = this.$store.state.CurrentUser.newUserEmail;
  },
  methods: {
    async verifyRegsToken() {
      var user;
      try {
        user = (
          await AuthenticationService.verifyRegsToken({
            userId: this.userId,
            registerToken: this.registerToken
          })
        ).data;
      } catch (error) {
        console.log(error.response.data.error);
      }
      if (user) {
        try {
          await AuthenticationService.resetRegsToken({
            id: this.userId
          });
          this.$store.dispatch("CurrentUser/setToken", user.token);
          this.$store.dispatch("CurrentUser/setUser", user.user);
          this.$router.push({ path: "/" });
        } catch (error) {
          console.log(error.response.data.error);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
