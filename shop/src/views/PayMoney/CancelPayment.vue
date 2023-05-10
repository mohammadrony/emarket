<template>
  <div>
    <TopHeader></TopHeader>
    <b-container class="mt-5">
      <b-row align-h="center">
        <b-col cols="5" class="text-center">
          <b-card
            border-variant="danger"
            header="Payment failed"
            header-bg-variant="danger"
            header-text-variant="white"
            align="center"
          >
            <b-button size="lg" disabled variant="light">
              <b-icon icon="x" scale="2" variant="danger" />
            </b-button>
            <h3 class="mt-4">Payment Cancelled</h3>
            <h6>This payment can not be completed.</h6>
            <b-card-footer class="mt-4"> emarket.website </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <MyFooter class="mt-5" />
  </div>
</template>

<script>
import TopHeader from "@/components/Common/TopHeader.vue";
import MyFooter from "@/components/Common/MyFooter.vue";
export default {
  name: "CancelPayment",
  components: {
    TopHeader,
    MyFooter,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped></style>
