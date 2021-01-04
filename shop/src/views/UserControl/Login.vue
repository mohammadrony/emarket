<template>
  <div id="layoutAuthentication">
    <a class="m-4 logo abbr" href="/">{{ shop.name }}</a>
    <div id="layoutAuthentication_content">
      <main>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-5">
              <div class="card shadow-lg border-0 rounded-lg m-4">
                <div class="card-header">
                  <h3 class="text-center font-weight-light my-2">Login</h3>
                </div>
                <div class="card-body">
                  <form>
                    <div class="form-group">
                      <label class="small mb-1" for="inputEmailAddress"
                        >Email</label
                      >
                      <input
                        class="form-control py-4"
                        id="inputEmailAddress"
                        type="email"
                        v-model="email"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div class="form-group">
                      <label class="small mb-1" for="inputPassword"
                        >Password</label
                      >
                      <input
                        class="form-control py-4"
                        id="inputPassword"
                        type="password"
                        @keyup.enter="login"
                        v-model="password"
                        placeholder="Enter password"
                      />
                    </div>
                    <div class="error" v-html="error"></div>
                    <div class="form-group">
                      <div class="custom-control custom-checkbox">
                        <input
                          class="custom-control-input"
                          id="rememberPasswordCheck"
                          type="checkbox"
                        />
                        <label
                          class="custom-control-label"
                          for="rememberPasswordCheck"
                          >Remember password</label
                        >
                      </div>
                    </div>
                    <div
                      class="form-group d-flex align-items-center justify-content-between mt-1 mb-0"
                    >
                      <a class="small" href="/forget-password"
                        >Forgot Password?</a
                      >
                      <b-button variant="primary" @click="login"
                        >Login</b-button
                      >
                    </div>
                  </form>
                </div>
                <div class="card-footer text-center">
                  <div class="small">
                    <a href="/register">Need an account? Sign up!</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <div id="layoutAuthentication_footer">
      <footer class="py-4 bg-light mt-5">
        <div class="container-fluid">
          <div class="d-flex align-items-center justify-content-between small">
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
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import store from "@/store";

export default {
  name: "Login",
  data() {
    return {
      shop: store.state.shop,
      email: null,
      password: null,
      error: null,
    };
  },

  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        if(response.data.user.isAdmin){
          window.location.replace("/admin");
        }
        else {
          window.location.replace("/");
        }
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
