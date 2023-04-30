<template>
  <div>
    <div class="p-2 mt-2" style="background-color: #f4f6f8">
      <b-form @submit.stop.prevent="requestPasswordToken">
        <b-form-group
          class="mb-2 font-weight-bold"
          label="Enter your email address"
          label-for="input-email-for-token"
        >
          <b-form-input
            v-model="emailResetPassword"
            ref="emailField2"
            id="input-email-for-token"
            @keyup="mailSent = false"
            type="email"
            required
          />
        </b-form-group>
        <small>We will send you a link to reset your password.</small><br />
        <b-alert variant="primary" class="my-2 p-1 pl-2" :show="tokenAlert">
          {{ tokenAlertMessage }}
        </b-alert>
        <b-button class="mt-2" variant="outline-dark" type="submit">
          Submit
        </b-button>
        <b-card class="mt-3" v-if="mailSent">
          <div><strong>Request accepted</strong></div>
          <hr class="my-1" />
          <div>
            Check your email for a link to reset your password. If it doesn’t
            appear within a few minutes, check your spam folder.
          </div>
        </b-card>
      </b-form>
    </div>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService.js";
import UserService from "@/services/UserService.js";
export default {
  name: "ReqPassToken",
  components: {},
  data() {
    return {
      emailResetPassword: null,
      tokenAlert: null,
      mailSent: false,
      tokenAlertMessage: null,
    };
  },
  computed: {},
  methods: {
    async requestPasswordToken() {
      var user;
      try {
        this.mailSent = false;
        user = (await UserService.getUserByEmail(this.emailResetPassword)).data;
      } catch (error) {
        this.tokenAlert = true;
        this.tokenAlertMessage = error.response.data.error;
      }
      if (user) {
        try {
          await AuthenticationService.requestPasswordToken({
            email: this.emailResetPassword,
          });
          this.tokenAlert = false;
          this.mailSent = true;
          this.emailResetPassword = "";
        } catch (error) {
          this.tokenAlert = true;
          this.tokenAlertMessage = error.response.data.error;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
