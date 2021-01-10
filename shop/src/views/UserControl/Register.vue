<template>
  <div>
    <div>
      <TopHeader />
      <b-container>
        <b-row class="mt-4" align-h="center">
          <b-col cols="7">
            <b-card>
              <b-card-header class="pt-3">
                <b-row align-h="center"><h2>Create Account</h2></b-row>
              </b-card-header>
              <b-form class="mt-3">
                <b-row>
                  <b-col>
                    <b-form-group
                      id="input-group-first-name"
                      label="First Name"
                      label-for="input-first-name"
                    >
                      <b-form-input
                        v-model="firstName"
                        id="input-first-name"
                        type="text"
                        placeholder="your first name"
                        required
                      ></b-form-input>
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
                        placeholder="your last name"
                        required
                      ></b-form-input>
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
                    placeholder="Enter email address"
                    required
                  ></b-form-input>
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
                        @keyup="typingPassword"
                        placeholder="Enter password"
                        required
                      ></b-form-input>
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
                        @keyup="checkPasswordMatch"
                        @keyup.enter="register"
                        placeholder="Confirm password"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-text :text-variant="variant" v-html="message">
                    </b-form-text>
                  </b-col>
                </b-row>
                <b-row class="mt-3">
                  <b-col>
                    <b-button block variant="primary" @click="register"
                      >Create Account</b-button
                    >
                  </b-col>
                </b-row>
              </b-form>
              <hr />
              <b-row align-h="center">
                <small><a href="/login">Have an account? Go to login</a></small>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
      <Footer class="mt-5" />
    </div>
    <div class="register">
      <div id="layoutAuthentication">
        <a class="mt-4 ml-4 mb-2 logo abbr" href="/">{{ shop.name }}</a>

        <div id="layoutAuthentication_content">
          <main>
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-7">
                  <div class="card shadow-lg border-0 rounded-lg">
                    <div class="card-header">
                      <h3 class="text-center font-weight-light my-4">
                        Create Account
                      </h3>
                    </div>
                    <div class="card-body">
                      <form>
                        <div class="form-row">
                          <div class="col-md-6">
                            <div class="form-group">
                              <label class="small mb-1" for="inputFirstName"
                                >First Name</label
                              >
                              <input
                                class="form-control py-4"
                                id="inputFirstName"
                                type="text"
                                v-model="firstName"
                                placeholder="Enter first name"
                              />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label class="small mb-1" for="inputLastName"
                                >Last Name</label
                              >
                              <input
                                class="form-control py-4"
                                id="inputLastName"
                                type="text"
                                v-model="lastName"
                                placeholder="Enter last name"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="small mb-1" for="inputEmailAddress"
                            >Email</label
                          >
                          <input
                            class="form-control py-4"
                            id="inputEmailAddress"
                            type="email"
                            aria-describedby="emailHelp"
                            v-model="email"
                            placeholder="Enter email address"
                          />
                        </div>
                        <div class="form-row">
                          <div class="col-md-6">
                            <div class="form-group">
                              <label class="small mb-1" for="inputPassword"
                                >Password</label
                              >
                              <input
                                class="form-control py-4"
                                id="inputPassword"
                                type="password"
                                v-model="password"
                                placeholder="Enter password"
                              />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label
                                class="small mb-1"
                                for="inputConfirmPassword"
                                >Confirm Password</label
                              >
                              <input
                                class="form-control py-4"
                                id="inputConfirmPassword"
                                type="password"
                                v-model="confirmPassword"
                                placeholder="Confirm password"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="error" v-html="error" />
                        <div class="form-group mt-4 mb-0">
                          <b-button variant="primary" block @click="register"
                            >Create Account</b-button
                          >
                        </div>
                      </form>
                    </div>
                    <div class="card-footer text-center">
                      <div class="small">
                        <a href="/login">Have an account? Go to login</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div id="layoutAuthentication_footer">
          <footer class="py-4 bg-light mt-auto">
            <div class="container-fluid">
              <div
                class="d-flex align-items-center justify-content-between small"
              >
                <div class="text-muted">Copyright &copy; Your Website 2020</div>
                <div>
                  <a href="#">Privacy Policy</a>
                  &middot;
                  <a href="#">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import TopHeader from "@/components/TopHeader.vue";
import Footer from "@/components/Footer.vue";
import store from "@/store";

export default {
  name: "Register",
  components: {
    TopHeader,
    Footer,
  },
  data() {
    return {
      shop: store.state.shop,
      firstName: "",
      lastName: "",
      email: null,
      password: null,
      confirmPassword: null,
      message: null,
      variant: null,
      error: null,
    };
  },

  methods: {
    typingPassword() {
      this.message = null;
      this.variant = "primary";
    },
    checkPasswordMatch() {
      if (this.password != this.confirmPassword) {
        this.message = "password not matched.";
        this.variant = "danger";
        return false;
      } else {
        this.message = "password matched.";
        this.variant = "success";
        return true;
      }
    },
    checkNameLength() {
      if (this.firstName.length < 2) {
        this.variant = "info";
        this.message = "First Name is too short!";
        return false;
      } else if (this.firstName.length > 32) {
        this.variant = "info";
        this.message = "First Name is too long!";
        return false;
      } else if (this.lastName.length < 2) {
        this.variant = "info";
        this.message = "Last Name is too short!";
        return false;
      } else if (this.lastName.length > 32) {
        this.variant = "info";
        this.message = "Last Name is too long!";
        return false;
      }
      else return true;
    },
    async register() {
      if(!this.checkNameLength())return;
      if(!this.checkPasswordMatch())return;
      try {
        const response = await AuthenticationService.register({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          isAdmin: false,
        });

        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);

        this.$bvModal.hide("register-modal");
        window.location.replace("/");
      } catch (error) {
        this.variant = "danger";
        this.message = error.response.data.error;
      }
    },
  },
};
</script>

<style scoped lang="scss">
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
</style>
