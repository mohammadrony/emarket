<template>
  <div>
    <TopHeader />
    <b-container>
      <!-- <b-row class="mt-4">
        <b-col class="text-center">
          <h3>Login</h3>
        </b-col>
      </b-row> -->
      <b-row class="mt-5" align-h="center">
        <b-col cols="5">
          <b-card>
            <b-card-header class="pt-3">
              <b-row align-h="center"><h2>Login</h2></b-row>
            </b-card-header>
            <b-form class="mt-3">
              <b-form-group
                id="input-group-email"
                label="Email"
                label-for="input-email"
                description="We'll never share your email with anyone else."
              >
                <b-form-input
                  v-model="email"
                  id="input-email"
                  type="email"
                  @keyup.enter="login"
                  placeholder="Enter email address"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-password"
                label="Password"
                label-for="input-password"
              >
                <b-form-input
                  v-model="password"
                  id="input-password"
                  type="password"
                  @keyup.enter="login"
                  placeholder="Enter password"
                  required
                ></b-form-input>
              </b-form-group>
              <h6 style="color: #f00">
                {{ error }}
              </h6>

              <b-row align-v="center" class="mt-3">
                <b-col cols="4">
                  <b-button block variant="primary" @click="login"
                    >Login</b-button
                  >
                </b-col>
                <b-col cols="2"></b-col>
                <b-col cols="6">
                  <small
                    ><a href="/register">Need an account? Sign up!</a></small
                  >
                </b-col>
              </b-row>
            </b-form>
            <hr />
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <Footer class="mt-5" />
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import TopHeader from "@/components/TopHeader.vue";
import Footer from "@/components/Footer.vue";
import store from "@/store";

export default {
  name: "Login",
  components: {
    TopHeader,
    Footer,
  },
  data() {
    return {
      shop: store.state.shop,
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        if (!this.email || !this.password) {
          this.error = "Provide login information.";
          return;
        }
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        // if (response.data.user.isAdmin) {
        //   window.location.replace("/admin");
        // } else {
        window.location.replace("/");
        // }
      } catch (error) {
        console.log(error.response.data.error);
        this.error = error.response.data.error;
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
#layoutAuthentication {
  background-color: rgb(255, 255, 255);
}
</style>
