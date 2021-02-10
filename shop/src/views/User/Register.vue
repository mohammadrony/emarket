<template>
  <div>
    <TopHeader />
    <b-container>
      <b-row class="mt-5" align-h="center">
        <b-col cols="7">
          <b-card style="color: #001e5f">
            <h4 style="font-weight: bold">Create Account</h4>
            <b-form @submit.stop.prevent class="mt-4">
              <b-row>
                <b-col>
                  <b-form-group
                    style="font-weight: bold"
                    id="input-group-first-name"
                    label="First Name"
                    label-for="input-first-name"
                  >
                    <b-form-input
                      v-model="firstName"
                      id="input-first-name"
                      type="text"
                      :state="firstNameValidation"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    style="font-weight: bold"
                    id="input-group-last-name"
                    label="Last Name"
                    label-for="input-last-name"
                  >
                    <b-form-input
                      v-model="lastName"
                      id="input-last-name"
                      type="text"
                      :state="lastNameValidation"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
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
                  :state="emailValidation"
                  required
                ></b-form-input>
              </b-form-group>

              <b-row>
                <b-col>
                  <b-form-group
                    style="font-weight: bold"
                    id="input-group-password"
                    label="Password"
                    label-for="input-password"
                  >
                    <b-form-input
                      v-model="password"
                      id="input-password"
                      @keyup="message = null"
                      type="password"
                      :state="newPasswordValidation"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    @submit.stop.prevent
                    style="font-weight: bold"
                    id="input-group-confirm-password"
                    label="Confirm Password"
                    label-for="input-confirm-password"
                  >
                    <b-form-input
                      v-model="confirmPassword"
                      id="input-confirm-password"
                      @keyup="message = null"
                      type="password"
                      :state="confirmPasswordValidation"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col>
                  <b-alert
                    variant="primary"
                    class="my-2 p-1 pl-2"
                    :show="tokenAlert"
                  >
                    {{ message }}
                  </b-alert>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col cols="3"></b-col>
                <b-col cols="6">
                  <b-button
                    style="font-weight: bold"
                    block
                    @click="createAccount"
                    class="p-2"
                    variant="warning"
                    >Create Account</b-button
                  >
                </b-col>
                <b-col cols="3"></b-col>
              </b-row>
            </b-form>
            <hr />
            <b-row>
              <b-col class="text-center">
                <a>Already have an account?</a><a href="/login">&nbsp;Log in</a>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import TopHeader from "@/components/TopHeader.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Register",
  components: {
    TopHeader,
    Footer
  },
  data() {
    return {
      firstName: null,
      firstNameMin: 2,
      firstNameMax: 20,
      lastName: null,
      lastNameMin: 2,
      lastNameMax: 20,
      email: null,
      formatEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      password: null,
      passwordMin: 8,
      passwordMax: 32,
      confirmPassword: null,
      confirmPasswordMin: 8,
      confirmPasswordMax: 32,
      message: null
    };
  },
  computed: {
    tokenAlert() {
      if (this.message == null) return null;
      else if (this.message.length == 0) return false;
      else return true;
    },
    firstNameValidation() {
      if (this.firstName == null) return null;
      else
        return (
          this.firstName.length >= this.firstNameMin &&
          this.firstName.length <= this.firstNameMax
        );
    },
    emailValidation() {
      if (this.email == null) return null;
      return this.formatEmail.test(this.email);
    },
    lastNameValidation() {
      if (this.lastName == null) return null;
      else
        return (
          this.lastName.length >= this.lastNameMin &&
          this.lastName.length <= this.lastNameMax
        );
    },
    newPasswordValidation() {
      if (this.password == null) return null;
      else
        return (
          this.password.length >= this.passwordMin &&
          this.password.length <= this.passwordMax
        );
    },
    confirmPasswordValidation() {
      if (this.confirmPassword == null) return null;
      else
        return (
          this.confirmPassword.length >= this.confirmPasswordMin &&
          this.confirmPassword.length <= this.confirmPasswordMax &&
          this.password == this.confirmPassword
        );
    }
  },
  methods: {
    passwordValidate() {
      if (!this.password) {
        this.message = "Enter a new password.";
        return false;
      } else if (this.password.length < this.passwordMin) {
        this.message =
          "New password must have at least " + this.passwordMin + " character.";
        return false;
      } else if (this.password.length > this.passwordMax) {
        this.message =
          "New password could not have more than " +
          this.passwordMax +
          " character.";
        return false;
      } else if (!this.confirmPassword) {
        this.message = "Enter confirm password.";
        return false;
      } else if (this.confirmPassword.length < this.confirmPasswordMin) {
        this.message =
          "New password must have at least " +
          this.confirmPasswordMin +
          " character.";
        return false;
      } else if (this.confirmPassword.length > this.confirmPasswordMax) {
        this.message =
          "New password could not have more than " +
          this.confirmPasswordMax +
          " character.";
        return false;
      } else if (this.password != this.confirmPassword) {
        this.message = "password not matched.";
        return false;
      } else return true;
    },
    emailVAlidate() {
      if (!this.email) {
        this.message = "Input your email address.";
        return false;
      } else if (!this.formatEmail.test(this.email)) {
        this.message = "Invalid email format.";
        return false;
      } else return true;
    },
    nameValidate() {
      if (!this.firstName || this.firstName.length < this.firstNameMin) {
        this.message = "First Name is too short!";
        return false;
      } else if (this.firstName.length > this.firstNameMax) {
        this.message = "First Name is too long!";
        return false;
      } else if (!this.lastName || this.lastName.length < this.lastNameMin) {
        this.message = "Last Name is too short!";
        return false;
      } else if (this.lastName.length > this.lastNameMax) {
        this.message = "Last Name is too long!";
        return false;
      } else return true;
    },
    async createAccount() {
      if (!this.nameValidate()) return;
      if (!this.emailVAlidate()) return;
      if (!this.passwordValidate()) return;
      try {
        const response = await AuthenticationService.register({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch("CurrentUser/setToken", response.data.token);
        this.$store.dispatch("CurrentUser/setUser", response.data.user);
        window.location.replace("/");
      } catch (error) {
        this.message = error.response.data.error;
      }
    }
  }
};
</script>

<style scoped lang="scss">
</style>
