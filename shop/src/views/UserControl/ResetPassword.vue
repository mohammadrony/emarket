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
                  <h3 class="text-center font-weight-light my-2">
                    Reset Password
                  </h3>
                </div>
                <div class="card-body" v-if="tokenValidate">
                  <form>
                    <div class="form-group">
                      <label class="small mb-1" for="newPasswordInput"
                        >New Password</label
                      >
                      <input
                        class="form-control py-4"
                        id="newPasswordInput"
                        type="password"
                        v-model="newPassword"
                        placeholder="Enter New Password"
                      />
                    </div>
                    <div class="form-group">
                      <label class="small mb-1" for="confirmPasswordInput"
                        >Confirm Password</label
                      >
                      <input
                        class="form-control py-4"
                        id="confirmPasswordInput"
                        type="password"
                        @keyup.enter="resetPass"
                        v-model="confirmPassword"
                        placeholder="Confirm password"
                      />
                    </div>
                    <div class="error" v-html="error"></div>
                    <div
                      class="form-group d-flex align-items-center justify-content-right mt-1 mb-0"
                    >
                      <b-button
                        class="mt-2"
                        variant="primary"
                        @click="resetPass"
                        >Submit</b-button
                      >
                    </div>
                  </form>
                </div>
                <div class="card-body" v-if="!tokenValidate">
                  <h6 class="error">Invalid Token Id.</h6>
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
import AuthenticationService from "@/services/AuthenticationService.js";
import store from "@/store";

export default {
  name: "ResetPassword",
  components: {},
  data() {
    return {
      shop: store.state.shop,
      error: null,
      newPassword: null,
      confirmPassword: null,
      tokenValidate: true,
    };
  },
  async mounted() {
    const token = this.$store.state.route.params.token;
    const response = await AuthenticationService.verifyToken(token);
    if (response.data.token === token) {
      this.tokenValidate = true;
    }
    console.log(this.tokenValidate);
    console.log(response)
  },
  methods: {
    async resetPass() {
      console.log(this.newPassword, this.confirmPassword)
      if (this.newPassword === this.confirmPassword) {
        const response = await AuthenticationService.resetPassword({
          newPassword: this.newPassword,
        }).data;
        console.log(response);
      }
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
#layoutAuthentication_footer {
  margin-top: 120px;
}
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
