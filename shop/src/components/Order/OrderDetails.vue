<template>
  <div>
    <b-row>
      <b-col>
        <h5 style="font-weight: bold">Order Cost</h5>
        <hr />

        <h6 style="font-weight: bold">Product Value</h6>
        {{ orderInfo.productCost }} {{ orderInfo.currency }}
        <hr />
        <h6 class="mt-4" style="font-weight: bold">Shipping Cost</h6>
        {{ orderInfo.shippingCost }} {{ orderInfo.currency }}
        <hr />
        <h6 class="mt-4" style="font-weight: bold">Total Amount</h6>
        {{ orderInfo.productCost + orderInfo.shippingCost }}
        {{ orderInfo.currency }}
        <hr />
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col>
        <h5 style="font-weight: bold">Customer Details</h5>
        <hr />
        <h6 style="font-weight: bold">Name</h6>
        {{ orderInfo.name }}
        <h6 class="mt-4" style="font-weight: bold">Email</h6>
        {{ orderInfo.email }}
        <h6 class="mt-4" style="font-weight: bold">Phone No.</h6>
        {{ orderInfo.phoneNo }}
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col>
        <h5 style="font-weight: bold">Shipping Address</h5>
        <hr />
        <div v-html="orderInfo.address"></div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import OrderService from "@/services/OrderService.js";

export default {
  name: "OrderDetails",
  components: {},
  data() {
    return {
      orderInfo: {}
    };
  },
  async mounted() {
    const sessionId = this.$store.state.route.params.sessionId;
    console.log("order details", sessionId);

    try {
      this.orderInfo = (await OrderService.getOrderBySessionId(sessionId)).data;
      console.log("from order details", this.orderInfo);
    } catch (error) {
      console.log(error.response.data.error);
    }
  },
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped></style>
