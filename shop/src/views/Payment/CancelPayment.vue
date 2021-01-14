<template>
  <div>
    <TopHeader></TopHeader>
    <b-container>
      <b-row class="m-5" align-h="center">
        <b-col cols="5" class="text-center">
          <b-card
            border-variant="danger"
            header="Payment failed"
            header-bg-variant="danger"
            header-text-variant="white"
            align="center"
          >
          <b-button size=lg disabled variant="danger">

            <b-icon icon="x" scale="2"></b-icon>
          </b-button>
          <h3 class="mt-4">Payment Cancelled</h3>
          <h6>We can't process the payment</h6>
          <b-card-footer class="mt-4">
            estorebd.com
          </b-card-footer>
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
export default {
  name: "CancelPayment",
  components: {
    TopHeader,
    Footer,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {},
};
</script>

<style lang="sass" scoped>
</style>