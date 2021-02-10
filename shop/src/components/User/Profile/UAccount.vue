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
        ref="passwordField"
        v-model="userDeletePasscode"
        id="input-password"
      >
      </b-form-input>
      <b-alert class="my-2" v-if="deleteAccountError">{{
        deleteAccountError
      }}</b-alert>
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
import ReviewService from "@/services/ReviewService.js";
export default {
  name: "UAccount",
  components: {},
  data() {
    return {
      userId: 0,
      deleteAccountError: "",
      userDeletePasscode: null
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
      try {
        const response = await ReviewService.deleteReviewByUser();
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data.error);
      }
      try {
        await AuthenticationService.deleteAccount(this.userDeletePasscode);
        window.location.replace("/");
      } catch (error) {
        this.deleteAccountError = error.response.data.error;
        console.log(error.response.data.error);
      }
    }
  },
  computed: {}
};
</script>

<style lang="sass" scoped>
</style>