<template>
  <div>
    <TopHeader />
    <b-container class="mt-5">
      <b-row>
        <b-col cols="6">
          <b-card v-if="!registerToken">
            <h5 class="text-center"><strong>Email Verification</strong></h5>
            <b-alert class="mt-4" variant="warning" show>
              <small>
                It looks like you clicked on an invalid verification link.
                Please try again.
              </small>
            </b-alert>
          </b-card>

          <b-card v-if="registerToken" style="color: #001e5f">
            <b-card
              border-variant="info"
              header="Email Verified"
              header-bg-variant="info"
              header-text-variant="white"
              align="center"
            >
              <h1 class="mt-4">You're all set!</h1>
              <h6>Your account is ready,</h6>
              <h6>we hope you enjoy your visit!</h6>
            </b-card>
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
import Footer from "@/components/Footer.vue";
export default {
  name: "UserVerify",
  components: {
    TopHeader,
    Footer
  },
  data() {
    return {
      userId: null,
      registerToken: null
    };
  },
  async mounted() {
    const token = this.$store.state.route.params.token;
    if (token) {
      try {
        const user = (await AuthenticationService.verifyRegsToken(token)).data;
        if (user.registerToken === token) {
          this.registerToken = user.registerToken;
          this.userId = user.id;
        }
      } catch (error) {
        console.log(error.response.data.error);
      }

      if (this.userId) {
        try {
          (
            await AuthenticationService.resetRegsToken({
              id: this.userId,
              registerToken: this.registerToken
            })
          ).data;
        } catch (error) {
          console.log(error.response.data.error);
        }
      }
    }
  },
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped></style>
