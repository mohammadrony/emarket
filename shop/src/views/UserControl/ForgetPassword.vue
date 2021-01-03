<template>
  <div>
    <div id="layoutAuthentication">
      <a class="m-4 logo abbr" href="/">{{ shop.name }}</a>
      <div id="layoutAuthentication_content">
        <main>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-5">
                <div class="card shadow-lg border-0 rounded-lg">
                  <div class="card-header">
                    <h3 class="text-center font-weight-light my-4">
                      Password Recovery
                    </h3>
                  </div>
                  <div class="card-body">
                    <div class="small mb-3 text-muted">
                      Enter your email address and we will send you a link to
                      reset your password.
                    </div>
                    <form>
                      <div class="form-group">
                        <label class="small mb-1" for="inputEmailAddress"
                          >Email</label
                        >
                        <input
                          v-model="email"
                          class="form-control py-4"
                          id="inputEmailAddress"
                          type="email"
                          aria-describedby="emailHelp"
                          placeholder="Enter email address"
                        />
                      </div>
                      <div class="error" v-html="error"></div>

                      <div
                        class="form-group d-flex align-items-center justify-content-between mt-4 mb-0"
                      >
                        <a class="small" href="/login">Return to login</a>
                        <b-button variant="primary" @click="requestToken"
                          >Reset Password</b-button
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
</template>

<script>
import store from "@/store";
import AuthenticationService from "@/services/AuthenticationService";

export default {
  name: "Password",
  data() {
    return {
      email: null,
      error: null,
      shop: store.state.shop,
    };
  },
  methods: {
    async requestToken() {
      try {
        const response = await AuthenticationService.requestToken({
          email: this.email,
        });
        console.log(response);
        // this.$store.dispatch("setToken", response.data.token);
        // this.$store.dispatch("setUser", response.data.user);
        this.$router.push({
          name: "reset-password",
          params: {
            token: response.data.token,
          },
        });
      } catch (error) {
        console.log(error.response.data.error);
        this.error = error.response.data.error;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 8rem;
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