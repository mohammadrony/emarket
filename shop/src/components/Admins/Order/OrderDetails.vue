<template>
  <div>
    <b-row>
      <b-col>
        <h5 class="font-weight-bold">Order Cost</h5>
        <hr />

        <h6 class="font-weight-bold">Product Value</h6>
        {{ orderInfo.productCost }} {{ orderInfo.currency }}
        <hr />
        <h6 class="mt-4 font-weight-bold">Shipping Cost</h6>
        {{ orderInfo.shippingCost }} {{ orderInfo.currency }}
        <hr />
        <h6 class="mt-4 font-weight-bold">Total Amount</h6>
        {{ orderInfo.productCost + orderInfo.shippingCost }}
        {{ orderInfo.currency }}
        <hr />
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col>
        <h5 class="font-weight-bold">Customer Details</h5>
        <hr />
        <h6 class="font-weight-bold">Name</h6>
        {{ orderInfo.name }}
        <h6 class="mt-4 font-weight-bold">Email</h6>
        {{ orderInfo.email }}
        <h6 class="mt-4 font-weight-bold">Phone No.</h6>
        {{ orderInfo.phoneNo }}
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col>
        <h5 class="font-weight-bold">Shipping Address</h5>
        <hr />
        <div v-html="orderInfo.address"></div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "OrderDetails",
  props: {
    orderInfo: {
      type: Object,
      required: true,
    },
  },
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped></style>
