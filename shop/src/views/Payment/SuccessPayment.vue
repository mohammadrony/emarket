<template>
  <div>
    <TopHeader></TopHeader>
    <b-container>
      <b-row class="m-5" align-h="center">
        <b-col cols="6" class="text-center">
          <b-card
            border-variant="primary"
            header="Payment Succeeded"
            header-bg-variant="primary"
            header-text-variant="white"
            align="center"
          >
            <b-button size="lg" disabled variant="primary">
              <b-icon icon="check" scale="3"></b-icon>
            </b-button>
            <h1 class="mt-4">You're all set!</h1>
            <h6>Thanks for being awesome,</h6>
            <h6>we hope you enjoy your purchase!</h6>
            <b-card-footer class="mt-4"> estorebd.com </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <Footer></Footer>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import Footer from "@/components/Footer.vue";
import CheckoutService from "@/services/CheckoutService.js";
export default {
  name: "SuccessPayment",
  components: {
    TopHeader,
    Footer,
  },
  data() {
    return {};
  },
  async mounted() {
    const session_id = this.$store.state.route.query.id;
    try {
      const session = await CheckoutService.retrieveCheckoutSession(session_id);
      console.log("checkout session", session.data);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {},
  computed: {},
};
</script>

<style lang="sass" scoped>
</style>