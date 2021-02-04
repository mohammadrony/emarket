<template>
  <div>
    <div class="p-2 mt-2" style="background-color: #f4f6f8">
      <b-form @submit.prevent="requestToken">
        <b-form-group
          @submit.prevent="requestToken"
          class="mb-2"
          style="font-weight: bold"
          label="Enter your email address"
          label-for="input-email-for-token"
        >
          <b-form-input
            v-model="emailResetPassword"
            id="input-email-for-token"
            @keyup="mailSent = false"
            type="email"
            required
          ></b-form-input>
        </b-form-group>
        <a>we will send you a link to reset your password.</a><br />
        <b-alert variant="primary" class="my-2 p-1 pl-2" :show="tokenAlert">
          {{ tokenAlertMessage }}
        </b-alert>
        <b-button class="mt-2" variant="outline-info" @click="requestToken">
          <strong>Submit</strong>
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
export default {
  name: "RequestToken",
  components: {},
  data() {
    return {
      emailResetPassword: null,
      tokenAlert: null,
      mailSent: false,
      tokenAlertMessage: null,
    };
  },
  mounted() {},
  methods: {
    async requestToken() {
      try {
        this.mailSent = false;
        const user = (await AuthenticationService.validUser(
          this.emailResetPassword
        )).data;
        if (user.id) {
          try {
            const token = (await AuthenticationService.requestToken({
              email: this.emailResetPassword,
            })).data;
            if (token) {
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
  },
  computed: {},
};
</script>

<style lang="sass" scoped>
</style>