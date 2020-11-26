<template>
  <div class="login">
      <div class="tab-content" id="pills-tabContent">
      
        <div class="tab-pane fade show active" id="pills-signin" role="tabpanel" aria-labelledby="pills-signin-tab">
          <div class="form-group">
            <b-form-input size="lg" class="mt-2" v-model="email" placeholder="Email address"></b-form-input>
          </div>

          <div class="form-group">
            <b-form-input size="lg" class="mt-4" @keyup.enter="login" type="password" v-model="password" placeholder="Password"></b-form-input>
            <div class="error">
              <p>{{error}}</p>
            </div>
            <b-button block size="lg" class="mt-4" variant="primary" @click="login">Log in</b-button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService"

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: null
    }
  },

  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$bvModal.hide("login-modal")
        this.email = ''
        this.password = ''
        this.$bvToast.toast("User Login Successfully", {
          title: "Update",
          variant: "dark",
          toaster: "b-toaster-top-center",
          noCloseButton: true,
          solid: true,
        });
        location.reload(true);
      } catch (error) {
        console.log(error.response.data.error)
        this.error = error.response.data.error
      }
    }
  }
};
</script>

<style scoped lang="scss">
.error {
  color: red;
}
</style>
