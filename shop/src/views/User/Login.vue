<template>
  <div>
    <TopHeader />
    <b-container>
      <b-row class="mt-5" align-h="center">
        <b-col cols="5">
          <b-card style="color: #001e5f">
            <h4 style="font-weight: bold">Login</h4>
            <b-form class="mt-4">
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
                  ref="emailField"
                  @keyup="error = null"
                  @keyup.enter="login"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                style="font-weight: bold"
                id="input-group-password"
                label="Password"
                label-for="input-password"
              >
                <b-form-input
                  v-model="password"
                  id="input-password"
                  type="password"
                  @keyup="error = null"
                  @keyup.enter="login"
                  required
                ></b-form-input>
              </b-form-group>
              <h6 style="color: #f00">
                {{ error }}
              </h6>
              <b-row>
                <b-col cols="3"></b-col>
                <b-col cols="6">
                  <b-button
                    style="font-weight: bold"
                    block
                    class="p-2 mt-2"
                    @click="login"
                    variant="warning"
                    >Login</b-button
                  >
                </b-col>
                <b-col cols="3"></b-col>
              </b-row>
            </b-form>
            <b-row class="mt-2">
              <b-col class="text-center">
                <small>
                  <b-link v-b-toggle.collapse-requestToken>
                    forget your password?
                  </b-link>
                </small>
              </b-col>
            </b-row>
            <b-collapse id="collapse-requestToken">
              <ReqPassToken/>
            </b-collapse>
            <hr />
            <b-row>
              <b-col class="text-center">
                <a>New Customer?</a
                ><a href="/register">&nbsp;Create your account</a>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <Footer class="mt-5" />
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService.js";
import TopHeader from "@/components/TopHeader.vue";
import ReqPassToken from "@/components/User/ReqPassToken.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Login",
  components: {
    TopHeader,
    ReqPassToken,
    Footer
  },
  data() {
    return {
      email: null,
      password: null,
      error: null
    };
  },
  mounted() {
    this.$refs.emailField.focus();
  },
  methods: {
    async login() {
      try {
        if (!this.email || !this.password) {
          this.error = "Provide login information.";
          return;
        }
        const response = (
          await AuthenticationService.login({
            email: this.email,
            password: this.password
          })
        ).data;
        this.$store.dispatch("CurrentUser/setToken", response.token);
        this.$store.dispatch("CurrentUser/setUser", response.user);
        window.location.replace("/");
      } catch (error) {
        console.log(error.response.data.error);
        this.error = error.response.data.error;
      }
    }
  }
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
#layoutAuthentication {
  background-color: rgb(255, 255, 255);
}
</style>
