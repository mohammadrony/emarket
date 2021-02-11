<template>
  <div>
    <b-row>
      <b-col>
        <h5>Account</h5>
      </b-col>
    </b-row>
    <hr class="my-2" />
    <div class="mt-3">
      Once you delete your account, you'll not be able to revert it.
      <br />
      <b-button
        v-b-modal.delete-account-confirmation
        class="mt-3"
        variant="outline-danger"
      >
        Close my account
      </b-button>
    </div>
    <b-modal
      @shown="focusPasswordField"
      hide-footer
      id="delete-account-confirmation"
    >
      <template #modal-title>
        Are you sure you want to do this?
      </template>
      <p>
        We'll also delete all of your activity from our server.
      </p>

      <label for="input-password"
        >To be sure please enter your <strong>current password</strong></label
      >
      <b-form-input
        type="password"
        @keyup="modalAlert = false"
        ref="passwordField"
        v-model="currentPassword"
        id="input-password"
      >
      </b-form-input>
      <b-alert :show="modalAlert" variant="primary" class="my-2 p-1 pl-2">
        {{ deleteAccountError }}
      </b-alert>
      <b-row class="mt-3">
        <b-col cols="4"></b-col>
        <b-col cols="4">
          <b-button
            @click="$bvModal.hide('delete-account-confirmation')"
            block
            variant="warning"
          >
            Cancel
          </b-button>
        </b-col>
        <b-col cols="4">
          <b-button block @click="deleteAccount" variant="danger">
            Delete Account
          </b-button>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService.js";
import UserService from "@/services/UserService.js";
import ReviewService from "@/services/ReviewService.js";
export default {
  name: "UAccount",
  components: {},
  data() {
    return {
      userId: 0,
      modalAlert: null,
      deleteAccountError: "",
      currentPassword: null
    };
  },
  mounted() {
    this.userId = this.$store.state.CurrentUser.userId;
  },
  methods: {
    focusPasswordField() {
      this.$refs.passwordField.focus();
    },
    async deleteAccount() {
      var correctPassword = false;
      try {
        correctPassword = (
          await AuthenticationService.verifyPassword(this.currentPassword)
        ).data.correctPassword;
      } catch (error) {
        this.modalAlert = true;
        this.deleteAccountError = error.response.data.error;
        console.log(error.response.data.error);
      }
      if (correctPassword) {
        try {
          await ReviewService.deleteReviewByUser();
        } catch (error) {
          console.log(error.response.data.error);
        }
        try {
          await UserService.deleteAccount();
        } catch (error) {
          this.modalAlert = true;
          this.deleteAccountError = error.response.data.error;
          console.log(error.response.data.error);
        }
        this.$store.dispatch("CurrentUser/setToken", null);
        this.$store.dispatch("CurrentUser/setUser", null);
        window.location.replace("/");
      }
    }
  },
  computed: {}
};
</script>

<style lang="sass" scoped>
</style>