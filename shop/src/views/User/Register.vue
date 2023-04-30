<template>
  <div>
    <TopHeader />
    <b-container class="mt-5">
      <b-row align-h="center">
        <b-col cols="7">
          <b-card style="color: #001e5f">
            <h4 class="font-weight-bold">Create Account</h4>
            <b-form @submit.stop.prevent="createAccount" class="mt-4">
              <b-row>
                <b-col>
                  <b-form-group
                    id="input-group-first-name"
                    label="First Name"
                    label-for="input-first-name"
                  >
                    <b-form-input
                      v-model="firstName"
                      ref="firstNameField"
                      id="input-first-name"
                      type="text"
                      :state="firstNameValidation"
                      required
                    />
                    <b-form-invalid-feedback
                      v-if="firstName"
                      :state="firstNameValidation"
                    >
                      Your first name could be 15 character long.
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
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
                    />
                    <b-form-invalid-feedback
                      v-if="lastName"
                      :state="lastNameValidation"
                    >
                      Your last name could be 15 character long.
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-form-group
                id="input-group-email"
                label="Email"
                label-for="input-email"
              >
                <b-form-input
                  v-model="email"
                  id="input-email"
                  type="email"
                  @keyup="validEmail = true"
                  :state="validEmail && emailValidation"
                  required
                />
                <b-form-invalid-feedback
                  v-if="email"
                  :state="validEmail && emailValidation"
                >
                  {{ emailMessage }}
                </b-form-invalid-feedback>
              </b-form-group>

              <b-row>
                <b-col>
                  <b-form-group
                    id="input-group-password"
                    label="Password"
                    label-for="input-password"
                  >
                    <b-form-input
                      v-model="password"
                      id="input-password"
                      type="password"
                      :state="newPasswordValidation"
                      required
                    />
                    <b-form-invalid-feedback
                      v-if="password"
                      :state="newPasswordValidation"
                    >
                      Your password could be 8-32 character long, contain
                      letters, numbers and must not contain space.
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    id="input-group-confirm-password"
                    label="Confirm Password"
                    label-for="input-confirm-password"
                  >
                    <b-form-input
                      v-model="confirmPassword"
                      id="input-confirm-password"
                      type="password"
                      :state="confirmPasswordValidation"
                      required
                    />
                    <b-form-invalid-feedback
                      v-if="confirmPassword"
                      :state="confirmPasswordValidation"
                    >
                      Password didn't match
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row class="mt-3">
                <b-col cols="3" />
                <b-col cols="6">
                  <b-button block type="submit" class="p-2" variant="warning">
                    Create Account
                  </b-button>
                </b-col>
                <b-col cols="3" />
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
    <MyFooter class="mt-5" />
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService.js";
import TopHeader from "@/components/Common/TopHeader.vue";
import MyFooter from "@/components/Common/MyFooter.vue";
export default {
  name: "Register",
  components: {
    TopHeader,
    MyFooter,
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      formatName: /^.{1,15}$/,
      formatEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      formatPassword: /^[a-zA-z0-9]{8,32}$/,
      password: null,
      validEmail: true,
      confirmPassword: null,
      emailMessage: null,
    };
  },
  mounted() {
    this.$refs.firstNameField.focus();
  },
  computed: {
    tokenAlert() {
      if (this.message == null) return null;
      else if (this.message.length == 0) return false;
      else return true;
    },
    firstNameValidation() {
      if (this.firstName == null) return null;
      else if (!this.formatName.test(this.firstName)) return false;
      else return true;
    },
    lastNameValidation() {
      if (this.lastName == null) return null;
      else if (!this.formatName.test(this.lastName)) return false;
      else return true;
    },
    emailValidation() {
      if (this.email == null) return null;
      else if (!this.formatEmail.test(this.email)) return false;
      else return true;
    },
    newPasswordValidation() {
      if (this.password == null) return null;
      else if (!this.formatPassword.test(this.password)) return false;
      else return true;
    },
    confirmPasswordValidation() {
      if (this.confirmPassword == null) return null;
      else if (
        this.confirmPassword != this.password ||
        !this.formatPassword.test(this.confirmPassword)
      )
        return false;
      else return true;
    },
  },
  methods: {
    async createAccount() {
      if (
        !this.firstNameValidation ||
        !this.lastNameValidation ||
        !this.emailValidation ||
        !this.newPasswordValidation ||
        !this.confirmPasswordValidation
      )
        return;
      try {
        const user = await AuthenticationService.register({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch("CurrentUser/setNewUserId", user.data.id);
        this.$store.dispatch("CurrentUser/setNewUserEmail", this.email);

        this.$router.push({ path: "/user-verify" });
      } catch (error) {
        this.validEmail = false;
        this.emailMessage = error.response.data.error;
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
